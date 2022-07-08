import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

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

  let infoTextContent = "";

  if (isLoading) infoTextContent = "* Loading... *";

  if (neighbourCountriesList.length === 0 && !countryIsQueried)
    infoTextContent = "* Please Query a Country *";

  if (countryIsQueried && neighbourCountriesList.length === 0)
    infoTextContent = "* This country has no neighbours :( *";

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
