import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./QuizzesList.module.css";
import Card from "../UI/Card";
import { quizzesActions } from "../../store/quizzes-slice";

const QuizzesList = () => {
  const dispatch = useDispatch();

  const quizInPlay = useSelector((state) => state.quizzes.quizInPlay);
  const quizType = useSelector((state) => state.quizzes.quiz.quizType);

  //extra state to manage animations
  const [quizData, setQuizData] = useState({ quizInPlay, quizType });

  const quizzSelectClickHandler = (quiz) => {
    // Guard Clause
    if (quizInPlay) return;

    setQuizData({ quizInPlay: true, quizType: quiz });

    // give animation time to play
    setTimeout(() => dispatch(quizzesActions.setCurrentQuiz(quiz)), 2000);
  };

  return (
    <>
      <div className={styles["quizzes-main-title"]}>
        Guess Countries based on their flag!
      </div>
      <div className={styles["quizzes-container"]}>
        <Card
          className={`${styles["quiz-challenge-select-container"]} ${
            quizData.quizInPlay &&
            (quizData.quizType !== "RELAXED"
              ? styles["quiz-select-fade-out"]
              : styles["quiz-select-blur"])
          }`}
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
          className={`${styles["quiz-challenge-select-container"]} ${
            quizData.quizInPlay &&
            (quizData.quizType !== "CHALLENGE"
              ? styles["quiz-select-fade-out"]
              : styles["quiz-select-blur"])
          }`}
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
          className={`${styles["quiz-challenge-select-container"]} ${
            quizData.quizInPlay &&
            (quizData.quizType !== "HARDCORE"
              ? styles["quiz-select-fade-out"]
              : styles["quiz-select-blur"])
          }`}
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
    </>
  );
};

export default QuizzesList;
