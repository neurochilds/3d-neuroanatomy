import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { BrainModel } from './BrainModel';
import { CameraController } from './CameraController';
import { SceneEffects } from './SceneEffects';

export function BrainCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 8, 14], fov: 40, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#0a0a1a' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0a0a1a');
      }}
    >
      <ambientLight intensity={0.3} />
      <hemisphereLight
        color="#b0c4ff"
        groundColor="#1a0a2e"
        intensity={0.5}
      />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow={false}
      />
      <directionalLight
        position={[-3, 4, -5]}
        intensity={0.3}
      />

      <Suspense fallback={null}>
        <BrainModel />
      </Suspense>

      <CameraController />
      <SceneEffects />
    </Canvas>
  );
}
