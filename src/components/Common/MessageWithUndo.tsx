import { ReactNode } from 'react';
import { useQuestions } from 'state/questions/hooks/useQuestions';

interface IProps {
  message: ReactNode;
}

const MessageWithUndo = ({ message }: IProps) => {
  const { restorePreviousQuestions } = useQuestions();

  return (
    <div>
      {message}{' '}
      <button
        onClick={(e) => {
          restorePreviousQuestions();
        }}
        className="bg-gray-800 text-white text-xs px-3 h-8 inline-flex items-center rounded-md"
        type="button"
      >
        Undo
      </button>
    </div>
  );
};

export default MessageWithUndo;
