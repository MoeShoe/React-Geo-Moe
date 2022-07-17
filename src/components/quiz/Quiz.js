import { useRef, useEffect, useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import getQuizCountry from "../../store/quiz-action-thunk";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import { quizzesActions } from "../../store/quizzes-slice";

//!

let currentCountryIndex = [-1, -2, -3, -4, -5];
let currentCountryClassIndex = 2;

let countryCardsClasses = [
  styles["next-faded-country"],
  styles["next-country"],
  styles["current-country"],
  styles["prev-country"],
  styles["prev-faded-country"],
];

const shiftClassesRight = () => {
  const poppedClass = countryCardsClasses.pop();
  countryCardsClasses.unshift(poppedClass);

  // if (currentCountryIndex !== 4) currentCountryIndex++;
  // else currentCountryIndex = 0;

  return countryCardsClasses.slice();
};

const shiftClassesLeft = () => {
  const shiftedClass = countryCardsClasses.shift();
  countryCardsClasses.push(shiftedClass);

  // if (currentCountryIndex !== 0) currentCountryIndex--;
  // else currentCountryIndex = 4;

  return countryCardsClasses.slice();
};

const shiftClassesGuessCorrect = () => {
  const $countryCardsClasses = countryCardsClasses.slice(0, 3);

  const shiftedClass = $countryCardsClasses.shift();
  $countryCardsClasses.push(shiftedClass);

  const $$countryCardsClasses = $countryCardsClasses.concat(
    countryCardsClasses.slice(3)
  );

  countryCardsClasses = $$countryCardsClasses.slice();

  $$countryCardsClasses[currentCountryClassIndex] =
    $$countryCardsClasses[currentCountryClassIndex] +
    ` ${styles["card-is-correct"]}`;

  if (currentCountryClassIndex !== 0) currentCountryClassIndex--;
  else currentCountryClassIndex = 2;

  const $currentCountryIndex = currentCountryIndex.slice(0, 3);
  const $index = $currentCountryIndex.pop();
  $currentCountryIndex.unshift($index);
  currentCountryIndex = $currentCountryIndex.concat(
    currentCountryIndex.slice(3)
  );

  return $$countryCardsClasses;
};

//! end

const Quiz = () => {
  const dispatch = useDispatch();

  const inputGuess = useRef();

  //* quiz parameters
  const { name, numberOfCountries, time, lives, onlyUN } = useSelector(
    (state) => state.quizzes.quiz.quizParams
  );

  //*data formatting

  const [quizTime, setQuizTime] = useState({
    time: time, //*
    formattedTime: new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(time),
  });

  //!
  //* Quiz Game state reducer

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

      case "DECREMENT_LIVES":
        return deepClone({
          ...state,
          lives: state.lives - 1,
          formattedLives: `${state.lives - 1} Lives`,
        });

      case "SET_TIMER":
        return deepClone({
          ...state,
          timer: {
            ...state.timer,
            startTimer: action.payload.startTimer,
            quizTimer: action.payload.timer,
          },
        });

      case "SHIFT_CLASSES_LEFT":
        break;

      case "SHIFT_CLASSES_RIGHT":
        break;

      case "SHIFT_GUESS_CORRECT":
        break;

      default:
        console.log("you are in the default block!");
        return deepClone({ ...state });
    }
  };

  //* Quiz Game initial state

  const quizGameInitialState = {
    isInitial: true,
    countriesList: [],
    gameState: { won: false, lost: false },

    lives: lives, //*
    formattedLives: `${
      Number.isFinite(lives) ? lives + " Lives" : "Unlimited Lives"
    }`,

    timer: {
      startTimer: false,
      quizTimer: null,
    },

    cardClasses: {
      currentCountryIndex: [-1, -2, -3, -4, -5],
      currentCountryClassIndex: 2,
      countryCardsClasses: [
        styles["next-faded-country"],
        styles["next-country"],
        styles["current-country"],
        styles["prev-country"],
        styles["prev-faded-country"],
      ],
      $countryCardsClasses: [],
    },

    numberOfGuessedCountries: 0,
    guessAnimation: "",
  };

  const [quizGameState, dispatchQuizGameState] = useReducer(
    quizGameStateReducer,
    quizGameInitialState
  );

  console.log(quizGameState);

  //! reducer end
  ///////////////////////////////////////////////
  //TODO
  //! refactor into a hook and move elsewhere

  const nextCountryList = useSelector(
    (state) => state.quizzes.quizGameData.nextCountries
  );
  const prevCountryList = useSelector(
    (state) => state.quizzes.quizGameData.prevCountries
  );

  const [$countryCardsClasses, setCountryCardsClasses] =
    useState(countryCardsClasses);

  const [numberOfGuessedCountries, setNumberOfGuessedCountries] = useState(0);

  const [guessAnimation, setGuessAnimation] = useState("");

  useEffect(() => {
    if (guessAnimation) {
      const animationTimer = setTimeout(() => setGuessAnimation(""), 250);

      return () => clearTimeout(animationTimer);
    }
  }, [guessAnimation]);

  //* add winning handler
  if (numberOfGuessedCountries === numberOfCountries) {
    console.log("Congratulations!, you won!");
    dispatchQuizGameState({
      type: "UPDATE_GAME_STATE",
      payload: { won: true },
    });
  }

  if (quizGameState.gameState.lost) {
    console.log("You lost! :( try again?");
  }

  if (quizGameState.gameState.won || quizGameState.gameState.lost) {
    console.log("game has been resolved!");
    // dispatch(quizzesActions.resetQuiz());
    clearInterval(quizGameState.timer.quizTimer);
  }

  useEffect(() => {
    dispatchQuizGameState({ type: "INITIALIZE_GAME" });
  }, []);

  //! end

  //* event handlers
  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
    //Guard Clause
    if (inputGuess.current.value === "") return;

    //!
    if (quizGameState.gameState.won || quizGameState.gameState.lost) return;

    const targetCountryName = nextCountryList.at(-1).name;

    let guessIsCorrect;

    if (Array.isArray(targetCountryName)) {
      guessIsCorrect = targetCountryName
        .map((countryName) => countryName.toLowerCase())
        .includes(inputGuess.current.value.toLowerCase());
    } else {
      guessIsCorrect =
        inputGuess.current.value.toLowerCase() ===
        targetCountryName.toLowerCase();
    }

    //* On correct guess
    if (guessIsCorrect) {
      setCountryCardsClasses(shiftClassesGuessCorrect());
      setGuessAnimation("guess-correct");

      if (
        numberOfCountries - numberOfGuessedCountries !== 2 &&
        numberOfCountries - numberOfGuessedCountries !== 1
      )
        dispatch(getQuizCountry(getRandomCountry(), "NEXT", true));
      else {
        dispatch(
          quizzesActions.setCountryPosition({
            country: { name: "", flag: "" },
            arr: "NEXT",
            shift: true,
          })
        );
      }

      dispatch(quizzesActions.onGuessSuccess());

      setNumberOfGuessedCountries((prevState) => ++prevState);

      inputGuess.current.value = "";
    }
    //* On false guess
    else {
      setGuessAnimation("guess-false");

      if (Number.isFinite(quizGameState.lives)) {
        console.log("decremented!");
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
        type: "SET_TIMER",
        payload: {
          startTimer: true,
          timer: setInterval(() => {
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
    }

    //! end

    // undo initial state
    if (quizGameState.isInitial)
      dispatchQuizGameState({ type: "UNDO_INITIAL" });
  };

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz-details-container"]}>
        <div
          className={styles["quiz-lives"]}
          style={
            Number.isFinite(lives)
              ? {
                  color: `hsl(${(quizGameState.lives / lives) * 120},100%,40%)`,
                }
              : { color: "hsl(120,100%,40%)" }
          }
        >
          {quizGameState.formattedLives}
        </div>
        <div className={styles["quiz-type"]}>{name}</div>
        <div
          className={styles["quiz-time"]}
          style={{
            color: `hsl(${(quizTime.time / time) * 120},100%,40%)`,
          }}
        >
          {quizTime.formattedTime}
        </div>
      </div>
      <div className={styles["country-cards-container"]}>
        <Card
          className={`${styles["country-card"]} ${
            !nextCountryList.at(currentCountryIndex[2])?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${$countryCardsClasses[0]}`}
        >
          <img
            src={nextCountryList.at(currentCountryIndex[2])?.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !nextCountryList.at(currentCountryIndex[1])?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${$countryCardsClasses[1]}`}
        >
          <img
            src={nextCountryList.at(currentCountryIndex[1])?.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !nextCountryList.at(currentCountryIndex[0])?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${$countryCardsClasses[2]}`}
        >
          <img
            src={nextCountryList.at(currentCountryIndex[0])?.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !prevCountryList.at(-1)?.name?.at(0) ? styles["hidden-country"] : ""
          } ${$countryCardsClasses[3]}`}
        >
          <img
            src={prevCountryList.at(-1)?.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !prevCountryList.at(-2)?.name?.at(0) ? styles["hidden-country"] : ""
          } ${$countryCardsClasses[4]}`}
        >
          <img
            src={prevCountryList.at(-2)?.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
      </div>
      <div className={styles["number-of-countries"]}>
        {numberOfGuessedCountries}/{numberOfCountries}
      </div>
      <form
        className={`${styles["quiz-input-container"]}`}
        autoComplete="off"
        onSubmit={quizGuessSubmitHandler}
      >
        <input
          className={`${styles["quiz-input"]} ${
            guessAnimation ? styles[guessAnimation] : ""
          }`}
          maxLength="33"
          placeholder={quizGameState.isInitial ? "Input your guess here!" : ""}
          ref={inputGuess}
          disabled={quizGameState.gameState.won || quizGameState.gameState.lost}
        />
      </form>
    </div>
  );
};

export default Quiz;
