import styles from "./CountryInfo.module.css";

const CountryInfo = () => {
  return (
    <>
      <div className={styles["country-name"]}>Country Name</div>
      <div className={styles["country-infos-container"]}>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span>Capital:</span> <span>AYAYA</span>
          </div>

          <div className={styles["info-row"]}>
            <span>Language:</span> <span>Weeb</span>
          </div>

          <div className={styles["info-row"]}>
            <span>Currency:</span> <span>pats</span>
          </div>
        </div>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span>Population:</span> <span>10_000_000</span>
          </div>

          <div className={styles["info-row"]}>
            <span>Size:</span> <span>600_000 Km2</span>
          </div>

          <div className={styles["info-row"]}>
            <span>Region:</span> <span>cutie land</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryInfo;
