import { useDispatch, useSelector } from "react-redux";
//icons
import { GiCardRandom } from "react-icons/gi";
import { BsFillPinMapFill } from "react-icons/bs";

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
      <div className={styles["app-header"]}>
        <span className={styles["header-part-1"]}>Geo</span>
        <span className={styles["header-part-2"]}>Moe</span>
      </div>
      <SearchBar isLoading={isLoading} />
      <div className={styles["actions-container"]}>
        <Button
          onClick={getUserGeolocationHandler}
          className={styles["navbar-actions"]}
          style={{ fontSize: "22px" }}
          data-tooltip={"Get your current Country"}
          disabled={isLoading}
        >
          <BsFillPinMapFill />
        </Button>
        <Button
          onClick={getRandomCountryHandler}
          className={styles["navbar-actions"]}
          data-tooltip={"Get a random Country"}
          disabled={isLoading}
        >
          <GiCardRandom />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
