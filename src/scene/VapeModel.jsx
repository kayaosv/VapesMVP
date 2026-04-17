import { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.preload('/models/vape-compressed.glb')

const COIL_KEYWORDS = ['coil', 'atomizer', 'mouth', 'tip', 'drip', 'mouthpiece', '510']

export const VapeModel = ({ intensityRef, onTopComputed }) => {
  const group = useRef()
  const { scene } = useGLTF('/models/vape-compressed.glb')

  const { coilMeshes, normalized, topY } = useMemo(() => {
    const cloned = scene.clone(true)
    const rawBox = new THREE.Box3().setFromObject(cloned)
    const size = rawBox.getSize(new THREE.Vector3())
    const center = rawBox.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.4 / maxDim

    cloned.position.set(-center.x, -center.y, -center.z)
    cloned.scale.setScalar(scale)
    const halfHeightScaled = (size.y * scale) / 2

    const wrapper = new THREE.Group()
    wrapper.add(cloned)

    const coils = []
    cloned.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        if (obj.material) {
          obj.material = obj.material.clone()
          obj.material.envMapIntensity = 0.7
        }
        const name = (obj.name || '').toLowerCase()
        const matName = (obj.material?.name || '').toLowerCase()
        if (COIL_KEYWORDS.some((k) => name.includes(k) || matName.includes(k))) {
          coils.push(obj)
          obj.material.emissive = new THREE.Color('#FF4D00')
          obj.material.emissiveIntensity = 0
        }
      }
    })

    return { coilMeshes: coils, normalized: wrapper, topY: halfHeightScaled }
  }, [scene])

  useEffect(() => {
    if (onTopComputed) onTopComputed(topY)
  }, [topY, onTopComputed])

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    const i = intensityRef?.current?.value ?? 0
    coilMeshes.forEach((m) => {
      m.material.emissiveIntensity = i * 2.2
    })
  })

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <primitive object={normalized} />
    </group>
  )
}
