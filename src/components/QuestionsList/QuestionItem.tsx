import React from 'react';
import { IQuestion } from 'state/questions/reducer';

interface IProps {
  head: React.FC<React.HTMLAttributes<HTMLElement>>;
  body: React.FC<React.HTMLAttributes<HTMLElement>>;
  question: IQuestion;
  expanded: boolean;
}

const QuestionItem = ({ question, head: QuestionWrapper, body: AnswerWrapper, expanded = false }: IProps) => {
  return (
    <>
      <QuestionWrapper className={`py-3 px-4 border-b ${expanded ? 'border-neutral-200' : 'border-transparent'}`}>
        {question.question}
      </QuestionWrapper>

      <AnswerWrapper className="p-4">{question.answer}</AnswerWrapper>
    </>
  );
};

export default QuestionItem;
