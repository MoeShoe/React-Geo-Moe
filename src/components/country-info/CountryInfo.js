import { useSelector } from "react-redux";

import styles from "./CountryInfo.module.css";

const CountryInfo = () => {
  const { population, area, region, name, capital, currency, language, flag } =
    useSelector((state) => state.country);
  return (
    <>
      <div
        className={styles["country-name"]}
        style={{
          backgroundImage: `linear-gradient(90deg, white, transparent),url("${flag.svg}")`,
        }}
      >
        {name}
      </div>
      <div className={styles["country-infos-container"]}>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span>Capital:</span> <span>{capital}</span>
          </div>

          <div className={styles["info-row"]}>
            <span>Language:</span> <span>{language}</span>
          </div>

          <div className={styles["info-row"]}>
            <span>Currency:</span>{" "}
            <span>{`${currency.name} (${currency.symbol})`}</span>
          </div>
        </div>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span>Population:</span>{" "}
            <span>{`${(population / 1_000_000).toFixed(2)} M`}</span>
          </div>

          <div className={styles["info-row"]}>
            <span>Area:</span>{" "}
            <span>
              {new Intl.NumberFormat("en-UK", {
                style: "unit",
                unit: "kilometer",
              }).format(area)}
              <sup>2</sup>
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span>Region:</span> <span>{region}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryInfo;
