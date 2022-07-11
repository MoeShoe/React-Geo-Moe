import styles from "./CountryInfoDetail.module.css";

const CountryInfoDetail = (props) => {
  const {
    name,
    capital,
    languages,
    currencies,
    population,
    area,
    region,
    continent,
    isLoading,
  } = props;

  return (
    <>
      <div
        className={`${styles["country-infos-container"]} ${
          isLoading ? styles["country-infos-loading"] : ""
        }`}
      >
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Official Name:</span>
            <span className={styles["info-data"]}>
              {name}
              {name && "."}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Capital:</span>
            <span className={styles["info-data"]}>{capital}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Languages:</span>
            <span className={styles["info-data"]}>{languages}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Currencies:</span>
            <span className={styles["info-data"]}>{currencies}</span>
          </div>
        </div>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Population:</span>
            <span className={styles["info-data"]}>{population}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Area:</span>
            <span className={styles["info-data"]}>
              {area}
              {area && <sup>2</sup>}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Continent:</span>
            <span className={styles["info-data"]}>
              {continent}
              {continent && "."}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>Region:</span>
            <span className={styles["info-data"]}>
              {region}
              {region && "."}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryInfoDetail;
