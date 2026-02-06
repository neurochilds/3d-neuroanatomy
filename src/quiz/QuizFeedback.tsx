import type { QuizAnswer } from '../atlas/types';
import { REGION_MAP } from '../atlas/regionData';

interface Props {
  answer: QuizAnswer;
  onNext: () => void;
}

export function QuizFeedback({ answer, onNext }: Props) {
  const region = REGION_MAP[answer.regionId];
  const correct = answer.correct;

  return (
    <div
      style={{
        ...styles.container,
        borderColor: correct
          ? 'rgba(46, 204, 113, 0.4)'
          : 'rgba(231, 76, 60, 0.4)',
        background: correct
          ? 'rgba(46, 204, 113, 0.08)'
          : 'rgba(231, 76, 60, 0.08)',
      }}
    >
      <div style={styles.status}>
        {correct ? '✓ Correct!' : '✗ Incorrect'}
      </div>
      {!correct && region && (
        <div style={styles.correctAnswer}>
          Correct answer: <strong>{region.name}</strong> ({region.acronym})
        </div>
      )}
      <button style={styles.nextBtn} onClick={onNext}>
        Next →
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid',
  },
  status: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#e0e4ec',
  },
  correctAnswer: {
    fontSize: '12px',
    color: '#8890a0',
    marginTop: '4px',
  },
  nextBtn: {
    marginTop: '8px',
    padding: '6px 14px',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.05)',
    color: '#c0d0ff',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: "'Inter', sans-serif",
  },
};
