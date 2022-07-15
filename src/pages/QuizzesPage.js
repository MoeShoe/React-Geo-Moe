import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import styles from "./QuizzesPage.module.css";
import QuizzesList from "../components/quiz/QuizzesList";
import Quiz from "../components/quiz/Quiz";

const QuizzesPage = () => {
  const quizInPlay = useSelector((state) => state.quizzes.quizInPlay);

  return (
    <>
      <CSSTransition
        in={!quizInPlay}
        timeout={500}
        unmountOnExit
        classNames={{
          enterActive: styles["quizzes-list-container-enter"],
          enterDone: styles["quizzes-list-container-enter-done"],
          exitActive: styles["quizzes-list-container-exit"],
        }}
      >
        <div className={styles["quizzes-list-container"]}>
          <QuizzesList />
        </div>
      </CSSTransition>
      <CSSTransition
        in={quizInPlay}
        timeout={500}
        unmountOnExit
        classNames={{
          enterActive: styles["quiz-container-enter"],
          enterDone: styles["quiz-container-enter-done"],
          exitActive: styles["quiz-container-exit"],
        }}
      >
        <div className={styles["quiz-container"]}>
          <Quiz />
        </div>
      </CSSTransition>
    </>
  );
};

export default QuizzesPage;
