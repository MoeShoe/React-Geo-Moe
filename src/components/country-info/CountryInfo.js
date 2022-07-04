import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import styles from "./CountryInfo.module.css";

const CountryInfo = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const { population, area, region, name, capital, currency, language, flag } =
    useSelector((state) => state.country);
  return (
    <>
      <CSSTransition
        in={!isLoading && !!flag.svg}
        classNames={{
          enterActive: styles["country-name-enter"],
          enterDone: styles["country-name-enter-done"],
          exitActive: styles["country-name-exit"],
          exitDone: styles["country-name-exit-done"],
        }}
        timeout={300}
      >
        <div
          className={styles["country-name"]}
          style={{
            backgroundImage: `linear-gradient(90deg, white, transparent), ${` ${
              flag.svg && `url(${flag.svg})`
            }`}`,
          }}
        >
          {name}
        </div>
      </CSSTransition>
      <div className={styles["country-infos-container"]}>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Capital:</span>{" "}
            <span>{capital}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Language:</span>{" "}
            <span>{language}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Currency:</span>{" "}
            <span>{`${currency.name} (${currency.symbol})`}</span>
          </div>
        </div>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Population:</span>{" "}
            <span>{`${(population / 1_000_000).toFixed(2)} M`}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Area:</span>{" "}
            <span>
              {new Intl.NumberFormat("en-UK", {
                style: "unit",
                unit: "kilometer",
              }).format(area)}
              <sup>2</sup>
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Region:</span>{" "}
            <span>{region}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryInfo;
