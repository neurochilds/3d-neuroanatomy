import { BufferGeometry } from 'three';
import { createEllipsoid, applyNoise } from './geometryUtils';

/**
 * Creates the outer brain shell geometry -- an organic-looking ellipsoid
 * with noise deformation, a longitudinal fissure indentation along the
 * midline, and a slight cerebellar bulge at the posterior end.
 *
 * Dimensions approximate the mouse brain:
 *   AP (z): 5.0 mm half-length
 *   ML (x): 3.2 mm half-width
 *   DV (y): 2.8 mm half-height
 */
export function createBrainShell(): BufferGeometry {
  const segments = 48;

  // Start with a smooth ellipsoid at the brain's overall dimensions
  const geometry = createEllipsoid([3.2, 2.8, 5.0], segments);

  // Apply organic noise deformation
  applyNoise(geometry, 0.15, 2.5);

  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);

    // --- Longitudinal fissure ---
    // For vertices near the midline (x ~ 0), push them downward (negative y)
    // to create the groove that separates the two hemispheres.
    const midlineProximity = Math.exp(-(x * x) / 0.3); // Gaussian falloff
    const fissureDepth = 0.25;
    const yAdjusted = y - midlineProximity * fissureDepth * Math.max(0, y / 2.8);

    // --- Cerebellar bulge ---
    // For posterior vertices (z < -3), push outward slightly to suggest
    // the cerebellum protruding at the back of the brain.
    let bulge = 0;
    if (z < -3) {
      const t = (-z - 3) / 2; // 0..1 range over z = -3 to -5
      bulge = 0.2 * Math.min(1, t);
    }

    // Bulge is radial from center in the xz-plane
    const distXZ = Math.sqrt(x * x + z * z);
    const bulgeX = distXZ > 0.001 ? (x / distXZ) * bulge : 0;
    const bulgeZ = distXZ > 0.001 ? (z / distXZ) * bulge : 0;

    positions.setXYZ(i, x + bulgeX, yAdjusted, z + bulgeZ);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}
