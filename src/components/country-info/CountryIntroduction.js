import styles from "./CountryIntroduction.module.css";

const CountryIntroduction = (props) => {
  return (
    <>
      <div
        className={`${styles["introduction-container"]} ${
          props.isLoading ? styles["introduction-container-fadeout"] : ""
        }`}
      >
        <div className={styles["introduction-header"]}>Welcome to GeoMoe!</div>
        <div className={styles["introduction-texts-container"]}>
          <div className={styles["introduction-text"]}>
            <span className={styles["text-emoji"]}>🌏</span> Here you can learn
            all sorts of things about countries or territories.
          </div>
          <div className={styles["introduction-text"]}>
            <span className={styles["text-emoji"]}>🧩</span> Take fun quizzes
            varying in difficulty to test and strengthen your knowledge. (coming
            soon)
          </div>
          <div className={styles["introduction-text"]}>
            <span className={styles["text-emoji"]}>🤓</span> Become a Geography
            buff!
          </div>
        </div>
        <div className={styles["instruction-text"]}>
          * You can start by querying a country in the search bar or by clicking
          a country on the map *
        </div>
      </div>
    </>
  );
};

export default CountryIntroduction;
