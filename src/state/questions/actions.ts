import { createAction } from '@reduxjs/toolkit';

import { IConfig, IQuestion } from './reducer';

export const ADD_QUESTION = 'questions/addQuestion';
export const REMOVE_QUESTION = 'questions/removeQuestion';
export const REMOVE_LAST_QUESTION = 'questions/removeLastQuestion';
export const REMOVE_ALL_QUESTION = 'questions/removeAllQuestions';
export const SET_CONFIG = 'questions/setConfig';

export const addQuestion = createAction<IQuestion>(ADD_QUESTION);
export const removeQuestion = createAction<string>(REMOVE_QUESTION);
export const removeLastAddedQuestion = createAction(REMOVE_LAST_QUESTION);
export const removeAllQuestions = createAction(REMOVE_ALL_QUESTION);
export const setConfig = createAction<{ key: keyof IConfig; value: any }>(SET_CONFIG);
