import { createSlice } from "@reduxjs/toolkit";

import {
  RELAXED_QUIZ_PARAMS,
  CHALLENGE_QUIZ_PARAMS,
  HARDCORE_QUIZ_PARAMS,
} from "../constants/QUIZZES_PARAMS";

const quizzesInitialState = {
  quizInPlay: false,
  quiz: {
    quizType: "", // RELAXED CHALLENGE HARDCORE
    quizParams: {},
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: quizzesInitialState,
  reducers: {
    setCurrentQuiz(state, action) {
      state.quizInPlay = true;

      switch (action.payload) {
        case "RELAXED":
          state.quiz = {
            quizType: "RELAXED",
            quizParams: RELAXED_QUIZ_PARAMS,
          };
          break;

        case "CHALLENGE":
          state.quiz = {
            quizType: "CHALLENGE",
            quizParams: CHALLENGE_QUIZ_PARAMS,
          };
          break;

        case "HARDCORE":
          state.quiz = {
            quizType: "HARDCORE",
            quizParams: HARDCORE_QUIZ_PARAMS,
          };
          break;

        default:
          break;
      }
    },
  },
});

export const quizzesActions = quizzesSlice.actions;

export { quizzesSlice };
