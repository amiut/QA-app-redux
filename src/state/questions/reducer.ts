import { createReducer } from '@reduxjs/toolkit';

import { addQuestion, removeLastAddedQuestion, removeQuestion } from './actions';

export interface IQuestion {
  question: string;
  answer: string;
  id: string;
}

export const initialState: IQuestion[] = [];

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addQuestion, (state, action) => {
      state.push(action.payload);
    })
    .addCase(removeLastAddedQuestion, (state) => {
      if (state.length) state.pop();
    })
    .addCase(removeQuestion, (state, action) => {
      return state.filter((question) => question.id !== action.payload);
    }),
);
