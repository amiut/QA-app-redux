import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state/store';

import {
  addQuestion as addQuestionAction,
  addQuestionAsync,
  removeAllQuestions as removeAllQuestionsAction,
  removeLastAddedQuestion,
  removeMultiQuestions,
  removeQuestion as removeQuestionAction,
  setConfig,
  sortQuestions,
  undoQuestions,
} from '../actions';
import { IConfig, IQuestion } from '../reducer';

export const useQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const questions: IQuestion[] = useSelector((state: AppState) => state.questions.questions);

  const addQuestion = useCallback((question: IQuestion) => dispatch(addQuestionAction(question)), [dispatch]);
  const removeQuestion = useCallback((id: string) => dispatch(removeQuestionAction(id)), [dispatch]);
  const removeQuestions = useCallback((ids: string[]) => dispatch(removeMultiQuestions(ids)), [dispatch]);
  const removeLastQuestion = useCallback(() => dispatch(removeLastAddedQuestion()), [dispatch]);
  const removeAllQuestions = useCallback(() => dispatch(removeAllQuestionsAction()), [dispatch]);
  const restorePreviousQuestions = useCallback(() => dispatch(undoQuestions()), [dispatch]);
  const sortAllQuestions = useCallback(() => dispatch(sortQuestions()), [dispatch]);

  const addQuestionAsyncly = (question: IQuestion) => dispatch(addQuestionAsync(question));

  type configKey = keyof IConfig;

  // Ensure `config.set` will only accept the right keys and write value types
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

  return {
    questions,
    addQuestion,
    removeQuestion,
    removeQuestions,
    removeLastQuestion,
    removeAllQuestions,
    config,
    addQuestionAsyncly,
    sortAllQuestions,
    restorePreviousQuestions,
  };
};
