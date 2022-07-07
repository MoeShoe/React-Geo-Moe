import { useSelector, useDispatch } from "react-redux";

import fetchCountryData from "../../store/country-action-thunk";

import styles from "./NeighbourCountriesList.module.css";
import NeighbourCountry from "./NeighbourCountry";

const NeighbourCountriesList = () => {
  const dispatch = useDispatch();

  const neighbourCountriesList = useSelector(
    (state) => state.neighbouringCountries.neighbourCountries
  );

  const countryClickHandler = (countryName) => {
    dispatch(fetchCountryData(countryName));
  };
  return (
    <div className={styles["neighbours-container"]}>
      {neighbourCountriesList.map((con) => {
        return (
          <NeighbourCountry
            flag={con.flags.svg}
            name={con.name.common}
            key={con.name.official}
            onCountryClick={() => countryClickHandler(con.name.official)}
          />
        );
      })}
    </div>
  );
};

export default NeighbourCountriesList;
