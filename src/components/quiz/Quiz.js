import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import getQuizCountry from "../../store/quiz-action-thunk";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";

let isInitial = true;

//!
const usedIndexesArray = [];

const listOfCountryPositions = [
  "nextFadedCountry",
  "nextCountry",
  "currentCountry",
  "prevCountry",
  "prevFadedCountry",
];

let currentCountryIndex = 2;

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
  return countryCardsClasses.slice();
};

const shiftClassesLeft = () => {
  const shiftedClass = countryCardsClasses.shift();
  countryCardsClasses.push(shiftedClass);

  if (currentCountryIndex !== 0) currentCountryIndex--;
  else currentCountryIndex = 4;

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

  $$countryCardsClasses[currentCountryIndex] =
    $$countryCardsClasses[currentCountryIndex] +
    ` ${styles["card-is-correct"]}`;

  if (currentCountryIndex !== 0) currentCountryIndex--;
  else currentCountryIndex = 2;

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
  const formattedLives = Number.isFinite(lives)
    ? `${lives} Lives`
    : "Unlimited Lives";

  let formattedTime = new Intl.DateTimeFormat("en-US", {
    minute: "2-digit",
    second: "2-digit",
  }).format(time);

  //! refactor into a hook and move elsewhere

  const [$countryCardsClasses, setCountryCardsClasses] =
    useState(countryCardsClasses);

  const countriesOrder = useSelector(
    (state) => state.quizzes.quizGameData.countries
  );

  const getRandomCountry = () => {
    const getRandomIndex = (lgth) => Math.trunc(Math.random() * (lgth + 1));
    let countriesList;
    if (onlyUN) countriesList = COUNTRY_NAMES_LIST.filter((con) => con.isUN);
    else countriesList = COUNTRY_NAMES_LIST;
    ////////////////////////////////////////////
    let randomIndex = getRandomIndex(countriesList.length);

    while (usedIndexesArray.includes(randomIndex)) {
      randomIndex = getRandomIndex(countriesList.length);
    }

    usedIndexesArray.push(randomIndex);
    return countriesList[randomIndex];
  };

  //possible positions: nextFadedCountry, nextCountry, currentCountry, prevCountry, prevFadedCountry.
  // dispatch(getQuizCountry("Oman", "nextCountry"));
  useEffect(() => {
    const initializeGame = () => {
      // order is important
      dispatch(getQuizCountry(getRandomCountry(), "nextCountry"));
      dispatch(getQuizCountry(getRandomCountry(), "nextFadedCountry"));
      dispatch(getQuizCountry(getRandomCountry(), "currentCountry"));
    };
    initializeGame();
  }, [dispatch]);

  const nextCountryList = useSelector(
    (state) => state.quizzes.quizGameData.nextCountries
  );
  const prevCountryList = useSelector(
    (state) => state.quizzes.quizGameData.prevCountries
  );

  //! end

  //* event handlers
  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
    //Guard Clause
    if (inputGuess.current.value === "") return;

    //!
    const targetCountryName =
      countriesOrder[listOfCountryPositions[currentCountryIndex]].name;

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

    const getNewCountry = () => {
      dispatch(getQuizCountry(getRandomCountry()));
    };

    if (guessIsCorrect) {
      console.log("guess is correct");
      setCountryCardsClasses(shiftClassesGuessCorrect());
    } else {
      console.log("guess is incorrect");
      return;
    }

    //! end

    inputGuess.current.value = "";
    // undo initial state
    if (isInitial) isInitial = false;
  };

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz-details-container"]}>
        <div className={styles["quiz-lives"]}>{formattedLives}</div>
        <div className={styles["quiz-type"]}>{name}</div>
        <div className={styles["quiz-time"]}>{formattedTime}</div>
      </div>
      <div className={styles["country-cards-container"]}>
        <Card
          className={`${styles["country-card"]} ${$countryCardsClasses[0]}`}
        >
          <img
            src={countriesOrder.nextFadedCountry.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !countriesOrder.nextFadedCountry.name.at(0)
              ? styles["hidden-country"]
              : ""
          } ${$countryCardsClasses[1]}`}
        >
          <img
            src={countriesOrder.nextCountry.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${$countryCardsClasses[2]}`}
        >
          <img
            src={countriesOrder.currentCountry.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !countriesOrder.prevCountry.name.at(0)
              ? styles["hidden-country"]
              : ""
          } ${$countryCardsClasses[3]}`}
        >
          <img
            src={countriesOrder.prevCountry.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${$countryCardsClasses[4]}`}
        >
          <img
            src={countriesOrder.prevFadedCountry.flag}
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
      </div>
      <div className={styles["number-of-countries"]}>0/{numberOfCountries}</div>
      <form
        className={styles["quiz-input-container"]}
        autoComplete="off"
        onSubmit={quizGuessSubmitHandler}
      >
        <input
          className={styles["quiz-input"]}
          maxLength="33"
          placeholder={isInitial ? "Input your guess here!" : ""}
          ref={inputGuess}
        />
      </form>
    </div>
  );
};

export default Quiz;
