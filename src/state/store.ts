import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import questionsReducer from './questions/reducer';

let store: ReturnType<typeof makeStore>;

export function makeStore() {
  return configureStore({
    reducer: combineReducers({
      questions: questionsReducer,
    }),
    devTools: process.env.NODE_ENV === 'development',
  });
}

export const initializeStore = () => {
  let _store = store ?? makeStore();

  if (typeof window === 'undefined') return _store;

  if (!store) {
    store = _store;
  }

  return _store;
};

store = initializeStore();

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export function useStore() {
  return useMemo(() => initializeStore(), []);
}
