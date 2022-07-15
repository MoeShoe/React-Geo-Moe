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
    gameIsOver: false,
    countries: {
      nextFadedCountry: {
        name: "",
        flag: "", // SVG url
      },
      nextCountry: {
        name: "",
        flag: "",
      },
      currentCountry: {
        name: "",
        flag: "",
      },
      prevCountry: {
        name: "",
        flag: "",
      },
      prevFadedCountry: {
        name: "",
        flag: "",
      },
    },
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: quizzesInitialState,
  reducers: {
    // sets Quiz Type and initializes the game.
    setCurrentQuiz(state, action) {
      state.quizInPlay = true;
      state.quizGameData.gameIsOver = false;

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

    // changes country cards positions
    setCountryPosition(state, action) {
      state.quizGameData.countries[action.payload.position] =
        action.payload.countryData; // {name, flag}
    },
  },
});

export const quizzesActions = quizzesSlice.actions;

export { quizzesSlice };
