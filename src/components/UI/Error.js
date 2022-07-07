import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import styles from "./Error.module.css";
import Card from "./Card";
import { uiActions } from "../../store/UI-slice";

const Error = (props) => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.ui.error);

  return createPortal(
    <CSSTransition
      in={error.displayError}
      classNames={{
        enterActive: styles["error-container-enter"],
        enterDone: styles["error-container-enter-done"],
        exitActive: styles["error-container-exit"],
        exitDone: styles["error-container-exit-done"],
      }}
      unmountOnExit
      timeout={250}
    >
      <Card className={styles["error-container"]}>
        <div className={styles["error-header-container"]}>
          <span className={styles["error-header"]}>❗Error</span>
          <button
            className={styles["error-close-button"]}
            onClick={() => {
              dispatch(uiActions.setErrorVisibility(false));
            }}
          >
            &#215;{" "}
          </button>
        </div>
        <span className={styles["error-message"]}>{error.errorMessage}</span>
      </Card>
    </CSSTransition>,
    document.getElementById("error")
  );
};

export default Error;
