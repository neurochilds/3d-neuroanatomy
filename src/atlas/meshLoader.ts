import { BufferGeometry } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MESH_ID_MAP, BRAIN_SHELL_MESH_ID, CCF_TRANSFORM } from './meshIds';

const loader = new OBJLoader();
const geometryCache = new Map<number, BufferGeometry>();

/**
 * Transform an Allen CCF geometry:
 * - Center at origin by subtracting the CCF center
 * - Scale down from 10μm voxels to mm-ish units
 * - Reorient: Allen CCF is (ML, DV, AP) but we want Three.js (x=ML, y=DV, z=AP)
 *   Allen: X=left-right(ML), Y=dorsal-ventral(DV inverted), Z=anterior-posterior(AP)
 */
function transformCCFGeometry(geometry: BufferGeometry): BufferGeometry {
  const positions = geometry.attributes.position;
  const [cx, cy, cz] = CCF_TRANSFORM.center;
  const s = CCF_TRANSFORM.scale;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);

    // Center and scale. Allen CCF: X=AP, Y=DV(inverted), Z=ML
    // Three.js: x=ML, y=DV, z=AP
    positions.setXYZ(
      i,
      (z - cz) / s,   // Allen Z (ML) -> Three.js X
      -(y - cy) / s,   // Allen Y (DV, inverted) -> Three.js Y
      -(x - cx) / s,   // Allen X (AP) -> Three.js Z (negated for anterior=positive)
    );
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  return geometry;
}

async function loadOBJ(meshId: number): Promise<BufferGeometry> {
  const cached = geometryCache.get(meshId);
  if (cached) return cached;

  const url = `/meshes/${meshId}.obj`;
  const response = await fetch(url);
  const text = await response.text();
  const group = loader.parse(text);

  let geometry: BufferGeometry | null = null;
  group.traverse((child) => {
    if ('geometry' in child && child.geometry instanceof BufferGeometry) {
      geometry = child.geometry;
    }
  });

  if (!geometry) {
    throw new Error(`No geometry found in mesh ${meshId}`);
  }

  transformCCFGeometry(geometry);
  geometryCache.set(meshId, geometry);
  return geometry;
}

export async function loadRegionMesh(regionId: string): Promise<BufferGeometry> {
  const meshId = MESH_ID_MAP[regionId];
  if (!meshId) {
    throw new Error(`No mesh ID mapped for region: ${regionId}`);
  }
  return loadOBJ(meshId);
}

export async function loadBrainShellMesh(): Promise<BufferGeometry> {
  return loadOBJ(BRAIN_SHELL_MESH_ID);
}

export async function loadAllRegionMeshes(
  regionIds: string[],
): Promise<Map<string, BufferGeometry>> {
  const results = new Map<string, BufferGeometry>();
  const promises = regionIds.map(async (id) => {
    try {
      const geom = await loadRegionMesh(id);
      results.set(id, geom);
    } catch (e) {
      console.warn(`Failed to load mesh for ${id}:`, e);
    }
  });
  await Promise.all(promises);
  return results;
}

export function disposeMeshCache(): void {
  for (const geom of geometryCache.values()) {
    geom.dispose();
  }
  geometryCache.clear();
}
