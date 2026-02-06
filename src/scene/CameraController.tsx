import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../store/useAppStore';
import { REGION_MAP } from '../atlas/regionData';

export function CameraController() {
  const controlsRef = useRef<any>(null);
  const selectedRegion = useAppStore((s) => s.selectedRegion);
  const targetPos = useRef<THREE.Vector3 | null>(null);
  const animating = useRef(false);

  useEffect(() => {
    if (selectedRegion && REGION_MAP[selectedRegion]) {
      const region = REGION_MAP[selectedRegion];
      const [ap, ml, dv] = region.position;
      // Same coord transform as meshLoader: x=ML, y=-DV, z=-AP
      targetPos.current = new THREE.Vector3(ml, -dv, -ap);
      animating.current = true;
    }
  }, [selectedRegion]);

  useFrame(() => {
    if (animating.current && targetPos.current && controlsRef.current) {
      const controls = controlsRef.current;
      const target = controls.target as THREE.Vector3;
      target.lerp(targetPos.current, 0.05);
      controls.update();

      if (target.distanceTo(targetPos.current) < 0.01) {
        animating.current = false;
        targetPos.current = null;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.8}
      zoomSpeed={0.6}
      minDistance={3}
      maxDistance={25}
      makeDefault
    />
  );
}
