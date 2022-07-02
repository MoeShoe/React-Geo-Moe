import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./SearchBar.module.css";
import { fetchCountryData } from "../../store/store";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [country, setCountry] = useState("");

  const searchInputChangeHandler = (e) => {
    setCountry(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    //form control
    if (country.trim.length() === 0) return;

    dispatch(fetchCountryData(country));
  };

  return (
    <div className={styles["search-bar-container"]}>
      <form onSubmit={searchSubmitHandler}>
        <input
          className={styles["search-bar"]}
          value={country}
          onChange={searchInputChangeHandler}
        />
      </form>
    </div>
  );
};

export default SearchBar;
