import styles from "./QuizzesPage.module.css";
import QuizzesList from "../components/quizz/QuizzesList";

const QuizzesPage = () => {
  return (
    <>
      <div className={styles["quizzes-main-title"]}>
        Guess Countries based on their flag!
      </div>
      <QuizzesList />
    </>
  );
};

export default QuizzesPage;
