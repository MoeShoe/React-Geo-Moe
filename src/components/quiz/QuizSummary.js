import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./QuizSummary.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { quizzesActions } from "../../store/quizzes-slice";
import Layout from "../UI/Layout";

const QuizSummary = (props) => {
  const { numberOfGuessedCountries, numberOfCountries, mode, time, lives } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fadeOutAnimation, setFadoutAnimation] = useState(false);

  const homeClickHandler = () => {
    // redirects to home
    dispatch(quizzesActions.resetQuiz());
    navigate("/", { replace: true });
  };

  const tryAgainClickHandler = () => {
    setFadoutAnimation(true);
    dispatch(quizzesActions.resetQuiz());
  };

  return (
    <Layout
      className={`${fadeOutAnimation ? styles["fade-out-animation"] : ""}`}
    >
      <Card className={`${styles["summary-container"]}`}>
        <div
          className={styles["summary-percentage"]}
          style={{
            color: `hsl(${
              (numberOfGuessedCountries / numberOfCountries) * 120
            },100%,40%)`,
          }}
        >
          {((numberOfGuessedCountries / numberOfCountries) * 100).toFixed(0)}%
        </div>
        <div className={styles["summary-details-container"]}>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-field"]}>Mode:</span>
            <span>{mode}</span>
          </div>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-field"]}>Guesses:</span>
            <span>
              {numberOfGuessedCountries}/{numberOfCountries}
            </span>
          </div>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-field"]}>Time Left:</span>
            <span>{time}</span>
          </div>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-field"]}>Lives left:</span>
            <span>{lives}</span>
          </div>
        </div>
        <div className={styles["summary-actions-container"]}>
          <Button
            className={styles["summary-action-button"]}
            onClick={homeClickHandler}
          >
            Go Home
          </Button>
          <Button
            className={styles["summary-action-button"]}
            onClick={tryAgainClickHandler}
          >
            Try Again
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default QuizSummary;
