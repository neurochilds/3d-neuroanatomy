import type { SRCard } from '../atlas/types';

const DAY_MS = 86_400_000;
const MIN_EASE_FACTOR = 1.3;

function clampQuality(quality: number): number {
  return Math.max(0, Math.min(5, Math.round(quality)));
}

function getUpdatedEaseFactor(easeFactor: number, quality: number): number {
  const updated =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return Math.max(MIN_EASE_FACTOR, updated);
}

export function calculateNextReview(card: SRCard, quality: number): SRCard {
  const now = Date.now();
  const normalizedQuality = clampQuality(quality);

  let { interval, repetitions } = card;
  const easeFactor = getUpdatedEaseFactor(card.easeFactor, normalizedQuality);

  if (normalizedQuality >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  return {
    ...card,
    easeFactor,
    interval,
    repetitions,
    nextReview: now + interval * DAY_MS,
    lastReview: now,
  };
}

export function isDue(card: SRCard): boolean {
  return card.nextReview <= Date.now();
}

export function getInitialCard(regionId: string): SRCard {
  const now = Date.now();
  return {
    regionId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: now,
    lastReview: 0,
  };
}
