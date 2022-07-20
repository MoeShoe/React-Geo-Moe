import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
//icons
import { GiCardRandom, GiEarthAfricaEurope } from "react-icons/gi";
import { BsFillPinMapFill, BsFillInfoCircleFill } from "react-icons/bs";
import { HiPuzzle } from "react-icons/hi";

import getUserGeolocation from "../../store/get-user-geolocation-action";

import styles from "./NavBar.module.css";
import Button from "../UI/Button";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import fetchCountryData from "../../store/country-action-thunk";
import SearchBar from "../search-bar/SearchBar";

const NavBar = () => {
  const dispatch = useDispatch();

  const path = useLocation();
  const pathIsHome = path.pathname === "/";

  const isLoading = useSelector((state) => state.ui.isLoading.countryIsLoading);

  const getUserGeolocationHandler = () => {
    dispatch(getUserGeolocation());
  };

  const getRandomCountryHandler = () => {
    const randomCountryIndex = Math.trunc(
      Math.random() * COUNTRY_NAMES_LIST.length
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
        <CSSTransition
          in={!pathIsHome}
          unmountOnExit
          timeout={250}
          classNames={{
            enterActive: styles["home-link-enter"],
            enterDone: styles["home-link-enter-done"],
            exitActive: styles["home-link-exit"],
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles["nav-link"]} ${
                isActive ? styles["nav-link-active"] : ""
              }`
            }
          >
            <span>
              <GiEarthAfricaEurope className={styles["link-icon"]} />
              Home
            </span>
          </NavLink>
        </CSSTransition>
        <NavLink
          to="/Quizzes"
          className={({ isActive }) =>
            `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
          }
        >
          <span>
            <HiPuzzle className={styles["link-icon"]} />
            Quizzes
          </span>
        </NavLink>
        <NavLink
          to="/About"
          className={({ isActive }) =>
            `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
          }
        >
          <span>
            <BsFillInfoCircleFill
              className={styles["link-icon"]}
              style={{ transform: "scale(0.85) translateY(4px)" }}
            />
            About
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
