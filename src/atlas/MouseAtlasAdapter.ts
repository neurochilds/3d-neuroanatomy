import type { BufferGeometry } from 'three';
import type { AtlasAdapter, BrainRegion, RegionHierarchyNode } from './types';
import { BRAIN_REGIONS, REGION_MAP } from './regionData';
import { REGION_HIERARCHY } from './regionHierarchy';
import { createRegionGeometry } from './geometry/regionGeometries';

export class MouseAtlasAdapter implements AtlasAdapter {
  private geometryCache = new Map<string, BufferGeometry>();

  getRegions(): BrainRegion[] {
    return BRAIN_REGIONS;
  }

  getRegion(id: string): BrainRegion | undefined {
    return REGION_MAP[id];
  }

  getGeometry(id: string): BufferGeometry {
    let geom = this.geometryCache.get(id);
    if (geom) return geom;

    const region = REGION_MAP[id];
    if (!region) {
      throw new Error(`Unknown region: ${id}`);
    }

    geom = createRegionGeometry(region);
    this.geometryCache.set(id, geom);
    return geom;
  }

  getHierarchy(): RegionHierarchyNode[] {
    return REGION_HIERARCHY;
  }

  search(query: string): BrainRegion[] {
    if (!query.trim()) return BRAIN_REGIONS;
    const q = query.toLowerCase();
    return BRAIN_REGIONS.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.acronym.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.group.toLowerCase().includes(q),
    );
  }

  dispose(): void {
    for (const geom of this.geometryCache.values()) {
      geom.dispose();
    }
    this.geometryCache.clear();
  }
}

// Singleton for the app
export const atlas = new MouseAtlasAdapter();
