import Icon from '@components/Common/Icon';
import MessageWithUndo from '@components/Common/MessageWithUndo';
import useToggle from '@hooks/useToggle';
import { Accordion, AccordionGroup, AccordionPanel, AccordionToggle, useAccordion } from 'accordionify';
import produce from 'immer';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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
  const [removeTypeExpanded, toggleRemoveExpand] = useToggle();
  const [removeMode, toggleRemoveMode] = useToggle();
  const [itemsToRemove, setItemsToRemove] = useState<IQuestion[]>([]);
  const { questions, removeQuestion, removeAllQuestions, sortAllQuestions } = useQuestions();

  return (
    <div className="mb-10">
      <h2
        className="text-xl sm:text-3xl font-bold flex items-center mb-6 tooltip max-w-max mx-auto"
        aria-label="You can see a list of questions here, modify or delete them"
      >
        List of Questions{' '}
        <small className="font-light text-white ml-2 px-3 rounded-lg bg-purple-600 text-sm sm:text-base">
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
              <div className="flex items-center" key={question.id}>
                {removeMode && (
                  <label className="flex w-10 h-10 justify-center items-center cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItemsToRemove(
                            produce((draft) => {
                              draft.push(question);
                            }),
                          );
                        } else {
                          setItemsToRemove(
                            produce((draft) => {
                              return draft.filter((q) => q.id !== question.id);
                            }),
                          );
                        }
                      }}
                    />
                  </label>
                )}

                <div className="flex-1 min-w-0">
                  <Accordion className="w-full border mb-3 border-neutral-200 rounded-lg">
                    <AccordionifiedQItem question={question} />
                  </Accordion>
                </div>
              </div>
            ))}
          </AccordionGroup>

          <div className="flex justify-center">
            <button
              onClick={() => {
                sortAllQuestions();
              }}
              type="button"
              className="bg-indigo-500 text-sm font-medium text-white h-8 px-3.5 mr-5 rounded-md"
            >
              Sort by A-Z
            </button>

            <div className="bg-red-600 relative text-sm font-medium text-white h-8 rounded-md flex">
              <button
                type="button"
                className="px-3.5 relative"
                onClick={() => {
                  if (removeMode && itemsToRemove.length) {
                    itemsToRemove.forEach((item) => {
                      removeQuestion(item.id);
                    });

                    setItemsToRemove([]);
                    toggleRemoveMode();
                  } else {
                    toggleRemoveMode();
                  }
                }}
              >
                {removeMode && itemsToRemove.length > 0
                  ? `Remove Selected ${itemsToRemove.length} Items`
                  : 'Remove Individual Questions'}
              </button>
              <button
                onClick={() => {
                  toggleRemoveExpand();
                }}
                type="button"
                className="border-l px-1 border-red-700"
              >
                <Icon name="down" className="w-6 h-6 text-white" />
              </button>

              {removeTypeExpanded && (
                <div className="more-options bg-red-600 mt-0.5 py-2 rounded-lg z-10 absolute top-full w-full left-0">
                  <button
                    type="button"
                    className="px-3.5"
                    onClick={() => {
                      removeAllQuestions();
                      toggleRemoveExpand();

                      toast.success(<MessageWithUndo message="Questions Removed!!" />);
                    }}
                  >
                    Remove All Questions
                  </button>
                </div>
              )}
            </div>

            {removeMode && itemsToRemove.length > 0 && (
              <button
                onClick={() => {
                  setItemsToRemove([]);

                  toggleRemoveMode();
                }}
                className="bg-gray-600 ml-3 px-3 h-8 text-sm font-medium text-white rounded-md"
              >
                Cancel selected
              </button>
            )}
          </div>
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
