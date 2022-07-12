import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
//icons
import { MdError } from "react-icons/md";

import styles from "./Error.module.css";
import Card from "./Card";
import { uiActions } from "../../store/UI-slice";

const Error = () => {
  const dispatch = useDispatch();

  const [displayError, setDisplayError] = useState(false);

  //TODO
  /* pretty sloppy work around some limitations in the react-transition-group library,
   will brainstorm something better later */
  const error = useSelector((state) => state.ui.error);

  const closeErrorHandler = () => {
    setDisplayError(false);
    setTimeout(() => {
      dispatch(uiActions.setErrorVisibility(false));
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => setDisplayError(true), 100);
  }, []);

  return createPortal(
    <CSSTransition
      in={displayError}
      classNames={{
        enterActive: styles["error-container-enter"],
        enterDone: styles["error-container-enter-done"],
        exitActive: styles["error-container-exit"],
        exitDone: styles["error-container-exit-done"],
      }}
      timeout={250}
    >
      <Card className={styles["error-container"]}>
        <div className={styles["error-header-container"]}>
          <span className={styles["error-header"]}>
            <MdError className={styles["error-icon"]} />
            Error
          </span>
          <button
            className={styles["error-close-button"]}
            onClick={closeErrorHandler}
          >
            &#215;
          </button>
        </div>
        <span className={styles["error-message"]}>{error.errorMessage}</span>
      </Card>
    </CSSTransition>,
    document.getElementById("error")
  );
};

export default Error;
