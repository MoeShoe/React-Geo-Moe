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
  quizGameData: {
    countries: [
      { name: "", flag: "" },
      { name: "", flag: "" },
    ],
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: quizzesInitialState,
  reducers: {
    // resets the quiz
    resetQuiz(state) {
      state.quizInPlay = false;
    },

    // sets Quiz Type and initializes the game.
    setCurrentQuiz(state, action) {
      state.quizInPlay = true;

      // resetQuiz in case of Previous playthroughs
      state.quizGameData = {
        countries: [
          { name: "", flag: "" },
          { name: "", flag: "" },
        ],
      };

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

    // adds country cards based on positions
    setCountryPosition(state, action) {
      const direction = action.payload.arr;

      if (direction === "NEXT") {
        state.quizGameData.countries.unshift(action.payload.country);
      }

      if (direction === "PREV")
        state.quizGameData.countries.push(action.payload.country);
    },

    // on successful guess
    onGuessSuccess(state, action) {
      state.quizGameData.countries.splice(
        state.quizGameData.countries.length + action.payload,
        1
      );
    },

    //on shift cards left
    // onShiftCardsLeft(state) {
    // },
  },
});

export const quizzesActions = quizzesSlice.actions;

export { quizzesSlice };
