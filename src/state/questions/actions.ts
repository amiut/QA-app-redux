import { createAction } from '@reduxjs/toolkit';

import { IQuestion } from './reducer';

export const ADD_QUESTION = 'questions/addQuestion';
export const REMOVE__QUESTION = 'questions/removeQuestion';
export const REMOVE_LAST_QUESTION = 'questions/removeLastQuestion';

export const addQuestion = createAction<IQuestion>(ADD_QUESTION);
export const removeQuestion = createAction<string>(REMOVE__QUESTION);
export const removeLastAddedQuestion = createAction(REMOVE_LAST_QUESTION);
