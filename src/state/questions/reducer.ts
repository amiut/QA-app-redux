import { createReducer } from '@reduxjs/toolkit';

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

export const initialState: IQuestionsState = {
  questions: [],
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
    .addCase(removeQuestion, ({ questions, activities }, action) => {
      activities.push({
        id: action.payload,
        type: 'removed',
      });

      return { activities, questions: questions.filter((question) => question.id !== action.payload) };
    }),
);
