import { useRef } from "react";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";

const Quiz = () => {
  const inputGuess = useRef();

  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz-details-container"]}>
        <div className={styles["quiz-lives"]}>5 Lives</div>
        <div className={styles["quiz-type"]}>Relaxed</div>
        <div className={styles["quiz-time"]}>05:00</div>
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
          placeholder="Enter your guess here!"
          ref={inputGuess}
        />
      </form>
    </div>
  );
};

export default Quiz;
