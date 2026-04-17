import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment, OrbitControls } from '@react-three/drei'
import { Lighting } from './Lighting'
import { VapeModel } from './VapeModel'
import { VolumetricSmoke } from './VolumetricSmoke'
import { Floor } from './Floor'
import { PostFX } from './PostFX'
import { usePointerHold } from '../hooks/usePointerHold'

export const VapeScene = () => {
  const intensityRef = usePointerHold()
  const [vapeTopY, setVapeTopY] = useState(1.1)

  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [0, 0.9, 7.5], fov: 30, near: 0.1, far: 50 }}
    >
      <color attach="background" args={['#0A0A0A']} />
      <fog attach="fog" args={['#0A0A0A', 4, 16]} />

      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.6} />
        <Lighting intensityRef={intensityRef} />
        <VapeModel intensityRef={intensityRef} onTopComputed={setVapeTopY} />
        <VolumetricSmoke intensityRef={intensityRef} baseY={vapeTopY - 0.1} />
        <Floor />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        target={[0, 0.4, 0]}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.75}
        autoRotate
        autoRotateSpeed={0.35}
      />

      <PostFX />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  )
}
