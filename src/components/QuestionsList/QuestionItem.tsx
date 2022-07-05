import Icon from '@components/Common/Icon';
import MessageWithUndo from '@components/Common/MessageWithUndo';
import React, { memo } from 'react';
import { toast } from 'react-toastify';
import useEditQuestion from 'state/questions/hooks/useEditQuestion';
import { useQuestions } from 'state/questions/hooks/useQuestions';
import { IQuestion } from 'state/questions/reducer';

interface IProps {
  head: React.FC<React.HTMLAttributes<HTMLElement>>;
  body: React.FC<React.HTMLAttributes<HTMLElement>>;
  question: IQuestion;
  expanded: boolean;
}

const QuestionItem = ({ question, head: QuestionWrapper, body: AnswerWrapper, expanded = false }: IProps) => {
  const { removeQuestion } = useQuestions();
  const { stageQuestion } = useEditQuestion();

  console.info(question.id);

  return (
    <>
      <QuestionWrapper className={`py-3 flex px-4 border-b ${expanded ? 'border-neutral-200' : 'border-transparent'}`}>
        <span className="flex-1 min-w-0">{question.question}</span>

        <span className="actions ml-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stageQuestion(question);
            }}
          >
            <Icon name="edit" className="w-6 h-5" />
          </button>
          <button
            type="button"
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();
              removeQuestion(question.id);
              toast.success(<MessageWithUndo message="Questions Removed!!" />);
            }}
          >
            <Icon name="trash" className="w-6 h-5" />
          </button>
        </span>
      </QuestionWrapper>

      <AnswerWrapper className="p-4">{question.answer}</AnswerWrapper>
    </>
  );
};

export default memo(QuestionItem);
