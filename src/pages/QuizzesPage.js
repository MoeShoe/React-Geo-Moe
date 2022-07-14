import styles from "./QuizzesPage.module.css";
import Card from "../components/UI/Card";

const QuizzesPage = () => {
  return (
    <>
      <div className={styles["quizzes-main-title"]}>
        Guess Countries based on their flag!
      </div>
      <div className={styles["quizzes-container"]}>
        <Card className={styles["quiz-challenge-select-container"]}>
          <div className={styles["quiz-challenge-header"]}>
            <div>☕</div> Relaxed
          </div>
          <ul className={styles["quiz-details"]}>
            <li className={styles["quiz-detail"]}>
              <span>🌎</span> Guess the 195 Countries of the world.
            </li>
            <li className={styles["quiz-detail"]}>
              <span>🌍</span>You have 15 minutes.
            </li>
            <li className={styles["quiz-detail"]}>
              <span>🌏</span>You have unlimited lives.
            </li>
          </ul>
        </Card>
        <Card className={styles["quiz-challenge-select-container"]}>
          <div
            className={styles["quiz-challenge-header"]}
            style={{ fontWeight: "700", color: "#1e3b8b" }}
          >
            <div>🎯</div> Challenge
          </div>
          <ul className={styles["quiz-details"]}>
            <li className={styles["quiz-detail"]}>
              <span>🌎</span> Guess the 195 Countries of the world.
            </li>
            <li className={styles["quiz-detail"]}>
              <span>🌍</span>You have 10 minutes.
            </li>
            <li className={styles["quiz-detail"]}>
              <span>🌏</span>You have 5 lives.
            </li>
          </ul>
        </Card>
        <Card className={styles["quiz-challenge-select-container"]}>
          <div
            className={styles["quiz-challenge-header"]}
            style={{ fontWeight: "900", color: "#ad101f" }}
          >
            <div>☠️</div> HardCore
          </div>
          <ul className={styles["quiz-details"]}>
            <li className={styles["quiz-detail"]}>
              <span>🌎</span> Guess the 252 Countries and Territories of the
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

export default QuizzesPage;
