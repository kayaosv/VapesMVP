import { MeshReflectorMaterial } from '@react-three/drei'

export const Floor = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
    <planeGeometry args={[30, 30]} />
    <MeshReflectorMaterial
      blur={[400, 100]}
      resolution={1024}
      mixBlur={1}
      mixStrength={1.4}
      roughness={0.85}
      depthScale={1.1}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#0a0b10"
      metalness={0.55}
      mirror={0.4}
    />
  </mesh>
)
