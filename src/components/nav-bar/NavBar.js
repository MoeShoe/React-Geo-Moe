import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
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

  const path = useLocation();
  //Spaghetti
  const pathIsHome = path.pathname === "/";

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
      <NavLink
        to="/"
        className={`${styles["app-header"]} ${
          pathIsHome && styles["app-header-is-home"]
        }`}
      >
        <span className={styles["header-part-1"]}>Geo</span>
        <span className={styles["header-part-2"]}>Moe</span>
      </NavLink>

      <CSSTransition
        in={pathIsHome}
        timeout={250}
        unmountOnExit
        classNames={{
          exitActive: styles["nav-sub-container-exit"],
        }}
      >
        <div className={styles["nav-sub-container"]}>
          <SearchBar isLoading={isLoading} />
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
        </div>
      </CSSTransition>
      <div
        className={`${styles["links-container"]} ${
          pathIsHome && styles["links-container-is-home"]
        }`}
      >
        {!pathIsHome && (
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles["nav-link"]} ${
                isActive ? styles["nav-link-active"] : ""
              }`
            }
            style={{ width: "33%" }}
          >
            Home
          </NavLink>
        )}
        <NavLink
          to="/Quizzes"
          className={({ isActive }) =>
            `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
          }
          style={!pathIsHome ? { width: "33%" } : {}}
        >
          Quizzes
        </NavLink>
        <NavLink
          to="/About"
          className={({ isActive }) =>
            `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
          }
          style={!pathIsHome ? { width: "33%" } : {}}
        >
          About
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
