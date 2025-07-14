import { createSlice } from "@reduxjs/toolkit";
import { createResult, fetchResults, getResultById } from "../../config/request";
import type { AppDispatch } from "../store";

export interface Answer {
  questionId: string;
  isCorrect: boolean;
  selected: string;
  question: string
}

export interface Result {
  id?: string;
  answers: Answer[],
  score: number;
  testId: string;
  userId: string
  testName: string;
  date: string,
  totalQuestion: number
  time: string;
}

interface ResultState {
  results: Result[];
  currentResult: Result;
  loading: boolean;
  result: Result
}


const initialState: ResultState = {
  results: [],
  currentResult: {} as Result,
  result: {} as Result,
  loading: false
};


const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload
    },
    addResults: (state, action) => {
      state.results.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCurrentResult: (state, action) => {
      state.currentResult = action.payload
    },
    getSingleResult: (state, action) => {
      state.result = action.payload
    }
  },
});

export const getResults = () => async (dispatch: AppDispatch) => {
  const data = await fetchResults();
  dispatch({ type: 'results/setResults', payload: data });
  return data
};

export const addResults = (obj: Result) => async (dispatch: AppDispatch) => {
  const data = await createResult(obj);
  dispatch({ type: 'results/addResults', payload: data });
  return data
};


export const getSingleResult = (id: string) => async (dispatch: AppDispatch) => {
  const data = await getResultById(id);
  dispatch({ type: 'results/getSingleResult', payload: data });
};

export const { setLoading, setCurrentResult } = resultsSlice.actions;
export default resultsSlice.reducer;
