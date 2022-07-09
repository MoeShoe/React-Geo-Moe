import { useSelector, useDispatch } from "react-redux";

import getUserGeolocation from "./store/get-user-geolocation-action";

import styles from "./App.module.css";
import Error from "./components/UI/Error";
import CountryInfo from "./components/country-info/CountryInfo";
import SearchBar from "./components/search-bar/SearchBar";
import Map from "./components/map/Map";
import NeighbourCountriesList from "./components/neighbour-countries-list/NeighbourCountriesList";
import Button from "./components/UI/Button";
import COUNTRY_NAMES_LIST from "./constants/COUNTRY_NAMES_LIST";
import fetchCountryData from "./store/country-action-thunk";

function App() {
  const dispatch = useDispatch();

  const showError = useSelector((state) => state.ui.error.displayError);

  const getUserGeolocationHander = () => {
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
    <div className={styles["main-app-container"]}>
      <SearchBar />
      <Button onClick={getUserGeolocationHander}>where am i?</Button>
      <Button onClick={getRandomCountryHandler}>Random Country</Button>
      <div className={styles["country-main-infos-container"]}>
        <CountryInfo />
        <Map />
      </div>
      <NeighbourCountriesList />
      {showError && <Error />}
    </div>
  );
}

export default App;
