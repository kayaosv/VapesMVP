import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'

export const PostFX = () => (
  <EffectComposer multisampling={0} disableNormalPass>
    <Bloom intensity={0.55} luminanceThreshold={0.78} luminanceSmoothing={0.2} mipmapBlur />
    <ChromaticAberration offset={new Vector2(0.0008, 0.0008)} />
    <Vignette eskil={false} offset={0.28} darkness={0.85} />
    <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.08} />
  </EffectComposer>
)
