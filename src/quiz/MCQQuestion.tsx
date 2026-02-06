import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { REGION_MAP } from '../atlas/regionData';
import type { QuizAnswer, QuizQuestion } from '../atlas/types';

type MCQQuestionProps = {
  question: QuizQuestion;
  onAnswer: (answer: QuizAnswer) => void;
};

export function MCQQuestion({ question, onAnswer }: MCQQuestionProps) {
  return (
    <MCQQuestionInner key={question.id} question={question} onAnswer={onAnswer} />
  );
}

function MCQQuestionInner({ question, onAnswer }: MCQQuestionProps) {
  const startTimeRef = useRef<number>(0);
  const [answered, setAnswered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const options = useMemo(() => {
    const normalized = (question.options ?? []).slice(0, 4);
    while (normalized.length < 4) {
      normalized.push('');
    }
    return normalized;
  }, [question.options]);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const submitAnswer = useCallback(
    (optionId: string) => {
      if (answered || !optionId) {
        return;
      }

      setAnswered(true);
      onAnswer({
        questionId: question.id,
        regionId: question.regionId,
        userAnswer: optionId,
        correct: optionId === question.correctAnswer,
        timeMs: Date.now() - startTimeRef.current,
      });
    },
    [answered, onAnswer, question.correctAnswer, question.id, question.regionId],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (answered) {
        return;
      }

      const index = Number(event.key) - 1;
      if (index < 0 || index > 3) {
        return;
      }

      const optionId = options[index];
      if (!optionId) {
        return;
      }

      event.preventDefault();
      submitAnswer(optionId);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [answered, options, submitAnswer]);

  return (
    <section
      style={{
        width: '100%',
        maxWidth: 720,
        margin: '0 auto',
        color: '#e8edf5',
      }}
    >
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '1.1rem',
          lineHeight: 1.4,
        }}
      >
        {question.prompt}
      </p>

      <div
        style={{
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        {options.map((optionId, index) => {
          const disabled = answered || !optionId;
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={`${index}-${optionId || 'empty'}`}
              type="button"
              disabled={disabled}
              onClick={() => submitAnswer(optionId)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex((current) =>
                current === index ? null : current,
              )}
              style={{
                textAlign: 'left',
                padding: '0.85rem 1rem',
                borderRadius: 10,
                border: `1px solid ${isHovered ? '#5b7cff' : '#2a3447'}`,
                background: isHovered ? '#1b2433' : '#121a28',
                color: '#e8edf5',
                transition: 'background 0.15s ease, border-color 0.15s ease',
                opacity: disabled ? 0.65 : 1,
              }}
            >
              <span style={{ color: '#99a8c8', marginRight: '0.5rem' }}>
                {index + 1}.
              </span>
              {optionId ? (REGION_MAP[optionId]?.name ?? optionId) : '—'}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default MCQQuestion;
