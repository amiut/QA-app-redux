import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { addQuestion, removeLastAddedQuestion, removeQuestion } from './actions';

export interface IQuestion {
  question: string;
  answer: string;
  id: string;
}

export interface IActivity {
  type: 'added' | 'removed' | 'edited';
  id: string;
}

export interface IQuestionsState {
  questions: IQuestion[];
  activities: IActivity[];
}

const initialQuestion: IQuestion = {
  id: uuidv4(),
  question: 'How to ask a question?',
  answer: 'It is as simple as filling the "Add question" form below and hit enter',
};

export const initialState: IQuestionsState = {
  questions: [initialQuestion],
  activities: [],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addQuestion, ({ questions, activities }, action) => {
      questions.push(action.payload);
      activities.push({
        id: action.payload.id,
        type: 'added',
      });
    })
    .addCase(removeLastAddedQuestion, ({ questions, activities }) => {
      if (questions.length) {
        const question = questions.pop();

        if (question) {
          activities.push({
            id: question.id,
            type: 'removed',
          });
        }
      }
    })
    .addCase(removeQuestion, (state, action) => {
      state.activities.push({
        id: action.payload,
        type: 'removed',
      });

      state.questions = state.questions.filter((question) => question.id !== action.payload);
    }),
);
