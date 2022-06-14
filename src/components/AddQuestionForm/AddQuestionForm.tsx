import { useState } from 'react';
import { useQuestions } from 'state/questions/hooks/useQuestions';
import { v4 as uuidv4 } from 'uuid';

const AddQuestionForm = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const { addQuestion } = useQuestions();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          addQuestion({ question, answer, id: uuidv4() });
        }}
      >
        <input
          className="block mb-5 h-10 border border-neutral-400 rounded-lg px-4"
          type="text"
          placeholder="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />

        <textarea
          className="block pt-3 resize-none h-24 mb-5 border border-neutral-400 rounded-lg px-4"
          placeholder="answer"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        ></textarea>
        <button type="submit">+ Add question</button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
