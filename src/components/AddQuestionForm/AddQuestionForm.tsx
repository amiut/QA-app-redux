import { useEffect, useState } from 'react';
import { useQuestions } from 'state/questions/hooks/useQuestions';
import { v4 as uuidv4 } from 'uuid';

const AddQuestionForm = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const { addQuestion, removeLastQuestion } = useQuestions();

  useEffect(() => {
    const undo = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        removeLastQuestion();
      }
    };

    document.addEventListener('keydown', undo);

    return () => {
      document.removeEventListener('keydown', undo);
    };
  }, [removeLastQuestion]);

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          addQuestion({ question, answer, id: uuidv4() });
        }}
      >
        <label className="block mb-2 cursor-pointer" htmlFor="question">
          Question:
        </label>
        <input
          className="block w-full mb-5 h-10 border border-neutral-400 rounded-lg px-4"
          type="text"
          id="question"
          placeholder="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />

        <label className="block mb-2 cursor-pointer" htmlFor="answer">
          Answer:
        </label>
        <textarea
          id="answer"
          className="block pt-3 w-full resize-none h-24 mb-5 border border-neutral-400 rounded-lg px-4"
          placeholder="answer"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        ></textarea>
        <button className="text-white font-bold bg-purple-700 px-5 py-3 rounded-lg mx-auto table" type="submit">
          + Add question
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
