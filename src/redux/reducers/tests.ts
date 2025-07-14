import { createSlice } from "@reduxjs/toolkit";
import { fetchTests, getTestById, sendMessage } from "../../config/request";
import type { AppDispatch } from "../store";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Test {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

export interface Message {
  id: string;
  email: string;
  message: string
}

interface TestsState {
  tests: Test[];
  loading: boolean;
  error: string | null;
  singleTest: Test;
  message: string
}

const initialState: TestsState = {
  tests: [],
  loading: false,
  error: null,
  message: '',
  singleTest: {} as Test,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setTests: (state, action) => {
      state.tests = action.payload;
    },
    getSingleTest: (state, action) => {
      state.singleTest = action.payload;
    },
    sendMessage: (state, action) => {
      state.message = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTests,
  getSingleTest,
  setLoading,
  setError,
} = testsSlice.actions;

export const getTests = () => async (dispatch: AppDispatch) => {
  const data = await fetchTests();
  dispatch({ type: 'tests/setTests', payload: data });
};

export const getSingleTests = (id: string) => async (dispatch: AppDispatch) => {
  const data = await getTestById(id);
  dispatch({ type: 'tests/getSingleTest', payload: data });
};

export const sendMessages = (message: Message) => async (dispatch: AppDispatch) => {
  const data = await sendMessage(message);
  dispatch({ type: 'tests/sendMessage', payload: data });
  return data
};

export default testsSlice.reducer;
