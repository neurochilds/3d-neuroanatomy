import { useEffect, useState } from 'react';
import type { BufferGeometry } from 'three';
import { atlas } from '../atlas/MouseAtlasAdapter';
import { loadAllRegionMeshes } from '../atlas/meshLoader';
import { useAppStore } from '../store/useAppStore';
import BrainShell from './BrainShell';
import RegionMesh from './RegionMesh';
import { LabelOverlay } from './LabelOverlay';

export function BrainModel() {
  const showBilateral = useAppStore((s) => s.showBilateral);
  const visibleRegions = useAppStore((s) => s.visibleRegions);

  const [geometries, setGeometries] = useState<Map<string, BufferGeometry>>(
    new Map(),
  );
  const [loading, setLoading] = useState(true);

  const regions = atlas.getRegions();

  useEffect(() => {
    const ids = regions.map((r) => r.id);
    loadAllRegionMeshes(ids).then((map) => {
      setGeometries(map);
      setLoading(false);
    });
  }, []);

  const filteredRegions =
    visibleRegions.size === 0
      ? regions
      : regions.filter((r) => visibleRegions.has(r.id));

  return (
    <group>
      <BrainShell />
      {!loading &&
        filteredRegions.map((region) => {
          const geom = geometries.get(region.id);
          if (!geom) return null;
          return (
            <group key={region.id}>
              <RegionMesh region={region} geometry={geom} />
              {showBilateral && region.bilateral && (
                <RegionMesh region={region} geometry={geom} mirrored />
              )}
            </group>
          );
        })}
      {!loading && <LabelOverlay regions={filteredRegions} geometries={geometries} />}
    </group>
  );
}
