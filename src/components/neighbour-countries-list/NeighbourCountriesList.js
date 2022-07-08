import { useSelector, useDispatch } from "react-redux";

import fetchCountryData from "../../store/country-action-thunk";

import styles from "./NeighbourCountriesList.module.css";
import NeighbourCountry from "./NeighbourCountry";

const NeighbourCountriesList = () => {
  const dispatch = useDispatch();

  const neighbourCountriesList = useSelector(
    (state) => state.neighbouringCountries.neighbourCountries
  );

  const countryIsQueried = useSelector((state) => !!state.country.country.name);

  const isLoading = useSelector(
    (state) => state.ui.isLoading.neighboursAreLoading
  );

  console.log(isLoading);

  if (isLoading)
    return (
      <div className={styles["neighbours-container"]}>
        {" "}
        <span
          className={`${styles["neighbour-text"]} ${styles["neighbour-info-text"]}`}
        >
          {"* Loading... *"}
        </span>
      </div>
    );

  if (neighbourCountriesList.length === 0 && !countryIsQueried) {
    return (
      <div className={styles["neighbours-container"]}>
        <span
          className={`${styles["neighbour-text"]} ${styles["neighbour-info-text"]}`}
        >
          {"* Please Query a Country *"}
        </span>
      </div>
    );
  }

  if (countryIsQueried && neighbourCountriesList.length === 0) {
    return (
      <div className={styles["neighbours-container"]}>
        <span
          className={`${styles["neighbour-text"]} ${styles["neighbour-info-text"]}`}
        >
          {"* This country has no neighbours :( *"}
        </span>
      </div>
    );
  }

  const countryClickHandler = (countryName) => {
    dispatch(fetchCountryData(countryName));
  };
  return (
    <div className={styles["neighbours-container"]}>
      <div
        className={`${styles["neighbour-text"]} ${styles["neighbour-title"]}`}
      >
        Bordering Countries
      </div>
      {neighbourCountriesList.map((con) => (
        <NeighbourCountry
          flag={con.flags.svg}
          name={con.name.common}
          key={con.name.official}
          onCountryClick={() => countryClickHandler(con.name.official)}
        />
      ))}
    </div>
  );
};

export default NeighbourCountriesList;
