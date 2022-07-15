import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import getQuizCountry from "../../store/quiz-action-thunk";

let isInitial = true;

const Quiz = () => {
  const dispatch = useDispatch();

  //possible positions: nextFadedCountry, nextCountry, currentCountry, prevCountry, prevFadedCountry.
  // dispatch(getQuizCountry("Oman", "nextCountry"));

  const inputGuess = useRef();

  //* quiz parameters
  const { name, numberOfCountries, time, lives, onlyUN } = useSelector(
    (state) => state.quizzes.quiz.quizParams
  );

  const formattedLives = Number.isFinite(lives)
    ? `${lives} Lives`
    : "Unlimited Lives";

  let formattedTime = new Intl.DateTimeFormat("en-US", {
    minute: "2-digit",
    second: "2-digit",
  }).format(time);

  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
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
          className={`${styles["country-card"]} ${styles["next-faded-country"]}`}
        >
          <img src="" alt={`Flag of `} className={styles.flag} />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card className={`${styles["country-card"]} ${styles["next-country"]}`}>
          <img src="" alt={`Flag of `} className={styles.flag} />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${styles["current-country"]}`}
        >
          <img src="" alt={`Flag of `} className={styles.flag} />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card className={`${styles["country-card"]} ${styles["prev-country"]}`}>
          <img src="" alt={`Flag of `} className={styles.flag} />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${styles["prev-faded-country"]}`}
        >
          <img src="" alt={`Flag of `} className={styles.flag} />
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
