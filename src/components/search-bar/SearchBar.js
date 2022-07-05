import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchBar.module.css";
import { fetchCountryData } from "../../store/store";
import { countryActions } from "../../store/store";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";

const SearchBar = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  const isNotCountry = useSelector((state) => state.isNotCountry);

  const [country, setCountry] = useState("");

  const searchInputChangeHandler = (e) => {
    if (isLoading) return;
    setCountry(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const queriedCountry = country.trim().toLowerCase();

    //form control
    //TODO expand form control
    if (queriedCountry.length === 0) return;

    /* i had to add this extra step because of the API sometimes returning multiple countries
     or returning the wrong country.(ex: comment this out and query iran or india :)) */
    const potentialTargetCountry = COUNTRY_NAMES_LIST.find(
      (countryName) => countryName.common.toLowerCase() === queriedCountry
    );

    // reset the error state
    dispatch(countryActions.setIsNotCountry(false));

    // contact the API and return the queried country
    dispatch(
      fetchCountryData(potentialTargetCountry?.official || queriedCountry)
    );

    // reset the search input
    setCountry("");
  };

  return (
    <div className={styles["search-bar-container"]}>
      <form onSubmit={searchSubmitHandler} autoComplete="off">
        <input
          className={`${styles["search-bar"]} ${
            isNotCountry && styles["search-bar-error"]
          }`}
          value={country}
          onChange={searchInputChangeHandler}
        />
      </form>
    </div>
  );
};

export default SearchBar;
