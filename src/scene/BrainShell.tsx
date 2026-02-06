import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DoubleSide, Mesh, MeshPhysicalMaterial, type BufferGeometry } from 'three';
import { useAppStore } from '../store/useAppStore';
import { loadBrainShellMesh } from '../atlas/meshLoader';

function BrainShell() {
  const meshRef = useRef<Mesh | null>(null);
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
  const shellOpacity = useAppStore((state) => state.shellOpacity);

  useEffect(() => {
    loadBrainShellMesh().then(setGeometry);
  }, []);

  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: '#8fa4b8',
        transparent: true,
        transmission: 0.85,
        roughness: 0.15,
        metalness: 0.0,
        thickness: 0.5,
        side: DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  material.opacity = shellOpacity;

  useEffect(() => {
    if (meshRef.current) {
      // Disable raycasting so clicks pass through to regions
      meshRef.current.raycast = () => {};
    }
  }, [geometry]);

  if (!geometry) return null;

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export default React.memo(BrainShell);
