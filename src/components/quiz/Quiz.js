import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import getQuizCountry from "../../store/quiz-action-thunk";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";

let isInitial = true;
const usedIndexesArray = [];

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

  //* event handlers
  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
    inputGuess.current.value = "";

    // undo initial state
    if (isInitial) isInitial = false;
  };

  //! refactor into a hook and move elsewhere

  const countriesOrder = useSelector(
    (state) => state.quizzes.quizGameData.countries
  );

  console.log(countriesOrder);

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
    return countriesList[randomIndex].official;
  };

  //possible positions: nextFadedCountry, nextCountry, currentCountry, prevCountry, prevFadedCountry.
  // dispatch(getQuizCountry("Oman", "nextCountry"));
  useEffect(() => {
    dispatch(getQuizCountry(getRandomCountry(), "currentCountry"));
    dispatch(getQuizCountry(getRandomCountry(), "nextCountry"));
    dispatch(getQuizCountry(getRandomCountry(), "nextFadedCountry"));
  }, [dispatch]);

  //! end

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz-details-container"]}>
        <div className={styles["quiz-lives"]}>{formattedLives}</div>
        <div className={styles["quiz-type"]}>{name}</div>
        <div className={styles["quiz-time"]}>{formattedTime}</div>
      </div>
      <div className={styles["country-cards-container"]}>
        <Card
          className={`${styles["country-card"]} ${styles["next-faded-country"]}`}
        >
          <img
            src={countriesOrder.nextFadedCountry.flag}
            alt={`Flag of ${countriesOrder.nextFadedCountry.name}`}
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card className={`${styles["country-card"]} ${styles["next-country"]}`}>
          <img
            src={countriesOrder.nextCountry.flag}
            alt={`Flag of ${countriesOrder.nextCountry.name}`}
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${styles["current-country"]}`}
        >
          <img
            src={countriesOrder.currentCountry.flag}
            alt={`Flag of ${countriesOrder.currentCountry.name}`}
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card className={`${styles["country-card"]} ${styles["prev-country"]}`}>
          <img
            src={countriesOrder.prevCountry.flag}
            alt={`Flag of ${countriesOrder.prevCountry.name}`}
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${styles["prev-faded-country"]}`}
        >
          <img
            src={countriesOrder.prevFadedCountry.flag}
            alt={`Flag of ${countriesOrder.prevFadedCountry.name}`}
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
