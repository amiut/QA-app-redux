import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'state/store';

import {
  addQuestion as addQuestionAction,
  removeLastAddedQuestion,
  removeQuestion as removeQuestionAction,
} from '../actions';
import { IQuestion } from '../reducer';

export const useQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: AppState) => state.questions);

  const addQuestion = useCallback((question: IQuestion) => dispatch(addQuestionAction(question)), [dispatch]);
  const removeQuestion = useCallback((id: string) => dispatch(removeQuestionAction(id)), [dispatch]);
  const removeLastQuestion = useCallback(() => dispatch(removeLastAddedQuestion()), [dispatch]);

  return { questions, addQuestion, removeQuestion, removeLastQuestion };
};
