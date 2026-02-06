import type { QuestionType, QuizQuestion, SRCard } from '../atlas/types';
import { BRAIN_REGIONS, REGION_MAP } from '../atlas/regionData';
import { getInitialCard, isDue } from './spacedRepetition';

const STORE_KEY = 'neuroanatomy-store';
const QUESTION_CYCLE: QuestionType[] = ['mcq', 'freetext', 'mcq', 'mcq', 'freetext'];

type PersistedState = {
  state?: {
    srCards?: Record<string, SRCard>;
  };
};

function createQuestionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function loadStoredCards(): Record<string, SRCard> {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed.state?.srCards) {
      return {};
    }

    return parsed.state.srCards;
  } catch {
    return {};
  }
}

function getCardOrDefault(
  regionId: string,
  cards: Record<string, SRCard>,
): SRCard {
  const card = cards[regionId];
  if (!card) {
    return getInitialCard(regionId);
  }

  if (
    typeof card.easeFactor !== 'number' ||
    typeof card.interval !== 'number' ||
    typeof card.repetitions !== 'number' ||
    typeof card.nextReview !== 'number' ||
    typeof card.lastReview !== 'number'
  ) {
    return getInitialCard(regionId);
  }

  return card;
}

export function selectDistractors(regionId: string, count: number): string[] {
  const target = REGION_MAP[regionId];
  if (!target || count <= 0) {
    return [];
  }

  const sameGroupIds = BRAIN_REGIONS.filter(
    (region) => region.group === target.group && region.id !== regionId,
  ).map((region) => region.id);

  const otherIds = BRAIN_REGIONS.filter(
    (region) => region.group !== target.group && region.id !== regionId,
  ).map((region) => region.id);

  const selected = shuffle(sameGroupIds).slice(0, count);
  if (selected.length < count) {
    const needed = count - selected.length;
    const filler = shuffle(otherIds.filter((id) => !selected.includes(id)));
    selected.push(...filler.slice(0, needed));
  }

  return selected;
}

export function generateMCQ(regionId: string): QuizQuestion {
  const region = REGION_MAP[regionId];
  if (!region) {
    throw new Error(`Unknown region ID: ${regionId}`);
  }

  const distractors = selectDistractors(regionId, 3);
  const options = shuffle([regionId, ...distractors]).slice(0, 4);

  return {
    id: createQuestionId(),
    type: 'mcq',
    regionId,
    prompt: 'What is the highlighted region?',
    options,
    correctAnswer: regionId,
  };
}

export function generateSpatial(regionId: string): QuizQuestion {
  const region = REGION_MAP[regionId];
  if (!region) {
    throw new Error(`Unknown region ID: ${regionId}`);
  }

  return {
    id: createQuestionId(),
    type: 'spatial',
    regionId,
    prompt: `Click on ${region.name} (${region.acronym})`,
    correctAnswer: regionId,
  };
}

export function generateFreeText(regionId: string): QuizQuestion {
  if (!REGION_MAP[regionId]) {
    throw new Error(`Unknown region ID: ${regionId}`);
  }

  return {
    id: createQuestionId(),
    type: 'freetext',
    regionId,
    prompt: 'Name this highlighted region',
    correctAnswer: regionId,
  };
}

export function generateSession(
  regionIds: string[],
  count: number = 10,
): QuizQuestion[] {
  const sessionCount = Math.max(0, Math.floor(count));
  if (sessionCount === 0) {
    return [];
  }

  const uniqueValidIds = Array.from(
    new Set(regionIds.filter((regionId) => Boolean(REGION_MAP[regionId]))),
  );

  if (uniqueValidIds.length === 0) {
    return [];
  }

  const cards = loadStoredCards();
  const dueRegionIds: string[] = [];
  const futureRegionIds: string[] = [];

  uniqueValidIds.forEach((regionId) => {
    const card = getCardOrDefault(regionId, cards);
    if (isDue(card)) {
      dueRegionIds.push(regionId);
    } else {
      futureRegionIds.push(regionId);
    }
  });

  const prioritizedPool = [...shuffle(dueRegionIds), ...shuffle(futureRegionIds)];
  if (prioritizedPool.length === 0) {
    return [];
  }

  const questions: QuizQuestion[] = [];
  for (let i = 0; i < sessionCount; i += 1) {
    const regionId = prioritizedPool[i % prioritizedPool.length];
    const type = QUESTION_CYCLE[i % QUESTION_CYCLE.length];

    if (type === 'mcq') {
      questions.push(generateMCQ(regionId));
    } else if (type === 'spatial') {
      questions.push(generateSpatial(regionId));
    } else {
      questions.push(generateFreeText(regionId));
    }
  }

  return questions;
}
