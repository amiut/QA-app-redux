import { Dispatch } from 'redux';

import store, { AppState } from '../../store';
import { addQuestion, removeAllQuestions, removeQuestion, sortQuestions } from '../actions';
import reducer, { IQuestion } from '../reducer';

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn().mockReturnValue('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
  };
});

let dispatcher: Dispatch;
let state: AppState;

beforeAll(() => {
  dispatcher = store.dispatch;
  state = store.getState();
});

test('History is initially empty', () => {
  expect(state.questions.history.length).toBe(0);
});

test('questions array contain one initial question', () => {
  expect(state.questions.questions.length).toBe(1);
});

test('addQuestion updates the state', () => {
  const mockedQuestion: IQuestion = {
    id: 'example-id',
    question: 'Example question ?',
    answer: 'Example answer',
  };

  expect(
    reducer(undefined, addQuestion(mockedQuestion)).questions.findIndex((q) => q.id === mockedQuestion.id),
  ).toBeGreaterThan(-1);
});

test('History is the same as previous questions list after addQuestion', () => {
  const previousQuestions = state.questions.questions;

  const mockedQuestion: IQuestion = {
    id: 'example-id',
    question: 'Example question ?',
    answer: 'Example answer',
  };

  store.dispatch(addQuestion(mockedQuestion));

  expect(JSON.stringify(store.getState().questions.history)).toBe(JSON.stringify([previousQuestions]));
});

test('Remove All Empties the state', () => {
  expect(reducer(undefined, removeAllQuestions).questions.length).toBe(0);
});

test('Remove question updates the state', () => {
  store.dispatch(
    addQuestion({
      question: 'example question',
      answer: 'Example answer',
      id: 'id1',
    }),
  );

  store.dispatch(removeQuestion('id1'));

  expect(store.getState().questions.questions.findIndex((q: IQuestion) => q.id === 'id1')).toBe(-1);
});

test('Sort question can sort both english texts and utf-8 texts', () => {
  store.dispatch(removeAllQuestions());
  store.dispatch(
    addQuestion({
      question: 'ccc',
      answer: 'Example answer',
      id: 'id1',
    }),
  );
  store.dispatch(
    addQuestion({
      question: 'کجا میروید؟',
      answer: 'Example answer',
      id: 'id2',
    }),
  );
  store.dispatch(
    addQuestion({
      question: 'aaa',
      answer: 'Example answer',
      id: 'id3',
    }),
  );
  store.dispatch(
    addQuestion({
      question: 'آبی',
      answer: 'Example answer',
      id: 'id4',
    }),
  );
  store.dispatch(
    addQuestion({
      question: 'bbb',
      answer: 'Example answer',
      id: 'id5',
    }),
  );

  store.dispatch(sortQuestions());

  expect(JSON.stringify(store.getState().questions.questions.map((q: IQuestion) => q.question))).toBe(
    JSON.stringify(['aaa', 'bbb', 'ccc', 'آبی', 'کجا میروید؟']),
  );
});
