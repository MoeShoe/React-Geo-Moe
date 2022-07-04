import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchBar.module.css";
import { fetchCountryData } from "../../store/store";

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
    //form control
    if (country.trim().length === 0) return;

    dispatch(fetchCountryData(country));
    setCountry("");
  };

  return (
    <div className={styles["search-bar-container"]}>
      <form onSubmit={searchSubmitHandler}>
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
