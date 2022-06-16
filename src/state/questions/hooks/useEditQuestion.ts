import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state/store';

import {
  stageQuestion as stageQuestionAction,
  unStageQuestion as unStageQuestionAction,
  updateQuestion as updateQuestionAction,
} from '../actions';
import { IQuestion } from '../reducer';

export default function useEditQuestion() {
  const dispatch = useDispatch<AppDispatch>();

  const stagedQuestion: IQuestion = useSelector((state: AppState) => state.questions.questionToEdit);

  const stageQuestion = useCallback((question: IQuestion) => dispatch(stageQuestionAction(question)), [dispatch]);
  const unStageQuestion = useCallback(() => dispatch(unStageQuestionAction()), [dispatch]);
  const updateQuestion = useCallback((question: IQuestion) => dispatch(updateQuestionAction(question)), [dispatch]);

  return {
    stagedQuestion,
    stageQuestion,
    unStageQuestion,
    updateQuestion,
  };
}
