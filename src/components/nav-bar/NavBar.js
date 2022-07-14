import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
      <NavLink to="/" className={styles["app-header"]}>
        <span className={styles["header-part-1"]}>Geo</span>
        <span className={styles["header-part-2"]}>Moe</span>
      </NavLink>
      <SearchBar isLoading={isLoading} />
      <div className={styles["nav-sub-container"]}>
        <div className={styles["actions-container"]}>
          <Button
            onClick={getUserGeolocationHandler}
            className={styles["navbar-action"]}
            style={{ fontSize: "22px" }}
            data-tooltip={"Get your current Country"}
            disabled={isLoading}
          >
            <BsFillPinMapFill />
          </Button>
          <Button
            onClick={getRandomCountryHandler}
            className={styles["navbar-action"]}
            data-tooltip={"Get a random Country"}
            disabled={isLoading}
          >
            <GiCardRandom />
          </Button>
        </div>
        <div className={styles["links-container"]}>
          <NavLink
            to="/Quizzes"
            className={({ isActive }) =>
              `${styles["nav-link"]} ${
                isActive ? styles["nav-link-active"] : ""
              }`
            }
          >
            Quizzes
          </NavLink>
          <NavLink
            to="/About"
            className={({ isActive }) =>
              `${styles["nav-link"]} ${
                isActive ? styles["nav-link-active"] : ""
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
