import { useDispatch } from "react-redux";

import styles from "./QuizzesList.module.css";
import Card from "../UI/Card";
import { quizzesActions } from "../../store/quizzes-slice";

const QuizzesList = () => {
  const dispatch = useDispatch();

  const quizzSelectClickHandler = (quizz) => {
    dispatch(quizzesActions.setCurrentQuiz(quizz));
  };

  return (
    <div className={styles["quizzes-container"]}>
      <Card
        className={styles["quiz-challenge-select-container"]}
        onClick={() => quizzSelectClickHandler("RELAXED")}
      >
        <div className={styles["quiz-challenge-header"]}>
          <div>☕</div> Relaxed
        </div>
        <ul className={styles["quiz-details"]}>
          <li className={styles["quiz-detail"]}>
            <span>🌎</span> Guess 50 Countries.
          </li>
          <li className={styles["quiz-detail"]}>
            <span>🌍</span>You have 5 minutes.
          </li>
          <li className={styles["quiz-detail"]}>
            <span>🌏</span>You have unlimited lives.
          </li>
        </ul>
      </Card>
      <Card
        className={styles["quiz-challenge-select-container"]}
        onClick={() => quizzSelectClickHandler("CHALLENGE")}
      >
        <div
          className={styles["quiz-challenge-header"]}
          style={{ fontWeight: "700", color: "#1e3b8b" }}
        >
          <div>🎯</div> Challenge
        </div>
        <ul className={styles["quiz-details"]}>
          <li className={styles["quiz-detail"]}>
            <span>🌎</span> Guess all the 195 Countries of the world.
          </li>
          <li className={styles["quiz-detail"]}>
            <span>🌍</span>You have 10 minutes.
          </li>
          <li className={styles["quiz-detail"]}>
            <span>🌏</span>You have 5 lives.
          </li>
        </ul>
      </Card>
      <Card
        className={styles["quiz-challenge-select-container"]}
        onClick={() => quizzSelectClickHandler("HARDCORE")}
      >
        <div
          className={styles["quiz-challenge-header"]}
          style={{ fontWeight: "900", color: "#ad101f" }}
        >
          <div>☠️</div> HardCore
        </div>
        <ul className={styles["quiz-details"]}>
          <li className={styles["quiz-detail"]}>
            <span>🌎</span> Guess all the 252 Countries and Territories of the
            world.
          </li>
          <li className={styles["quiz-detail"]}>
            <span>🌍</span>You have 15 minutes.
          </li>
          <li className={styles["quiz-detail"]}>
            <span>🌏</span>You have 3 lives.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default QuizzesList;
