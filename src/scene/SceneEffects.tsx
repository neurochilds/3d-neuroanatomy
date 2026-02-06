import { EffectComposer, Bloom, N8AO, Vignette } from '@react-three/postprocessing';

export function SceneEffects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      <N8AO
        aoRadius={0.5}
        intensity={1.0}
        distanceFalloff={0.5}
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
      />
    </EffectComposer>
  );
}
