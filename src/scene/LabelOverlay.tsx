import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import { Vector3, type BufferGeometry } from 'three';
import type { BrainRegion } from '../atlas/types';
import { useAppStore } from '../store/useAppStore';

interface LabelOverlayProps {
  regions: BrainRegion[];
  geometries: Map<string, BufferGeometry>;
}

/**
 * Compute the centroid of a geometry from its bounding box.
 */
function getGeometryCentroid(geometry: BufferGeometry): [number, number, number] {
  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }
  const box = geometry.boundingBox!;
  const center = new Vector3();
  box.getCenter(center);
  // Offset label slightly above the top of the bounding box
  const topY = box.max.y;
  return [center.x, topY + 0.15, center.z];
}

function Label({
  region,
  position,
}: {
  region: BrainRegion;
  position: [number, number, number];
}) {
  const hoveredRegion = useAppStore((s) => s.hoveredRegion);
  const selectedRegion = useAppStore((s) => s.selectedRegion);
  const isActive = hoveredRegion === region.id || selectedRegion === region.id;

  return (
    <Html
      position={position}
      center
      style={{
        pointerEvents: 'none',
        transition: 'opacity 0.2s',
        opacity: isActive ? 1 : 0.6,
      }}
    >
      <div
        style={{
          color: isActive ? '#fff' : '#b0b8c8',
          fontSize: isActive ? '12px' : '10px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: isActive ? 600 : 400,
          textShadow: '0 0 8px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.7)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {region.acronym}
      </div>
    </Html>
  );
}

const MemoLabel = React.memo(Label);

export function LabelOverlay({ regions, geometries }: LabelOverlayProps) {
  const showLabels = useAppStore((s) => s.showLabels);

  const labelPositions = useMemo(() => {
    const map = new Map<string, [number, number, number]>();
    for (const region of regions) {
      const geom = geometries.get(region.id);
      if (geom) {
        map.set(region.id, getGeometryCentroid(geom));
      }
    }
    return map;
  }, [regions, geometries]);

  if (!showLabels) return null;

  return (
    <>
      {regions.map((r) => {
        const pos = labelPositions.get(r.id);
        if (!pos) return null;
        return <MemoLabel key={r.id} region={r} position={pos} />;
      })}
    </>
  );
}
