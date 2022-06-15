import { Accordion, AccordionGroup, AccordionPanel, AccordionToggle, useAccordion } from 'accordionify';
import { useQuestions } from 'state/questions/hooks/useQuestions';
import { IQuestion } from 'state/questions/reducer';

import QuestionItem from './QuestionItem';

/*
 * Moving away Accordion library concern for QuestionItem component
 * Just trying to make an example passing components as props
 * May seem not useful at all :D
 */
const AccordionifiedQItem = ({ question }: { question: IQuestion }) => {
  const { expanded } = useAccordion();

  return <QuestionItem question={question} head={AccordionToggle} body={AccordionPanel} expanded={expanded} />;
};

const QuestionsList = () => {
  const { questions } = useQuestions();

  return (
    <div className="mb-10">
      <h2
        className="text-3xl font-bold flex items-center mb-6 tooltip max-w-max mx-auto"
        aria-label="You can see a list of questions here, modify or delete them"
      >
        List of Questions{' '}
        <small className="font-light text-white ml-2 px-3 rounded-lg bg-purple-600 text-base">
          {questions.length} Questions
        </small>
      </h2>

      {questions.length ? (
        <>
          {/*
        I Know I was supposed to create accordions without any external libraries
        But this is a very simple library i created myself so i used to save some time:
        @link https://github.com/amiut/accordionify
      */}
          <AccordionGroup atomic>
            {questions.map((question) => (
              <Accordion key={question.id} className="w-full border mb-3 border-neutral-200 rounded-lg">
                <AccordionifiedQItem question={question} />
              </Accordion>
            ))}
          </AccordionGroup>
        </>
      ) : (
        <div className="text-center bg-purple-100 rounded-lg py-5 text-purple-900 font-bold">
          😶️ <br />
          No Questions Asked so far...
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
