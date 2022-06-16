import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IConfig, IQuestion } from './reducer';

const mockedPromise = (delay: number = 5000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const ADD_QUESTION = 'questions/addQuestion';
export const ADD_QUESTION_ASYNC = 'questions/addQuestionAsync';
export const REMOVE_QUESTION = 'questions/removeQuestion';
export const REMOVE_MULTI_QUESTIONS = 'questions/removeMultiQuestions';
export const REMOVE_LAST_QUESTION = 'questions/removeLastQuestion';
export const REMOVE_ALL_QUESTION = 'questions/removeAllQuestions';
export const SORT_QUESTIONS = 'questions/sortQuestions';
export const UNDO_QUESTIONS = 'questions/undoQuestions';
export const SET_CONFIG = 'questions/setConfig';

export const addQuestion = createAction<IQuestion>(ADD_QUESTION);
export const removeQuestion = createAction<string>(REMOVE_QUESTION);
export const removeMultiQuestions = createAction<string[]>(REMOVE_MULTI_QUESTIONS);
export const removeLastAddedQuestion = createAction(REMOVE_LAST_QUESTION);
export const removeAllQuestions = createAction(REMOVE_ALL_QUESTION);
export const sortQuestions = createAction(SORT_QUESTIONS);
export const undoQuestions = createAction(UNDO_QUESTIONS);
export const setConfig = createAction<{ key: keyof IConfig; value: any }>(SET_CONFIG);

export const addQuestionAsync = createAsyncThunk<IQuestion, IQuestion>(ADD_QUESTION_ASYNC, async (question) => {
  await mockedPromise();

  return question;
});
