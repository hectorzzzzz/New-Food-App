//hook file to simplify state usage

import { Reducer, useReducer } from 'react';

export default function useFormReducer<T>(initialState: T) {
  const formReducer: Reducer<T, Partial<T>> = (state, payload) => {
    return {
      ...state,
      ...payload,
    };
  };
  return useReducer(formReducer, initialState);
}