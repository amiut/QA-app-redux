import { useQuestions } from 'state/questions/hooks/useQuestions';

const QuestionsList = () => {
  const { questions, removeQuestion } = useQuestions();

  return (
    <div>
      {questions.length}
      <ul>
        {questions.map((question) => (
          <li key={question.id} id={question.id}>
            {question.question} <p>{question.answer}</p>
            <div>
              <button
                type="button"
                onClick={() => {
                  removeQuestion(question.id);
                }}
              >
                remove -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
