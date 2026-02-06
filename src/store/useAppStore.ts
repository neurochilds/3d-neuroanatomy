import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppMode, SRCard, QuizQuestion, QuizAnswer } from '../atlas/types';

// ---------------------------------------------------------------------------
// Combined state interface
// ---------------------------------------------------------------------------
interface AppState {
  // ViewerSlice
  visibleRegions: Set<string>;
  hoveredRegion: string | null;
  selectedRegion: string | null;
  shellOpacity: number;
  showLabels: boolean;
  setHoveredRegion: (id: string | null) => void;
  setSelectedRegion: (id: string | null) => void;
  setShellOpacity: (opacity: number) => void;
  toggleLabels: () => void;
  toggleRegionVisibility: (id: string) => void;
  showAllRegions: (ids: string[]) => void;

  // TeachingSlice
  hierarchyExpanded: Set<string>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleHierarchyNode: (nodeId: string) => void;

  // QuizSlice
  quizActive: boolean;
  currentQuestion: QuizQuestion | null;
  questionQueue: QuizQuestion[];
  sessionAnswers: QuizAnswer[];
  sessionScore: number;
  streak: number;
  bestStreak: number;
  startQuiz: (questions: QuizQuestion[]) => void;
  answerQuestion: (answer: QuizAnswer) => void;
  nextQuestion: () => void;
  endQuiz: () => void;

  // ProgressSlice (persisted)
  srCards: Record<string, SRCard>;
  totalReviews: number;
  initCard: (regionId: string) => void;
  updateCard: (regionId: string, quality: number) => void;
  getCard: (regionId: string) => SRCard | undefined;
  getDueCards: () => string[];

  // SettingsSlice (persisted)
  appMode: AppMode;
  showBilateral: boolean;
  setAppMode: (mode: AppMode) => void;
  toggleBilateral: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // -------------------------------------------------------------------
      // ViewerSlice
      // -------------------------------------------------------------------
      visibleRegions: new Set<string>(),
      hoveredRegion: null,
      selectedRegion: null,
      shellOpacity: 0.3,
      showLabels: true,

      setHoveredRegion: (id) => set({ hoveredRegion: id }),

      setSelectedRegion: (id) => set({ selectedRegion: id }),

      setShellOpacity: (opacity) => set({ shellOpacity: opacity }),

      toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),

      toggleRegionVisibility: (id) =>
        set((s) => {
          const next = new Set(s.visibleRegions);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { visibleRegions: next };
        }),

      showAllRegions: (ids) => set({ visibleRegions: new Set(ids) }),

      // -------------------------------------------------------------------
      // TeachingSlice
      // -------------------------------------------------------------------
      hierarchyExpanded: new Set<string>(),
      searchQuery: '',

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleHierarchyNode: (nodeId) =>
        set((s) => {
          const next = new Set(s.hierarchyExpanded);
          if (next.has(nodeId)) {
            next.delete(nodeId);
          } else {
            next.add(nodeId);
          }
          return { hierarchyExpanded: next };
        }),

      // -------------------------------------------------------------------
      // QuizSlice
      // -------------------------------------------------------------------
      quizActive: false,
      currentQuestion: null,
      questionQueue: [],
      sessionAnswers: [],
      sessionScore: 0,
      streak: 0,
      bestStreak: 0,

      startQuiz: (questions) =>
        set({
          quizActive: true,
          currentQuestion: questions[0] ?? null,
          questionQueue: questions.slice(1),
          sessionAnswers: [],
          sessionScore: 0,
          streak: 0,
          bestStreak: 0,
        }),

      answerQuestion: (answer) =>
        set((s) => {
          const newAnswers = [...s.sessionAnswers, answer];
          const newScore = s.sessionScore + (answer.correct ? 1 : 0);
          const newStreak = answer.correct ? s.streak + 1 : 0;
          const newBestStreak = Math.max(s.bestStreak, newStreak);
          return {
            sessionAnswers: newAnswers,
            sessionScore: newScore,
            streak: newStreak,
            bestStreak: newBestStreak,
          };
        }),

      nextQuestion: () =>
        set((s) => {
          const [next, ...rest] = s.questionQueue;
          return {
            currentQuestion: next ?? null,
            questionQueue: rest,
          };
        }),

      endQuiz: () =>
        set({
          quizActive: false,
          currentQuestion: null,
          questionQueue: [],
        }),

      // -------------------------------------------------------------------
      // ProgressSlice (persisted)
      // -------------------------------------------------------------------
      srCards: {},
      totalReviews: 0,

      initCard: (regionId) =>
        set((s) => {
          if (s.srCards[regionId]) return s;
          const card: SRCard = {
            regionId,
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            nextReview: Date.now(),
            lastReview: 0,
          };
          return { srCards: { ...s.srCards, [regionId]: card } };
        }),

      updateCard: (regionId, quality) =>
        set((s) => {
          const existing = s.srCards[regionId];
          if (!existing) return s;

          let { easeFactor, interval, repetitions } = existing;

          if (quality >= 3) {
            // Success
            if (repetitions === 0) {
              interval = 1;
            } else if (repetitions === 1) {
              interval = 6;
            } else {
              interval = Math.round(interval * easeFactor);
            }
            repetitions++;
            easeFactor =
              easeFactor +
              (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
            easeFactor = Math.max(1.3, easeFactor);
          } else {
            // Failure
            repetitions = 0;
            interval = 1;
          }

          const now = Date.now();
          const updatedCard: SRCard = {
            regionId,
            easeFactor,
            interval,
            repetitions,
            nextReview: now + interval * 86_400_000,
            lastReview: now,
          };

          return {
            srCards: { ...s.srCards, [regionId]: updatedCard },
            totalReviews: s.totalReviews + 1,
          };
        }),

      getCard: (regionId) => get().srCards[regionId],

      getDueCards: () => {
        const now = Date.now();
        return Object.values(get().srCards)
          .filter((card) => card.nextReview <= now)
          .map((card) => card.regionId);
      },

      // -------------------------------------------------------------------
      // SettingsSlice (persisted)
      // -------------------------------------------------------------------
      appMode: 'teaching',
      showBilateral: true,

      setAppMode: (mode) => set({ appMode: mode }),

      toggleBilateral: () => set((s) => ({ showBilateral: !s.showBilateral })),
    }),
    {
      name: 'neuroanatomy-store',
      partialize: (state) => ({
        // ProgressSlice fields
        srCards: state.srCards,
        totalReviews: state.totalReviews,
        // SettingsSlice fields
        appMode: state.appMode,
        showBilateral: state.showBilateral,
      }),
    },
  ),
);
