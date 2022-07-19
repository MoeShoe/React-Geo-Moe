import Card from "../UI/Card";
import styles from "./QuizSummary.module.css";

const QuizSummary = () => {
  return (
    <Card className={styles["summary_container"]}>
      This is the quiz summary component
    </Card>
  );
};

export default QuizSummary;
