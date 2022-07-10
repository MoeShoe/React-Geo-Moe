import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchBar.module.css";
import fetchCountryData from "../../store/country-action-thunk";
import { uiActions } from "../../store/UI-slice";

import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";

let autoFillCountry,
  visibleAutoFillCountry = "";

/* this initial value was added to prevent the input from collapsing
 into itself and in process avoid magic numbers in min-height */
let hiddenAutoFillCountry = "x";

const SearchBar = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading.countryIsLoading);
  const isNotCountry = useSelector((state) => state.ui.error.isNotCountry);

  const [country, setCountry] = useState("");

  const searchInputChangeHandler = (e) => {
    setCountry(e.target.value);

    //*Search input autofill

    //Guard Clause
    if (e.target.value.trim().length === 0) {
      visibleAutoFillCountry = autoFillCountry = "";
      hiddenAutoFillCountry = "x";
      return;
    }

    const queriedCountry = e.target.value.trimStart().toLowerCase();

    const autoFillTarget = COUNTRY_NAMES_LIST.find((countryName) =>
      countryName.common.toLowerCase().startsWith(queriedCountry)
    );

    // grab the country's official name
    /* we need to query by the official full name of the country because of unwanted 
    or multiple results when querying by the common name (ex: india, iran) */
    autoFillCountry = autoFillTarget?.official || "";

    // set the hidden autofill part
    hiddenAutoFillCountry = e.target.value;

    // set the visible autofill part
    visibleAutoFillCountry =
      autoFillTarget?.common.slice(queriedCountry.length) || "";
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const queriedCountry = country.trim().toLowerCase();

    //form control
    //TODO expand form control
    if (queriedCountry.length === 0) return;

    // reset the error state
    dispatch(uiActions.setIsNotCountry(false));

    // contact the API and return the queried country
    dispatch(fetchCountryData(autoFillCountry || queriedCountry));

    // reset the search input
    setCountry("");
    autoFillCountry = visibleAutoFillCountry = "";
    hiddenAutoFillCountry = "x";
  };

  return (
    <form
      onSubmit={searchSubmitHandler}
      autoComplete="off"
      className={styles["search-bar-container"]}
    >
      {/* Real search bar */}
      <input
        className={`${styles["search-bar"]} ${styles["real-search-bar"]} ${
          isNotCountry && styles["search-bar-error"]
        }`}
        value={country}
        onChange={searchInputChangeHandler}
        placeholder={!isLoading ? "Search a Country!" : "Loading..."}
        maxLength="33"
      />
      {/* Fake search bar used for autofill suggestions */}
      <div className={`${styles["search-bar"]} ${styles["ghost-search-bar"]}`}>
        <span className={styles["hidden-autofill"]}>
          {hiddenAutoFillCountry}
        </span>
        <span className={styles["visible-autofill"]}>
          {visibleAutoFillCountry}
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
