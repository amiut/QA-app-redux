import { createReducer, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const HISTORY_MAX_LENGTH = 5;

import {
  addQuestion,
  addQuestionAsync,
  removeAllQuestions,
  removeLastAddedQuestion,
  removeMultiQuestions,
  removeQuestion,
  setConfig,
  sortQuestions,
  stageQuestion,
  undoQuestions,
  unStageQuestion,
  updateQuestion,
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
  history: IQuestion[][];
  questionToEdit: IQuestion | null;
  config: IConfig;
}

const initialQuestions: IQuestion[] = [
  {
    id: uuidv4(),
    question: 'How to ask a question?',
    answer: 'It is as simple as filling the "Add question" form below and hit enter',
  },
];

export const initialState: IQuestionsState = {
  questions: initialQuestions,
  history: [],
  questionToEdit: null,
  config: {
    enterKeyIsSend: true,
    sendAfter5s: false,
  },
};

function addToHistory(history: IQuestion[][], questions: IQuestion[]) {
  history.push(questions);

  if (history.length > HISTORY_MAX_LENGTH) {
    history.shift();
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(undoQuestions, (state) => {
      const prevQuestions = state.history.pop();

      if (prevQuestions && prevQuestions.length) {
        state.questions = prevQuestions;
      }
    })
    .addCase(addQuestion, ({ questions, history }, action) => {
      if (questions.length) {
        addToHistory(history, current(questions));
      }

      questions.push(action.payload);
    })
    .addCase(addQuestionAsync.fulfilled, ({ questions, history }, action) => {
      if (questions.length) {
        addToHistory(history, current(questions));
      }

      questions.push(action.payload);
    })
    .addCase(removeLastAddedQuestion, ({ questions, history }) => {
      if (questions.length) {
        addToHistory(history, current(questions));
        questions.pop();
      }
    })
    .addCase(removeAllQuestions, (state) => {
      if (state.questions.length) {
        addToHistory(state.history, current(state.questions));
      }

      state.questions = [];
    })
    .addCase(removeQuestion, (state, action) => {
      const question = state.questions.find((q) => q.id === action.payload);

      if (question) {
        addToHistory(state.history, current(state.questions));

        state.questions = state.questions.filter((question) => question.id !== action.payload);
      }
    })
    .addCase(removeMultiQuestions, (state, action) => {
      const newQuestions = state.questions.filter((question) => action.payload.indexOf(question.id) === -1);

      if (newQuestions.length !== state.questions.length) {
        addToHistory(state.history, current(state.questions));

        state.questions = newQuestions;
      }
    })
    .addCase(sortQuestions, (state) => {
      if (state.questions.length) {
        addToHistory(state.history, current(state.questions));
      }

      state.questions.sort((a, b) => a.question.localeCompare(b.question));
    })
    .addCase(stageQuestion, (state, action) => {
      state.questionToEdit = action.payload;
    })
    .addCase(unStageQuestion, (state) => {
      state.questionToEdit = null;
    })
    .addCase(updateQuestion, (state, { payload }) => {
      if (payload.id) {
        const index = state.questions.findIndex((question) => question.id === payload.id);
        if (index !== -1) state.questions[index] = payload;
      }
    })
    .addCase(setConfig, (state, action) => {
      state.config[action.payload.key] = action.payload.value;
    }),
);
