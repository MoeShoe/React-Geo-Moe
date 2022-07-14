import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import styles from "./QuizzesPage.module.css";
import QuizzesList from "../components/quizz/QuizzesList";

const QuizzesPage = () => {
  const quizInPlay = useSelector((state) => state.quizzes.quizInPlay);

  return (
    <>
      <CSSTransition
        in={!quizInPlay}
        timeout={500}
        unmountOnExit
        classNames={{
          exitActive: styles["quizzes-list-container-exit"],
        }}
      >
        <div className={styles["quizzes-list-container"]}>
          <QuizzesList />
        </div>
      </CSSTransition>
    </>
  );
};

export default QuizzesPage;
