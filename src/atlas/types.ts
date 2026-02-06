import type { BufferGeometry } from 'three';

export interface BrainRegion {
  id: string;           // Allen atlas acronym (e.g. "MOp")
  allenId: number;      // Allen atlas structure ID
  name: string;         // Full name
  acronym: string;      // Short display name
  description: string;  // What this region does
  surgicalNotes: string; // Practical surgical relevance
  connections: string[]; // Connected region IDs
  group: RegionGroup;
  color: string;        // Hex color for rendering
  position: [number, number, number]; // [AP, ML, DV] in mm from bregma
  geometryParams: GeometryParams;
  bilateral: boolean;   // If true, mirror across midline
}

export type RegionGroup =
  | 'cortex'
  | 'hippocampus'
  | 'subcortical'
  | 'thalamus'
  | 'midbrain'
  | 'hindbrain';

export type ShapeType = 'ellipsoid' | 'capsule' | 'blob' | 'sheet' | 'wedge';

export interface GeometryParams {
  shape: ShapeType;
  radii: [number, number, number]; // x, y, z half-extents
  rotation?: [number, number, number]; // Euler angles
  noiseAmplitude?: number;
  noiseFrequency?: number;
  segments?: number;
}

export interface RegionHierarchyNode {
  id: string;
  label: string;
  children?: RegionHierarchyNode[];
  regionId?: string; // leaf nodes reference a BrainRegion
}

export interface AtlasAdapter {
  getRegions(): BrainRegion[];
  getRegion(id: string): BrainRegion | undefined;
  getGeometry(id: string): BufferGeometry;
  getHierarchy(): RegionHierarchyNode[];
  search(query: string): BrainRegion[];
}

// Quiz types
export type QuestionType = 'mcq' | 'spatial' | 'freetext';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  regionId: string;      // target region
  prompt: string;
  options?: string[];    // MCQ choices (region IDs)
  correctAnswer: string; // region ID or name
}

export interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: QuizAnswer[];
  startTime: number;
}

export interface QuizAnswer {
  questionId: string;
  regionId: string;
  userAnswer: string;
  correct: boolean;
  timeMs: number;
}

// Spaced Repetition (SM-2)
export interface SRCard {
  regionId: string;
  easeFactor: number;    // starts at 2.5
  interval: number;      // days
  repetitions: number;
  nextReview: number;    // timestamp
  lastReview: number;    // timestamp
}

export type AppMode = 'teaching' | 'quiz';
