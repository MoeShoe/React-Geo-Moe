import styles from "./App.module.css";
import Card from "./components/UI/Card";
import CountryInfo from "./components/country-info/CountryInfo";
import SearchBar from "./components/search-bar/SearchBar";
import Map from "./components/map/Map";
import NeighbourCountriesList from "./components/neighbour-countries-list/NeighbourCountriesList";

function App() {
  return (
    <div className={styles["main-app-container"]}>
      <SearchBar />
      <div className={styles["country-main-infos-container"]}>
        <Card className={styles["country-info-container"]}>
          <CountryInfo />
        </Card>
        <Card className={styles["country-map-container"]}>
          <Map />
        </Card>
      </div>
      <NeighbourCountriesList />
    </div>
  );
}

export default App;
