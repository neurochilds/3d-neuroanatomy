import React, { useCallback, useRef, useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Color, MeshStandardMaterial, type BufferGeometry } from 'three';
import type { BrainRegion } from '../atlas/types';
import { useAppStore } from '../store/useAppStore';

type RegionMeshProps = {
  region: BrainRegion;
  geometry: BufferGeometry;
  mirrored?: boolean;
};

function RegionMesh({ region, geometry, mirrored = false }: RegionMeshProps) {
  const materialRef = useRef<MeshStandardMaterial | null>(null);
  const [isPointerHovered, setIsPointerHovered] = useState(false);

  const hoveredRegion = useAppStore((s) => s.hoveredRegion);
  const selectedRegion = useAppStore((s) => s.selectedRegion);
  const appMode = useAppStore((s) => s.appMode);
  const currentQuestion = useAppStore((s) => s.currentQuestion);
  const setHoveredRegion = useAppStore((s) => s.setHoveredRegion);
  const setSelectedRegion = useAppStore((s) => s.setSelectedRegion);
  const answerQuestion = useAppStore((s) => s.answerQuestion);
  const nextQuestion = useAppStore((s) => s.nextQuestion);

  const isHovered = hoveredRegion === region.id;
  const isSelected = selectedRegion === region.id;
  const emissiveIntensity = isSelected ? 0.5 : isPointerHovered ? 0.4 : isHovered ? 0.3 : 0;

  const handlePointerOver = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setIsPointerHovered(true);
      setHoveredRegion(region.id);
    },
    [region.id, setHoveredRegion],
  );

  const handlePointerOut = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setIsPointerHovered(false);
      if (useAppStore.getState().hoveredRegion === region.id) {
        setHoveredRegion(null);
      }
    },
    [region.id, setHoveredRegion],
  );

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (appMode === 'teaching') {
        setSelectedRegion(region.id);
        return;
      }
      if (!currentQuestion) return;
      const correct =
        currentQuestion.correctAnswer === region.id ||
        currentQuestion.correctAnswer === region.name;
      answerQuestion({
        questionId: currentQuestion.id,
        regionId: currentQuestion.regionId,
        userAnswer: region.id,
        correct,
        timeMs: 0,
      });
      setSelectedRegion(region.id);
      nextQuestion();
    },
    [appMode, answerQuestion, currentQuestion, nextQuestion, region.id, region.name, setSelectedRegion],
  );

  const regionColor = new Color(region.color);

  // When a region is selected, fade all others to near-transparent
  const hasSelection = selectedRegion !== null;
  const opacity = isSelected ? 0.95 : hasSelection ? 0.08 : 0.85;

  return (
    <mesh
      geometry={geometry}
      scale={mirrored ? [-1, 1, 1] : [1, 1, 1]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <meshStandardMaterial
        ref={materialRef}
        color={regionColor}
        emissive={regionColor}
        emissiveIntensity={emissiveIntensity}
        transparent
        opacity={opacity}
        roughness={0.4}
        depthWrite={isSelected}
      />
    </mesh>
  );
}

export default React.memo(RegionMesh);
