import { useSelector } from "react-redux";

import styles from "./App.module.css";
import Error from "./components/UI/Error";
import CountryInfo from "./components/country-info/CountryInfo";
import SearchBar from "./components/search-bar/SearchBar";
import Map from "./components/map/Map";
import NeighbourCountriesList from "./components/neighbour-countries-list/NeighbourCountriesList";

function App() {
  const showError = useSelector((state) => state.ui.error.displayError);

  return (
    <div className={styles["main-app-container"]}>
      <SearchBar />
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
