import styles from "./CountryInfoDetail.module.css";

const CountryInfoDetail = (props) => {
  const { capital, languages, currencies, population, area, region } = props;

  return (
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
            {area}
            <sup>2</sup>
          </span>
        </div>

        <div className={styles["info-row"]}>
          <span className={styles["info-field"]}>Region:</span>
          <span>{region}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryInfoDetail;
