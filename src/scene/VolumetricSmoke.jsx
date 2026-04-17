import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WIDTH = 1.3
const HEIGHT = 3.0
const SEG_X = 32
const SEG_Y = 64

const simplexNoiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v   - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

const vertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSpeed;
  uniform float uDistortionStrength;
  varying vec2 vUv;
  varying float vDisplace;
  ${simplexNoiseGLSL}
  void main() {
    vUv = uv;
    float expand = smoothstep(0.0, 1.0, uv.y);
    vec3 pos = position;
    pos.x *= 1.0 + expand * 0.85;
    float displaceRamp = smoothstep(0.05, 0.75, uv.y);
    vec3 noiseCoord = vec3(pos.xy * 1.2, uTime * uSpeed * 0.6);
    float n1 = snoise(noiseCoord);
    float n2 = snoise(noiseCoord + vec3(17.3, 9.1, -4.7));
    pos.x += n1 * uDistortionStrength * displaceRamp * (0.4 + uIntensity * 0.6);
    pos.z += n2 * uDistortionStrength * displaceRamp * 0.55 * (0.4 + uIntensity * 0.6);
    pos.y *= 1.0 + uIntensity * 0.08;
    vDisplace = n1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uDensity;
  uniform float uSpeed;
  uniform float uFadeHeight;
  uniform vec3  uColor;
  varying vec2 vUv;
  varying float vDisplace;
  ${simplexNoiseGLSL}
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }
  void main() {
    float flowTime = uTime * uSpeed;
    vec2 flowUV = vec2(vUv.x, vUv.y - flowTime * 0.18);
    float dNoise = snoise(vec3(vUv * 2.8, flowTime * 0.25));
    vec2 uvDist = flowUV + vec2(dNoise * 0.14, dNoise * 0.07);
    float n = fbm(vec3(uvDist * 2.6, flowTime * 0.35));
    n = smoothstep(-0.25, 0.85, n);
    float bottomFade = smoothstep(0.0, 0.1, vUv.y);
    float topFade = 1.0 - smoothstep(uFadeHeight * 0.35, uFadeHeight, vUv.y);
    float verticalAlpha = bottomFade * topFade;
    float widthRamp = 0.3 + vUv.y * 0.7;
    float horizontalAlpha = 1.0 - smoothstep(widthRamp * 0.55, widthRamp, abs(vUv.x - 0.5) * 2.0);
    float centerDist = abs(vUv.x - 0.5) * 2.0;
    float centerFade = 1.0 - smoothstep(0.3, 1.0, centerDist);
    float alpha = n * verticalAlpha * horizontalAlpha * centerFade;
    alpha *= uIntensity * uDensity;
    vec3 col = mix(uColor * 0.88, uColor * 1.12, vUv.y);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(col, alpha);
  }
`

export const VolumetricSmoke = ({ intensityRef, baseY = 1.0 }) => {
  const meshRef = useRef()

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uDensity: { value: 1.0 },
      uSpeed: { value: 0.6 },
      uDistortionStrength: { value: 0.35 },
      uFadeHeight: { value: 0.9 },
      uColor: { value: new THREE.Color('#d8dde5') },
    },
  }), [])

  const geometry = useMemo(() => new THREE.PlaneGeometry(WIDTH, HEIGHT, SEG_X, SEG_Y), [])

  useFrame((state, delta) => {
    material.uniforms.uTime.value += Math.min(delta, 0.05)
    material.uniforms.uIntensity.value = intensityRef?.current?.value ?? 0
    const mesh = meshRef.current
    if (mesh) {
      mesh.rotation.y = Math.atan2(
        state.camera.position.x - mesh.position.x,
        state.camera.position.z - mesh.position.z
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, baseY + HEIGHT / 2, 0]}
      renderOrder={10}
      frustumCulled={false}
    />
  )
}
