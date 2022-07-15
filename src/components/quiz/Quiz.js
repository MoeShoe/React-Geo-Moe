import styles from "./Quiz.module.css";
import Card from "../UI/Card";

const Quiz = () => {
  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz-details-container"]}>
        <div className={styles["quiz-lives"]}>5 Lives</div>
        <div className={styles["quiz-type"]}>Relaxed</div>
        <div className={styles["quiz-time"]}>05:00</div>
      </div>
      <div className={styles["country-cards-container"]}></div>
      <form className={styles["quiz-input-container"]}>
        <input maxLength="33" />
      </form>
    </div>
  );
};

export default Quiz;
