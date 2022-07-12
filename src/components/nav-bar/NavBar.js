import { useDispatch, useSelector } from "react-redux";

import getUserGeolocation from "../../store/get-user-geolocation-action";

import styles from "./NavBar.module.css";
import Button from "../UI/Button";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import fetchCountryData from "../../store/country-action-thunk";
import SearchBar from "../search-bar/SearchBar";

const NavBar = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading.countryIsLoading);

  const getUserGeolocationHandler = () => {
    dispatch(getUserGeolocation());
  };

  const getRandomCountryHandler = () => {
    const randomCountryIndex = Math.trunc(
      Math.random() * (COUNTRY_NAMES_LIST.length + 1)
    );
    const randomCountry = COUNTRY_NAMES_LIST[randomCountryIndex].official;
    dispatch(fetchCountryData(randomCountry));
  };

  return (
    <div className={styles["nav-bar-container"]}>
      <SearchBar isLoading={isLoading} />
      <Button
        onClick={getUserGeolocationHandler}
        className={styles["navbar-actions"]}
        disabled={isLoading}
      >
        📍
      </Button>
      <Button
        onClick={getRandomCountryHandler}
        className={styles["navbar-actions"]}
        disabled={isLoading}
      >
        🎲
      </Button>
    </div>
  );
};

export default NavBar;
