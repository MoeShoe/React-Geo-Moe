import { useReducer, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../components/quiz/Quiz.module.css";
import getQuizCountry from "../store/quiz-action-thunk";
import COUNTRY_NAMES_LIST from "../constants/COUNTRY_NAMES_LIST";
import { quizzesActions } from "../store/quizzes-slice";

const countryCardsClasses = [
  styles["next-faded-country"],
  styles["next-country"],
  styles["current-country"],
  styles["prev-country"],
  styles["prev-faded-country"],
];

//TODO
//* write hook documentation

//* input:
//  numberOfCountries, fetchedCountriesList, lives, time, onlyUN

const useSetupQuiz = (
  numberOfCountries,
  fetchedCountriesList,
  lives,
  time,
  onlyUN
) => {
  const dispatch = useDispatch();

  //* Helper functions
  const deepClone = (refData) => JSON.parse(JSON.stringify(refData));
  const getRandomIndex = (lgth) => Math.trunc(Math.random() * lgth);
  const getRandomCountry = () => {
    // Guard Clause
    if (quizGameState.countriesList.length === 0) {
      return;
    }

    const randomIndex = getRandomIndex(quizGameState.countriesList.length);

    dispatchQuizGameState({ type: "REMOVE_COUNTRY", payload: randomIndex });
    return quizGameState.countriesList[randomIndex];
  };

  //* Quiz Game state reducer
  const quizGameStateReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_GAME":
        let $countriesList;
        if (onlyUN)
          $countriesList = deepClone(
            COUNTRY_NAMES_LIST.filter((con) => con.isUN)
          );
        else $countriesList = deepClone(COUNTRY_NAMES_LIST);

        dispatch(
          getQuizCountry(
            $countriesList
              .splice(getRandomIndex($countriesList.length), 1)
              .at(0),
            "NEXT"
          )
        );

        dispatch(
          getQuizCountry(
            $countriesList
              .splice(getRandomIndex($countriesList.length), 1)
              .at(0),
            "NEXT"
          )
        );

        dispatch(
          getQuizCountry(
            $countriesList
              .splice(getRandomIndex($countriesList.length), 1)
              .at(0),
            "NEXT"
          )
        );

        return deepClone({
          ...state,
          countriesList: $countriesList,
        });

      case "REMOVE_COUNTRY":
        return deepClone({
          ...state,
          countriesList: state.countriesList
            .slice(0, action.payload)
            .concat(state.countriesList.slice(action.payload + 1)),
        });

      case "UNDO_INITIAL":
        return deepClone({ ...state, isInitial: false });

      case "UPDATE_GAME_STATE":
        return deepClone({ ...state, gameState: action.payload });

      case "INCREMENT_GUESS":
        return deepClone({
          ...state,
          numberOfGuessedCountries: ++state.numberOfGuessedCountries,
        });

      case "DECREMENT_LIVES":
        return deepClone({
          ...state,
          lives: --state.lives,
          formattedLives: `${state.lives} Lives`,
        });

      case "START_TIMER":
        return deepClone({
          ...state,
          timer: {
            ...state.timer,
            startTimer: true,
            quizTimer: setInterval(() => {
              setQuizTime((state) => {
                const newTime = state.time - 1_000; //because it's in milliseconds
                if (newTime === 0) {
                  dispatchQuizGameState({
                    type: "UPDATE_GAME_STATE",
                    payload: { lost: true },
                  });
                }
                return {
                  time: newTime,
                  formattedTime: new Intl.DateTimeFormat("en-US", {
                    second: "2-digit",
                    minute: "2-digit",
                  }).format(newTime),
                };
              });
            }, 1000),
          },
        });

      case "SHIFT_GUESS_CORRECT":
        //TODO too imperative
        //* set the countryCardsClasses to this
        const $$countryCardsClasses =
          state.cardClasses.$countryCardsClasses.map(($class) => {
            if ($class === styles["current-country"])
              return styles["next-faded-country"];
            if ($class === styles["next-faded-country"])
              return styles["next-country"];
            if ($class === styles["next-country"])
              return styles["current-country"];
            return $class;
          });

        //* set the $countryCardsClasses to this
        const $$$countryCardsClasses = $$countryCardsClasses.slice();

        $$countryCardsClasses[
          $$countryCardsClasses.indexOf(styles["next-faded-country"])
        ] =
          $$countryCardsClasses[
            $$countryCardsClasses.indexOf(styles["next-faded-country"])
          ] + ` ${styles["card-is-correct"]}`;

        //TODO too imperative
        //* set currentCountryIndex to this
        const $$currentCountryIndex = state.cardClasses.currentCountryIndex.map(
          (ind) => {
            if (ind === state.currentFetchedCountryIndex)
              return state.currentFetchedCountryIndex - 2;
            if (ind === state.currentFetchedCountryIndex - 2)
              return state.currentFetchedCountryIndex - 1;
            if (ind === state.currentFetchedCountryIndex - 1)
              return state.currentFetchedCountryIndex;
            return ind;
          }
        );

        return deepClone({
          ...state,
          cardClasses: {
            currentCountryIndex: $$currentCountryIndex,
            countryCardsClasses: $$countryCardsClasses,
            $countryCardsClasses: $$$countryCardsClasses,
          },
        });

      case "SHIFT_CLASSES_LEFT":
        //classes
        //TODO too imperative
        const leftCountryCardsClasses =
          state.cardClasses.$countryCardsClasses.map(($class) => {
            if ($class === styles["current-country"])
              return styles["prev-country"];
            if ($class === styles["prev-country"])
              return styles["prev-faded-country"];
            if ($class === styles["prev-faded-country"])
              return styles["next-faded-country"];
            if ($class === styles["next-faded-country"])
              return styles["next-country"];
            if ($class === styles["next-country"])
              return styles["current-country"];
            return $class;
          });

        // index array
        const leftCurrentCountryIndex =
          state.cardClasses.currentCountryIndex.map((ind) => {
            const $index =
              ind + 1 > state.currentFetchedCountryIndex + 2
                ? state.currentFetchedCountryIndex - 2
                : ind + 1;
            return $index - 1;
          });

        const leftFetchedCountryIndex = state.currentFetchedCountryIndex - 1;
        return deepClone({
          ...state,
          currentFetchedCountryIndex: leftFetchedCountryIndex,
          cardClasses: {
            currentCountryIndex: leftCurrentCountryIndex,
            countryCardsClasses: leftCountryCardsClasses,
            $countryCardsClasses: leftCountryCardsClasses,
          },
        });

      case "SHIFT_CLASSES_RIGHT":
        //classes
        //TODO too imperative
        const rightCountryCardsClasses =
          state.cardClasses.$countryCardsClasses.map(($class) => {
            if ($class === styles["current-country"])
              return styles["next-country"];
            if ($class === styles["prev-country"])
              return styles["current-country"];
            if ($class === styles["prev-faded-country"])
              return styles["prev-country"];
            if ($class === styles["next-faded-country"])
              return styles["prev-faded-country"];
            if ($class === styles["next-country"])
              return styles["next-faded-country"];
            return $class;
          });

        // index array
        const rightCurrentCountryIndex =
          state.cardClasses.currentCountryIndex.map((ind) => {
            const $index =
              ind - 1 < state.currentFetchedCountryIndex - 2
                ? state.currentFetchedCountryIndex + 2
                : ind - 1;
            return $index + 1;
          });

        const rightFetchedCountryIndex = state.currentFetchedCountryIndex + 1;
        return deepClone({
          ...state,
          currentFetchedCountryIndex: rightFetchedCountryIndex,
          cardClasses: {
            currentCountryIndex: rightCurrentCountryIndex,
            countryCardsClasses: rightCountryCardsClasses,
            $countryCardsClasses: rightCountryCardsClasses,
          },
        });

      default:
        return deepClone({ ...state });
    }
  };

  //* Quiz Game initial state

  const quizGameInitialState = {
    isInitial: true,
    countriesList: [],
    gameState: { won: false, lost: false },
    currentFetchedCountryIndex: -3,

    lives: lives, //*
    formattedLives: `${
      Number.isFinite(lives) ? lives + " Lives" : "Unlimited Lives"
    }`,

    timer: {
      startTimer: false,
      quizTimer: null,
    },

    cardClasses: {
      currentCountryIndex: [-5, -4, -3, -2, -1],
      countryCardsClasses: countryCardsClasses.slice(),
      // a duplicate array that is not polluted by animation classes
      $countryCardsClasses: countryCardsClasses.slice(),
    },

    numberOfGuessedCountries: 0,
    guessAnimation: "",
  };

  const [quizGameState, dispatchQuizGameState] = useReducer(
    quizGameStateReducer,
    quizGameInitialState
  );
  //* reducer end

  //* states
  const [quizTime, setQuizTime] = useState({
    time: time, //*
    formattedTime: new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(time),
  });

  const [guessAnimation, setGuessAnimation] = useState("");

  useEffect(() => {
    if (guessAnimation) {
      const animationTimer = setTimeout(() => setGuessAnimation(""), 250);

      return () => clearTimeout(animationTimer);
    }
  }, [guessAnimation]);

  //* Initializes the game
  useEffect(() => {
    dispatchQuizGameState({ type: "INITIALIZE_GAME" });
  }, []);

  //* Event handlers
  const userGuessHandler = (userGuess) => {
    const targetCountryName = fetchedCountriesList.at(
      quizGameState.currentFetchedCountryIndex
    ).name;

    let guessIsCorrect;

    if (Array.isArray(targetCountryName)) {
      guessIsCorrect = targetCountryName
        .map((countryName) => countryName.toLowerCase())
        .includes(userGuess.toLowerCase().trim());
    } else {
      guessIsCorrect =
        userGuess.toLowerCase().trim() === targetCountryName.toLowerCase();
    }

    //* On correct guess
    if (guessIsCorrect) {
      dispatchQuizGameState({ type: "SHIFT_GUESS_CORRECT" });
      setGuessAnimation("guess-correct");

      //* add winning handler
      if (quizGameState.numberOfGuessedCountries === numberOfCountries - 1) {
        dispatchQuizGameState({
          type: "UPDATE_GAME_STATE",
          payload: { won: true },
        });
      }

      dispatch(
        quizzesActions.onGuessSuccess(quizGameState.currentFetchedCountryIndex)
      );

      dispatchQuizGameState({ type: "INCREMENT_GUESS" });

      fetchNextCountry();
    }
    //* On false guess
    else {
      setGuessAnimation("guess-false");

      if (Number.isFinite(quizGameState.lives)) {
        dispatchQuizGameState({ type: "DECREMENT_LIVES" });
      }

      //* add losing handler
      if (quizGameState.lives === 1)
        dispatchQuizGameState({
          type: "UPDATE_GAME_STATE",
          payload: { lost: true },
        });
    }

    if (!quizGameState.timer.startTimer) {
      dispatchQuizGameState({
        type: "START_TIMER",
      });
    }
    // undo initial state
    if (quizGameState.isInitial)
      dispatchQuizGameState({ type: "UNDO_INITIAL" });

    if (guessIsCorrect) return true;
  };

  const fetchNextCountry = () => {
    if (
      numberOfCountries -
        (quizGameState.numberOfGuessedCountries +
          (fetchedCountriesList.length - 2)) >
      0
    )
      dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
    else if (
      numberOfCountries -
        (quizGameState.numberOfGuessedCountries +
          (fetchedCountriesList.length - 2)) >
      -2
    ) {
      dispatch(
        quizzesActions.setCountryPosition({
          country: { name: "", flag: "" },
          arr: "NEXT",
        })
      );
    } else if (
      !fetchedCountriesList.at(quizGameState.currentFetchedCountryIndex - 1)
        .name &&
      fetchedCountriesList.at(quizGameState.currentFetchedCountryIndex + 1).name
    ) {
      dispatchQuizGameState({ type: "SHIFT_CLASSES_RIGHT" });
    }
  };

  const leftArrowClickHandler = () => {
    // Guard Clause
    if (
      !fetchedCountriesList.at(quizGameState.currentFetchedCountryIndex - 1)
        .name
    ) {
      return;
    }

    if (!quizGameState.timer.startTimer)
      dispatchQuizGameState({ type: "START_TIMER" });

    dispatchQuizGameState({ type: "SHIFT_CLASSES_LEFT" });
    fetchNextCountry();
  };

  const rightArrowClickHandler = () => {
    // Guard Clause
    if (
      !fetchedCountriesList.at(quizGameState.currentFetchedCountryIndex + 1)
        .name
    ) {
      return;
    }

    dispatchQuizGameState({ type: "SHIFT_CLASSES_RIGHT" });
  };

  //* output:
  // quizGameState, userGuessHandler, quizTime, guessAnimation, leftArrorClickHandler, rightArrowClickHandler
  return [
    quizGameState,
    userGuessHandler,
    quizTime,
    guessAnimation,
    leftArrowClickHandler,
    rightArrowClickHandler,
  ];
};

export default useSetupQuiz;
