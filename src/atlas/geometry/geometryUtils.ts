import {
  BufferGeometry,
  SphereGeometry,
  CapsuleGeometry,
  ConeGeometry,
  PlaneGeometry,
  Euler,
  Matrix4,
  Vector3,
} from 'three';

/**
 * Deterministic pseudo-noise function used for organic surface displacement.
 */
function pseudoNoise(x: number, y: number, z: number, freq: number): number {
  return (
    Math.sin(x * freq) *
    Math.cos(y * freq * 1.3) *
    Math.sin(z * freq * 0.7)
  );
}

/**
 * Create an ellipsoid geometry by scaling a sphere's vertices by the given radii.
 */
export function createEllipsoid(
  radii: [number, number, number],
  segments: number = 24,
): BufferGeometry {
  const sphere = new SphereGeometry(1, segments, segments);
  const positions = sphere.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    positions.setXYZ(
      i,
      positions.getX(i) * radii[0],
      positions.getY(i) * radii[1],
      positions.getZ(i) * radii[2],
    );
  }

  positions.needsUpdate = true;
  sphere.computeVertexNormals();
  return sphere;
}

/**
 * Create a capsule geometry scaled to approximate the given radii proportions.
 */
export function createCapsule(
  radii: [number, number, number],
  segments: number = 24,
): BufferGeometry {
  const radius = (radii[0] + radii[2]) / 2;
  const length = radii[1] * 2;
  const capsule = new CapsuleGeometry(radius, length, segments, segments);
  const positions = capsule.attributes.position;

  // Scale to match radii proportions relative to the averaged radius
  const scaleX = radii[0] / radius;
  const scaleY = 1; // length already accounts for radii[1]
  const scaleZ = radii[2] / radius;

  for (let i = 0; i < positions.count; i++) {
    positions.setXYZ(
      i,
      positions.getX(i) * scaleX,
      positions.getY(i) * scaleY,
      positions.getZ(i) * scaleZ,
    );
  }

  positions.needsUpdate = true;
  capsule.computeVertexNormals();
  return capsule;
}

/**
 * Create an organic blob by displacing an ellipsoid's vertices with pseudo-noise.
 */
export function createBlob(
  radii: [number, number, number],
  noiseAmplitude: number = 0.1,
  noiseFrequency: number = 3.0,
  segments: number = 24,
): BufferGeometry {
  const geometry = createEllipsoid(radii, segments);
  applyNoise(geometry, noiseAmplitude, noiseFrequency);
  return geometry;
}

/**
 * Create a curved sheet for cortical surface patches.
 * The sheet is a plane curved with spherical curvature based on the radii.
 */
export function createSheet(
  radii: [number, number, number],
  segments: number = 16,
): BufferGeometry {
  const plane = new PlaneGeometry(
    radii[0] * 2,
    radii[1] * 2,
    segments,
    segments,
  );
  const positions = plane.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    // Spherical curvature: z displaced based on distance from center
    const nx = x / radii[0]; // normalized to [-1, 1]
    const ny = y / radii[1];
    const curvature = 1 - nx * nx - ny * ny;
    const z = radii[2] * Math.max(0, curvature);

    positions.setZ(i, z);
  }

  positions.needsUpdate = true;
  plane.computeVertexNormals();
  return plane;
}

/**
 * Create a wedge (tapered) shape based on a cone, scaled by radii.
 * Used for certain tapered brain structures.
 */
export function createWedge(
  radii: [number, number, number],
  segments: number = 24,
): BufferGeometry {
  const cone = new ConeGeometry(1, 1, segments, 1);
  const positions = cone.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    positions.setXYZ(
      i,
      positions.getX(i) * radii[0],
      positions.getY(i) * radii[1],
      positions.getZ(i) * radii[2],
    );
  }

  positions.needsUpdate = true;
  cone.computeVertexNormals();
  return cone;
}

/**
 * Bake an Euler rotation (in radians) into the geometry's vertex positions.
 */
export function applyRotation(
  geometry: BufferGeometry,
  rotation: [number, number, number],
): BufferGeometry {
  const euler = new Euler(rotation[0], rotation[1], rotation[2], 'XYZ');
  const matrix = new Matrix4().makeRotationFromEuler(euler);
  const positions = geometry.attributes.position;
  const vertex = new Vector3();

  for (let i = 0; i < positions.count; i++) {
    vertex.set(positions.getX(i), positions.getY(i), positions.getZ(i));
    vertex.applyMatrix4(matrix);
    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Displace each vertex along its normal using pseudo-noise.
 */
export function applyNoise(
  geometry: BufferGeometry,
  amplitude: number,
  frequency: number,
): BufferGeometry {
  // Ensure we have normals to displace along
  geometry.computeVertexNormals();

  const positions = geometry.attributes.position;
  const normals = geometry.attributes.normal;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);

    const displacement = pseudoNoise(x, y, z, frequency) * amplitude;

    const nx = normals.getX(i);
    const ny = normals.getY(i);
    const nz = normals.getZ(i);

    positions.setXYZ(
      i,
      x + nx * displacement,
      y + ny * displacement,
      z + nz * displacement,
    );
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}
