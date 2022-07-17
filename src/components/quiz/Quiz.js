import { useRef, useEffect, useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import getQuizCountry from "../../store/quiz-action-thunk";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import { quizzesActions } from "../../store/quizzes-slice";

let isInitial = true;

//!
let countriesList = [];

let gameIsWon,
  gameIsLost = false;
let $lives;

let startTimer = false;
let quizTimer, $time;

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
  const [formattedLives, setFormattedLives] = useState(
    Number.isFinite(lives) ? `${lives} Lives` : "Unlimited Lives"
  );

  const [formattedTime, setFormattedTime] = useState(
    new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(time)
  );

  //!
  //* Quiz Game state reducer

  const quizGameStateReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_GAME":
        dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
        dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
        dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
        break;

      case "SHIFT_CLASSES_LEFT":
        break;

      case "SHIFT_CLASSES_RIGHT":
        break;

      case "SHIFT_GUESS_CORRECT":
        break;

      default:
        break;
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
      time: time, //*
      formattedTime: new Intl.DateTimeFormat("en-US", {
        second: "2-digit",
        minute: "2-digit",
      }).format(time),
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
    gameIsWon = true;
  }

  //* add losing handler
  if (gameIsLost) {
    console.log("You lost! :( try again?");
  }

  if (gameIsWon || gameIsLost) {
    dispatch(quizzesActions.resetQuiz());
    clearInterval(quizTimer);
  }

  if (!$lives && $lives !== 0) $lives = lives;
  if (!$time && $time !== 0) $time = time;

  const getRandomCountry = () => {
    const getRandomIndex = (lgth) => Math.trunc(Math.random() * lgth);

    if (isInitial && countriesList.length === 0) {
      // deep cloning
      if (onlyUN)
        countriesList = JSON.parse(
          JSON.stringify(COUNTRY_NAMES_LIST.filter((con) => con.isUN))
        );
      else countriesList = JSON.parse(JSON.stringify(COUNTRY_NAMES_LIST));
    }
    ////////////////////////////////////////////

    if (countriesList.length === 0) {
      return;
    }

    const randomIndex = getRandomIndex(countriesList.length);

    const [country] = countriesList.splice(randomIndex, 1);
    return country;
  };

  useEffect(() => {
    const initializeGame = () => {
      dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
      dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
      dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
    };
    initializeGame();
  }, [dispatch]);

  //! end

  //* event handlers
  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
    //Guard Clause
    if (inputGuess.current.value === "") return;

    //!
    if (gameIsWon || gameIsLost) return;

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

      if (Number.isFinite(lives)) {
        $lives--;
        setFormattedLives($lives + " Lives");
        if ($lives === 0) gameIsLost = true;
      }
    }

    if (!startTimer) {
      startTimer = true;

      quizTimer = setInterval(() => {
        $time -= 1000; // because it's in Milliseconds

        setFormattedTime(
          new Intl.DateTimeFormat("en-US", {
            second: "2-digit",
            minute: "2-digit",
          }).format($time)
        );

        if ($time === 0) {
          gameIsLost = true;
          clearInterval(quizTimer);
        }
      }, 1000);
    }

    //! end

    // undo initial state
    if (isInitial) isInitial = false;
  };

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz-details-container"]}>
        <div
          className={styles["quiz-lives"]}
          style={
            Number.isFinite(lives)
              ? {
                  color: `hsl(${($lives / lives) * 120},100%,40%)`,
                }
              : { color: "hsl(120,100%,40%)" }
          }
        >
          {formattedLives}
        </div>
        <div className={styles["quiz-type"]}>{name}</div>
        <div
          className={styles["quiz-time"]}
          style={{
            color: `hsl(${($time / time) * 120},100%,40%)`,
          }}
        >
          {formattedTime}
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
          placeholder={isInitial ? "Input your guess here!" : ""}
          ref={inputGuess}
          disabled={gameIsLost || gameIsWon}
        />
      </form>
    </div>
  );
};

export default Quiz;
