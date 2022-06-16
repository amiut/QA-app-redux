import Icon from '@components/Common/Icon';
import useOnClickOutside from '@hooks/useClickOutside';
import useToggle from '@hooks/useToggle';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuestions } from 'state/questions/hooks/useQuestions';
import { v4 as uuidv4 } from 'uuid';

const AddQuestionForm = () => {
  const [addQuestionHelp, toggleAddQuestionHelp] = useToggle();
  const [processing, setProcessing] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [errors, setErrors] = useState({ question: '', answer: '' });
  const addQuestionHeading = useRef<HTMLHeadingElement>(null);
  const addForm = useRef<HTMLFormElement>(null);

  const { addQuestion, addQuestionAsyncly, config } = useQuestions();

  useOnClickOutside(addQuestionHeading, () => {
    if (addQuestionHelp) toggleAddQuestionHelp();
  });

  const addQuestionHandler = () => {
    if (!question || question.length < 3) {
      setErrors((errors) => ({ ...errors, question: 'Please enter a question with minimum 3 chars' }));
      return;
    }

    if (!answer || answer.length < 3) {
      setErrors((errors) => ({ ...errors, answer: 'Please enter an answer with minimum 3 chars' }));
      return;
    }

    const newQuestion = { question, answer, id: uuidv4() };

    if (config.sendAfter5s) {
      setProcessing(true);
      const questionAdd = addQuestionAsyncly(newQuestion).then(
        () => {
          setProcessing(false);
          setQuestion('');
          setAnswer('');
        },
        () => {
          setProcessing(true);
        },
      );

      toast.promise(questionAdd, {
        pending: 'Adding Question, please wait...',
        success: 'Question Added!!',
      });
    } else {
      addQuestion(newQuestion);
      setQuestion('');
      setAnswer('');

      toast.success('Question Added!!');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold flex max-w-max mx-auto items-center mb-6" ref={addQuestionHeading}>
        Add a Question{' '}
        <button
          type="button"
          className={`ml-3 tooltip disabled-hover ${addQuestionHelp ? 'tooltip--visible' : ''}`}
          aria-label="Here You can add a new question to the list"
          onClick={() => {
            toggleAddQuestionHelp();
          }}
        >
          <Icon name="help" className="w-6 h-6" />
        </button>
      </h2>

      <form
        ref={addForm}
        onSubmit={(e) => {
          e.preventDefault();
          addQuestionHandler();
        }}
      >
        <div className="form-row mb-5">
          <label className="table mb-2 cursor-pointer" htmlFor="question">
            Question:
          </label>
          <input
            className="block w-full mb-1 h-10 border border-neutral-400 rounded-lg px-4"
            type="text"
            id="question"
            placeholder="question"
            value={question}
            disabled={processing}
            onChange={(e) => {
              setErrors((errors) => ({ ...errors, question: '' }));
              setQuestion(e.target.value);
            }}
          />

          {errors.question && <div className="text-red-600 text-sm font-medium">{errors.question}</div>}
        </div>

        <div className="form-row mb-5">
          <label className="table mb-2 cursor-pointer" htmlFor="answer">
            Answer:
          </label>
          <textarea
            id="answer"
            className="block pt-3 w-full resize-none h-24 mb-1 border border-neutral-400 rounded-lg px-4"
            placeholder="answer"
            value={answer}
            disabled={processing}
            onChange={(e) => {
              setErrors((errors) => ({ ...errors, answer: '' }));
              setAnswer(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && config.enterKeyIsSend) {
                e.preventDefault();
                addQuestionHandler();
              }
            }}
          ></textarea>
          {errors.answer && <div className="text-red-600 text-sm font-medium">{errors.answer}</div>}
        </div>

        <button
          disabled={processing}
          className="text-white font-bold bg-purple-700 px-5 py-3 rounded-lg mx-auto table"
          type="submit"
        >
          + Add question
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
