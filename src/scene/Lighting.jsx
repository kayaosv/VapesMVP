import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export const Lighting = ({ intensityRef }) => {
  const emberLight = useRef()

  useFrame(() => {
    if (emberLight.current && intensityRef?.current) {
      emberLight.current.intensity = intensityRef.current.value * 2.5
    }
  })

  return (
    <>
      <ambientLight intensity={0.55} color="#5a6478" />
      <directionalLight position={[3, 5, 4]} intensity={2.6} color="#cfe0f2" />
      <directionalLight position={[-3, 2.5, -3]} intensity={1.8} color="#ff9a55" />
      <directionalLight position={[-4, 0.5, 2]} intensity={1.2} color="#90a8c0" />
      <pointLight position={[0, -1.2, 2.5]} intensity={1.4} color="#7a8ea8" distance={8} />
      <pointLight ref={emberLight} position={[0, 1.2, 0]} intensity={0} color="#FF4D00" distance={2.5} />
    </>
  )
}
