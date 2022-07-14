import { createSlice } from "@reduxjs/toolkit";

const quizzesInitialState = {};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: quizzesInitialState,
  reducers: {},
});

export const quizzesActions = quizzesSlice.actions;

export { quizzesSlice };
