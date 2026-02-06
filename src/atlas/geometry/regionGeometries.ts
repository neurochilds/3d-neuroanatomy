import type { BufferGeometry } from 'three';
import type { BrainRegion } from '../types';
import {
  createEllipsoid,
  createCapsule,
  createBlob,
  createSheet,
  createWedge,
  applyNoise,
  applyRotation,
} from './geometryUtils';

/**
 * Create the appropriate BufferGeometry for a single brain region
 * based on its `geometryParams`.
 */
export function createRegionGeometry(region: BrainRegion): BufferGeometry {
  const { shape, radii, rotation, noiseAmplitude, noiseFrequency, segments } =
    region.geometryParams;

  // Step 1 -- Generate the base shape
  let geometry: BufferGeometry;

  switch (shape) {
    case 'ellipsoid':
      geometry = createEllipsoid(radii, segments);
      break;

    case 'capsule':
      geometry = createCapsule(radii, segments);
      break;

    case 'blob':
      geometry = createBlob(
        radii,
        noiseAmplitude ?? 0.1,
        noiseFrequency ?? 3.0,
        segments,
      );
      break;

    case 'sheet':
      geometry = createSheet(radii, segments);
      break;

    case 'wedge':
      geometry = createWedge(radii, segments);
      break;

    default: {
      // Fallback: treat unknown shapes as ellipsoids
      const _exhaustive: never = shape;
      console.warn(`Unknown shape "${_exhaustive}", falling back to ellipsoid`);
      geometry = createEllipsoid(radii, segments);
    }
  }

  // Step 2 -- Optional noise displacement
  // (Skip for 'blob' since createBlob already applies noise internally)
  if (noiseAmplitude != null && shape !== 'blob') {
    applyNoise(geometry, noiseAmplitude, noiseFrequency ?? 3.0);
  }

  // Step 3 -- Optional rotation baked into the geometry
  if (rotation) {
    applyRotation(geometry, rotation);
  }

  return geometry;
}

/**
 * Create geometries for every region in the provided array.
 * Returns a Map keyed by region ID.
 */
export function createAllRegionGeometries(
  regions: BrainRegion[],
): Map<string, BufferGeometry> {
  const map = new Map<string, BufferGeometry>();

  for (const region of regions) {
    map.set(region.id, createRegionGeometry(region));
  }

  return map;
}
