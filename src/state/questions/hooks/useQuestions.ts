import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'state/store';

import {
  addQuestion as addQuestionAction,
  removeAllQuestions as removeAllQuestionsAction,
  removeLastAddedQuestion,
  removeQuestion as removeQuestionAction,
  setConfig,
} from '../actions';
import { IConfig, IQuestion } from '../reducer';

export const useQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: AppState) => state.questions.questions);

  const addQuestion = useCallback((question: IQuestion) => dispatch(addQuestionAction(question)), [dispatch]);
  const removeQuestion = useCallback((id: string) => dispatch(removeQuestionAction(id)), [dispatch]);
  const removeLastQuestion = useCallback(() => dispatch(removeLastAddedQuestion()), [dispatch]);
  const removeAllQuestions = useCallback(() => dispatch(removeAllQuestionsAction()), [dispatch]);

  type configKey = keyof IConfig;

  const setConfiguration = useCallback(
    function applyConfig<T extends IConfig, K extends configKey>(key: K, value: T[K]) {
      dispatch(setConfig({ key, value }));
    },
    [dispatch],
  );

  const config = useSelector((state: AppState) => ({
    ...state.questions.config,
    set: setConfiguration,
  }));

  return { questions, addQuestion, removeQuestion, removeLastQuestion, removeAllQuestions, config };
};
