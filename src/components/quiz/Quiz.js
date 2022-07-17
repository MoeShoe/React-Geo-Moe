import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import getQuizCountry from "../../store/quiz-action-thunk";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import { quizzesActions } from "../../store/quizzes-slice";

let isInitial = true;

//!
const usedIndexesArray = [];

let gameIsWon = false;

let startTimer = false;
let quizTimer, $time;

let currentCountryIndex = [-1, -2, -3];
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

  const $index = currentCountryIndex.pop();
  currentCountryIndex.unshift($index);

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

  const [formattedTime, setFormattedTime] = useState(
    new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(time)
  );

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

  //* add winning handler
  if (numberOfGuessedCountries === numberOfCountries) {
    console.log("Congratulations!, you won the game!");
    gameIsWon = true;
    clearInterval(quizTimer);
  }

  const getRandomCountry = () => {
    const getRandomIndex = (lgth) => Math.trunc(Math.random() * (lgth + 1));
    let countriesList;
    if (onlyUN) countriesList = COUNTRY_NAMES_LIST.filter((con) => con.isUN);
    else countriesList = COUNTRY_NAMES_LIST;
    ////////////////////////////////////////////

    //TODO
    // bad! change!
    if (usedIndexesArray.length === countriesList.length) {
      return;
    }

    let randomIndex = getRandomIndex(countriesList.length - 1);

    while (usedIndexesArray.includes(randomIndex)) {
      randomIndex = getRandomIndex(countriesList.length - 1);
    }

    usedIndexesArray.push(randomIndex);
    return countriesList[randomIndex];
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
    if (gameIsWon) return;

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

    if (guessIsCorrect) {
      console.log("guess is correct");

      setCountryCardsClasses(shiftClassesGuessCorrect());

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
    } else {
      console.log("guess is incorrect");
    }

    if (!startTimer) {
      startTimer = true;
      $time = time;

      quizTimer = setInterval(() => {
        setFormattedTime(
          new Intl.DateTimeFormat("en-US", {
            second: "2-digit",
            minute: "2-digit",
          }).format($time)
        );
        $time -= 1000; // because it's in Milliseconds

        if ($time < 0) clearInterval(quizTimer);
      }, 1000);
    }

    //! end

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
