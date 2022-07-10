import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import styles from "./CountryInfo.module.css";
import Card from "../UI/Card";

const CountryInfo = () => {
  const isLoading = useSelector((state) => state.ui.isLoading.countryIsLoading);

  const {
    population: $population,
    area,
    region,
    name,
    capital,
    currencies,
    languages,
    flag,
  } = useSelector((state) => state.country.country);

  //format population
  const population =
    $population / 1_000_000 < 1_000
      ? `${($population / 1_000_000).toFixed(2)} M`
      : `${($population / 1_000_000_000).toFixed(2)} B`;

  return (
    <Card className={styles["country-info-container"]}>
      <CSSTransition
        in={!isLoading && !!flag.svg}
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
            <span className={styles["info-field"]}>Capital:</span>
            <span>{capital}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Languages:</span>
            <span>{languages}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Currencies:</span>
            <span>{currencies}</span>
          </div>
        </div>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Population:</span>
            <span>{population}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Area:</span>
            <span>
              {new Intl.NumberFormat("en-UK", {
                style: "unit",
                unit: "kilometer",
              }).format(area)}
              <sup>2</sup>
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Region:</span>
            <span>{region}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountryInfo;
