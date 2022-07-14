import styles from "./QuizzesPage.module.css";
import Card from "../components/UI/Card";

const QuizzesPage = () => {
  return (
    <div className={styles["quizzes-container"]}>
      <Card className={styles["quizz-challenge-select-container"]}>
        Relaxed
      </Card>
      <Card className={styles["quizz-challenge-select-container"]}>
        Challenge
      </Card>
      <Card className={styles["quizz-challenge-select-container"]}>
        HardCore
      </Card>
    </div>
  );
};

export default QuizzesPage;
