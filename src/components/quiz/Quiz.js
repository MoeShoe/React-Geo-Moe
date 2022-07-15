import { useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";

let isInitial = true;

const Quiz = () => {
  const inputGuess = useRef();

  const { name, numberOfCountries, time, lives, onlyUN } = useSelector(
    (state) => state.quizzes.quiz.quizParams
  );

  const formattedLives = Number.isFinite(lives)
    ? `${lives} Lives`
    : "Unlimited Lives";

  console.log(new Date(time));

  const formattedTime = new Intl.DateTimeFormat("en-US", {
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
        <Card className={styles["country-card"]}>
          <img src="" alt={`Flag of `} className={styles.flag} />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card className={styles["country-card"]}>
          <img src="" alt={`Flag of `} className={styles.flag} />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card className={styles["country-card"]}>
          <img src="" alt={`Flag of `} className={styles.flag} />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
      </div>
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
