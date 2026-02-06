import type { QuizQuestion, QuizAnswer } from '../atlas/types';
import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

interface Props {
  question: QuizQuestion;
  onAnswer: (answer: QuizAnswer) => void;
}

export function SpatialQuestion({ question, onAnswer }: Props) {
  const startTime = useRef(Date.now());
  const answered = useRef(false);

  // Listen for region clicks in the 3D view via store changes
  const selectedRegion = useAppStore((s) => s.selectedRegion);
  const prevSelected = useRef(selectedRegion);

  useEffect(() => {
    startTime.current = Date.now();
    answered.current = false;
    prevSelected.current = selectedRegion;
  }, [question.id]);

  useEffect(() => {
    if (
      answered.current ||
      selectedRegion === prevSelected.current ||
      !selectedRegion
    )
      return;

    answered.current = true;
    const correct = selectedRegion === question.correctAnswer;
    onAnswer({
      questionId: question.id,
      regionId: question.regionId,
      userAnswer: selectedRegion,
      correct,
      timeMs: Date.now() - startTime.current,
    });
  }, [selectedRegion, question, onAnswer]);

  return (
    <div style={styles.container}>
      <div style={styles.prompt}>{question.prompt}</div>
      <div style={styles.hint}>
        Click the correct region in the 3D brain
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  prompt: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#e0e4ec',
    lineHeight: 1.4,
  },
  hint: {
    fontSize: '12px',
    color: '#6a7080',
    fontStyle: 'italic',
  },
};
