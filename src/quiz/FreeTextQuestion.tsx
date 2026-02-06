import { useCallback, useEffect, useRef, useState } from 'react';
import { REGION_MAP } from '../atlas/regionData';
import type { QuizAnswer, QuizQuestion } from '../atlas/types';

type FreeTextQuestionProps = {
  question: QuizQuestion;
  onAnswer: (answer: QuizAnswer) => void;
};

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function fuzzyMatch(input: string, question: QuizQuestion): boolean {
  const normalizedInput = normalize(input);
  if (!normalizedInput) {
    return false;
  }

  const correctRegion =
    REGION_MAP[question.correctAnswer] ?? REGION_MAP[question.regionId];
  const normalizedAcronym = normalize(correctRegion?.acronym ?? question.correctAnswer);
  const normalizedName = normalize(correctRegion?.name ?? question.correctAnswer);
  const normalizedId = normalize(question.correctAnswer);

  if (
    normalizedInput === normalizedAcronym ||
    normalizedInput === normalizedName ||
    normalizedInput === normalizedId
  ) {
    return true;
  }

  if (normalizedInput.length < 2) {
    return false;
  }

  return (
    normalizedInput.includes(normalizedAcronym) ||
    normalizedAcronym.includes(normalizedInput) ||
    normalizedInput.includes(normalizedName) ||
    normalizedName.includes(normalizedInput) ||
    normalizedInput.includes(normalizedId) ||
    normalizedId.includes(normalizedInput)
  );
}

export function FreeTextQuestion({
  question,
  onAnswer,
}: FreeTextQuestionProps) {
  return (
    <FreeTextQuestionInner
      key={question.id}
      question={question}
      onAnswer={onAnswer}
    />
  );
}

function FreeTextQuestionInner({ question, onAnswer }: FreeTextQuestionProps) {
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const submit = useCallback(() => {
    if (answered) {
      return;
    }

    setAnswered(true);
    onAnswer({
      questionId: question.id,
      regionId: question.regionId,
      userAnswer: input.trim(),
      correct: fuzzyMatch(input, question),
      timeMs: Date.now() - startTimeRef.current,
    });
  }, [answered, input, onAnswer, question]);

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

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        style={{ display: 'flex', gap: '0.75rem' }}
      >
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={answered}
          placeholder="Type region name or acronym"
          style={{
            flex: 1,
            borderRadius: 10,
            border: '1px solid #2a3447',
            background: '#121a28',
            color: '#e8edf5',
            padding: '0.85rem 1rem',
            outline: 'none',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          disabled={answered}
          style={{
            padding: '0.85rem 1rem',
            borderRadius: 10,
            border: '1px solid #2a3447',
            background: '#192334',
            color: '#e8edf5',
          }}
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default FreeTextQuestion;
