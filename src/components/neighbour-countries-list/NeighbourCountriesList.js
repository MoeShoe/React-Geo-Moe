import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import fetchCountryData from "../../store/country-action-thunk";

import styles from "./NeighbourCountriesList.module.css";
import NeighbourCountry from "./NeighbourCountry";

const NeighbourCountriesList = () => {
  const [infoTextContent, setInfoTextContent] = useState("initial");

  const dispatch = useDispatch();

  const neighbourCountriesList = useSelector(
    (state) => state.neighbouringCountries.neighbourCountries
  );

  const countryIsQueried = useSelector(
    (state) => !!state.country.country.name.common
  );

  const isLoading = useSelector(
    (state) => state.ui.isLoading.neighboursAreLoading
  );

  useEffect(() => {
    if (neighbourCountriesList.length === 0 && !countryIsQueried) {
      setInfoTextContent("* Please Query a Country *");
      return;
    }

    if (isLoading) {
      // added to prevent breaking the animation
      const loadingTimeout = setTimeout(
        () => setInfoTextContent("* Loading... *"),
        500
      );
      return () => {
        clearTimeout(loadingTimeout);
      };
    }

    if (countryIsQueried && neighbourCountriesList.length === 0 && !isLoading) {
      setInfoTextContent("* This country has no neighbours :( *");
      return;
    }

    setInfoTextContent("");
  }, [neighbourCountriesList, countryIsQueried, isLoading]);

  const countryClickHandler = (countryName) => {
    dispatch(fetchCountryData(countryName));
  };

  return (
    <>
      {countryIsQueried && (
        <div
          className={`${styles["neighbour-text"]} ${styles["neighbour-title"]}`}
        >
          Bordering Countries
        </div>
      )}
      <div className={styles["neighbours-container"]}>
        <CSSTransition
          in={!isLoading && !infoTextContent}
          classNames={{
            enterActive: styles["neighbour-cards-container-enter"],
            enterDone: styles["neighbour-cards-container-enter-done"],
            exitActive: styles["neighbour-cards-container-exit"],
          }}
          unmountOnExit
          timeout={250}
        >
          <div className={styles["neighbour-cards-container"]}>
            {neighbourCountriesList.map((con) => (
              <NeighbourCountry
                flag={con.flags.svg}
                name={con.name.common}
                onCountryClick={() => countryClickHandler(con.name.official)}
                key={con.name.official}
              />
            ))}
          </div>
        </CSSTransition>

        {infoTextContent && (
          <span
            className={`${styles["neighbour-text"]} ${styles["neighbour-info-text"]}`}
          >
            {infoTextContent}
          </span>
        )}
      </div>
    </>
  );
};

export default NeighbourCountriesList;
