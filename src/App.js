import { useSelector } from "react-redux";

import styles from "./App.module.css";
import NavBar from "./components/nav-bar/NavBar";
import CountryInfo from "./components/country-info/CountryInfo";
import Map from "./components/map/Map";
import NeighbourCountriesList from "./components/neighbour-countries-list/NeighbourCountriesList";
import Error from "./components/UI/Error";

function App() {
  const showError = useSelector((state) => state.ui.error.displayError);

  return (
    <>
      <NavBar />
      <div className={styles["country-main-infos-container"]}>
        <CountryInfo />
        <Map />
      </div>
      <NeighbourCountriesList />
      {showError && <Error />}
    </>
  );
}

export default App;
