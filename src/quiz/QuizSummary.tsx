import type { QuizAnswer } from '../atlas/types';
import { REGION_MAP } from '../atlas/regionData';

interface Props {
  answers: QuizAnswer[];
  onRestart: () => void;
  onExit: () => void;
}

export function QuizSummary({ answers, onRestart, onExit }: Props) {
  const correct = answers.filter((a) => a.correct).length;
  const total = answers.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgTime =
    total > 0
      ? Math.round(answers.reduce((s, a) => s + a.timeMs, 0) / total / 1000)
      : 0;

  const mistakes = answers.filter((a) => !a.correct);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Session Complete</h2>

      <div style={styles.scoreCard}>
        <div style={styles.bigScore}>
          {correct}/{total}
        </div>
        <div style={styles.pct}>{pct}% accuracy</div>
        <div style={styles.time}>Avg. {avgTime}s per question</div>
      </div>

      {mistakes.length > 0 && (
        <div style={styles.mistakes}>
          <h3 style={styles.mistakesTitle}>Review Mistakes</h3>
          {mistakes.map((a, i) => {
            const region = REGION_MAP[a.regionId];
            return (
              <div key={i} style={styles.mistakeItem}>
                <span style={{ color: region?.color || '#888' }}>
                  {region?.acronym || a.regionId}
                </span>
                <span style={styles.mistakeDetail}>
                  {region?.name} — you said "{a.userAnswer}"
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div style={styles.actions}>
        <button style={styles.btn} onClick={onRestart}>
          Try Again
        </button>
        <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={onExit}>
          Back to Explore
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#e0e4ec',
    margin: 0,
  },
  scoreCard: {
    padding: '20px',
    background: 'rgba(100, 140, 255, 0.08)',
    borderRadius: '12px',
    border: '1px solid rgba(100, 140, 255, 0.2)',
    textAlign: 'center',
  },
  bigScore: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#c0d0ff',
  },
  pct: {
    fontSize: '14px',
    color: '#8890a0',
    marginTop: '4px',
  },
  time: {
    fontSize: '12px',
    color: '#6a7080',
    marginTop: '4px',
  },
  mistakes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  mistakesTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#e0e4ec',
    margin: 0,
  },
  mistakeItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline',
    fontSize: '12px',
    padding: '4px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  mistakeDetail: {
    color: '#6a7080',
    fontSize: '11px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  btn: {
    flex: 1,
    padding: '10px',
    border: '1px solid rgba(100, 140, 255, 0.3)',
    borderRadius: '8px',
    background: 'rgba(100, 140, 255, 0.15)',
    color: '#c0d0ff',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: "'Inter', sans-serif",
  },
  btnSecondary: {
    background: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
    color: '#8890a0',
  },
};
