import { useCallback, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { BRAIN_REGIONS } from '../atlas/regionData';
import { generateSession } from './questionGenerator';
import { MCQQuestion } from './MCQQuestion';
import { SpatialQuestion } from './SpatialQuestion';
import { FreeTextQuestion } from './FreeTextQuestion';
import { QuizFeedback } from './QuizFeedback';
import { QuizProgress } from './QuizProgress';
import { QuizSummary } from './QuizSummary';
import type { QuizAnswer } from '../atlas/types';

export function QuizEngine() {
  const quizActive = useAppStore((s) => s.quizActive);
  const currentQuestion = useAppStore((s) => s.currentQuestion);
  const sessionAnswers = useAppStore((s) => s.sessionAnswers);
  const startQuiz = useAppStore((s) => s.startQuiz);
  const answerQuestion = useAppStore((s) => s.answerQuestion);
  const nextQuestion = useAppStore((s) => s.nextQuestion);
  const endQuiz = useAppStore((s) => s.endQuiz);
  const updateCard = useAppStore((s) => s.updateCard);
  const initCard = useAppStore((s) => s.initCard);
  const setSelectedRegion = useAppStore((s) => s.setSelectedRegion);

  // Highlight the target region in 3D when a new question appears
  useEffect(() => {
    if (currentQuestion) {
      setSelectedRegion(currentQuestion.regionId);
    } else if (!quizActive) {
      setSelectedRegion(null);
    }
  }, [currentQuestion, quizActive, setSelectedRegion]);

  const lastAnswer = sessionAnswers.length > 0
    ? sessionAnswers[sessionAnswers.length - 1]
    : null;

  const handleStart = useCallback(
    (count: number) => {
      const regionIds = BRAIN_REGIONS.map((r) => r.id);
      regionIds.forEach((id) => initCard(id));
      const questions = generateSession(regionIds, count);
      startQuiz(questions);
    },
    [startQuiz, initCard],
  );

  const handleAnswer = useCallback(
    (answer: QuizAnswer) => {
      answerQuestion(answer);
      updateCard(answer.regionId, answer.correct ? 4 : 1);
    },
    [answerQuestion, updateCard],
  );

  const handleNext = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  // Not started yet
  if (!quizActive) {
    if (sessionAnswers.length > 0) {
      return (
        <QuizSummary
          answers={sessionAnswers}
          onRestart={() => handleStart(10)}
          onExit={endQuiz}
        />
      );
    }

    return (
      <div style={styles.startScreen}>
        <h2 style={styles.title}>Quiz Mode</h2>
        <p style={styles.desc}>
          Test your knowledge of mouse neuroanatomy. A region will be
          highlighted in the 3D view — identify it via multiple choice or typing.
        </p>
        <div style={styles.buttons}>
          <button style={styles.startBtn} onClick={() => handleStart(10)}>
            Quick (10 questions)
          </button>
          <button style={styles.startBtn} onClick={() => handleStart(20)}>
            Standard (20 questions)
          </button>
          <button style={styles.startBtn} onClick={() => handleStart(30)}>
            Full (30 questions)
          </button>
        </div>
      </div>
    );
  }

  // Quiz complete
  if (!currentQuestion) {
    return (
      <QuizSummary
        answers={sessionAnswers}
        onRestart={() => handleStart(10)}
        onExit={endQuiz}
      />
    );
  }

  return (
    <div style={styles.quizContainer}>
      <QuizProgress />

      {lastAnswer && (
        <QuizFeedback answer={lastAnswer} onNext={handleNext} />
      )}

      {!lastAnswer || lastAnswer.questionId !== currentQuestion.id ? (
        <div style={styles.questionArea}>
          {currentQuestion.type === 'mcq' && (
            <MCQQuestion question={currentQuestion} onAnswer={handleAnswer} />
          )}
          {currentQuestion.type === 'spatial' && (
            <SpatialQuestion question={currentQuestion} onAnswer={handleAnswer} />
          )}
          {currentQuestion.type === 'freetext' && (
            <FreeTextQuestion question={currentQuestion} onAnswer={handleAnswer} />
          )}
        </div>
      ) : null}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  startScreen: {
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#e0e4ec',
    margin: 0,
  },
  desc: {
    fontSize: '13px',
    color: '#8890a0',
    lineHeight: 1.5,
    margin: 0,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  startBtn: {
    padding: '10px 16px',
    border: '1px solid rgba(100, 140, 255, 0.3)',
    borderRadius: '8px',
    background: 'rgba(100, 140, 255, 0.1)',
    color: '#c0d0ff',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s',
  },
  quizContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '12px',
    gap: '12px',
  },
  questionArea: {
    flex: 1,
  },
};
