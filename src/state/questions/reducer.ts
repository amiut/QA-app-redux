import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
  addQuestion,
  addQuestionAsync,
  removeAllQuestions,
  removeLastAddedQuestion,
  removeQuestion,
  setConfig,
  sortQuestions,
} from './actions';

export interface IQuestion {
  question: string;
  answer: string;
  id: string;
}

export interface IActivity {
  type: 'added' | 'removed' | 'edited' | 'removedAll' | 'sortAll';
  item: IQuestion | IQuestion[];
}

export interface IConfig {
  enterKeyIsSend: boolean;
  sendAfter5s: boolean;
}

export interface IQuestionsState {
  questions: IQuestion[];
  activities: IActivity[];
  config: IConfig;
}

const initialQuestion: IQuestion = {
  id: uuidv4(),
  question: 'How to ask a question?',
  answer: 'It is as simple as filling the "Add question" form below and hit enter',
};

export const initialState: IQuestionsState = {
  questions: [initialQuestion],
  activities: [],
  config: {
    enterKeyIsSend: true,
    sendAfter5s: false,
  },
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addQuestion, ({ questions, activities }, action) => {
      questions.push(action.payload);
      activities.push({
        item: action.payload,
        type: 'added',
      });
    })
    .addCase(addQuestionAsync.fulfilled, ({ questions }, action) => {
      questions.push(action.payload);
    })
    .addCase(removeLastAddedQuestion, ({ questions, activities }) => {
      if (questions.length) {
        const question = questions.pop();

        if (question) {
          activities.push({
            item: question,
            type: 'removed',
          });
        }
      }
    })
    .addCase(removeAllQuestions, (state) => {
      state.activities.push({
        type: 'removedAll',
        item: state.questions,
      });
      state.questions = [];
    })
    .addCase(removeQuestion, (state, action) => {
      const question = state.questions.find((q) => q.id === action.payload);

      if (question) {
        state.activities.push({
          item: question,
          type: 'removed',
        });

        state.questions = state.questions.filter((question) => question.id !== action.payload);
      }
    })
    .addCase(sortQuestions, (state) => {
      state.questions.sort((a, b) => a.question.localeCompare(b.question));
    })
    .addCase(setConfig, (state, action) => {
      state.config[action.payload.key] = action.payload.value;
    }),
);
