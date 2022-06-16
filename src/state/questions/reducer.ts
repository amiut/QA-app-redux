import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const HISTORY_MAX_LENGTH = 5;

import {
  addQuestion,
  addQuestionAsync,
  removeAllQuestions,
  removeLastAddedQuestion,
  removeQuestion,
  setConfig,
  sortQuestions,
  undoQuestions,
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
  history: [initialQuestions],
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

      if (prevQuestions) {
        state.questions = prevQuestions;
      }
    })
    .addCase(addQuestion, ({ questions, history }, action) => {
      addToHistory(history, questions);
      questions.push(action.payload);
    })
    .addCase(addQuestionAsync.fulfilled, ({ questions, history }, action) => {
      addToHistory(history, questions);
      questions.push(action.payload);
    })
    .addCase(removeLastAddedQuestion, ({ questions, history }) => {
      if (questions.length) {
        addToHistory(history, questions);
        questions.pop();
      }
    })
    .addCase(removeAllQuestions, (state) => {
      addToHistory(state.history, state.questions);
      state.questions = [];
    })
    .addCase(removeQuestion, (state, action) => {
      const question = state.questions.find((q) => q.id === action.payload);

      if (question) {
        addToHistory(state.history, state.questions);

        state.questions = state.questions.filter((question) => question.id !== action.payload);
      }
    })
    .addCase(sortQuestions, (state) => {
      addToHistory(state.history, state.questions);
      state.questions.sort((a, b) => a.question.localeCompare(b.question));
    })
    .addCase(setConfig, (state, action) => {
      addToHistory(state.history, state.questions);
      state.config[action.payload.key] = action.payload.value;
    }),
);
