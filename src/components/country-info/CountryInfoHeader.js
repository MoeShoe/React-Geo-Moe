import { CSSTransition } from "react-transition-group";

import styles from "./CountryInfoHeader.module.css";

const CountryInfoHeader = (props) => {
  const { isLoading, flag, name } = props;
  return (
    <CSSTransition
      in={!isLoading && !!flag}
      classNames={{
        enterActive: styles["country-name-enter"],
        enterDone: styles["country-name-enter-done"],
        exitActive: styles["country-name-exit"],
        exitDone: styles["country-name-exit-done"],
      }}
      timeout={250}
    >
      <div
        className={styles["country-name"]}
        style={{
          backgroundImage: `linear-gradient(270deg, transparent 0%, rgba(255,255,255,0.7) 100%), ${` ${
            flag && `url(${flag})`
          }`}`,
        }}
      >
        {name}
      </div>
    </CSSTransition>
  );
};

export default CountryInfoHeader;
