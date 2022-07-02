import styles from "./App.module.css";
import Card from "./components/UI/Card";
import CountryInfo from "./components/country-info/CountryInfo";
import SearchBar from "./components/search-bar/SearchBar";
import Map from "./components/map/Map";

function App() {
  return (
    <div className={styles["main-app-container"]}>
      <SearchBar />
      <div className={styles["country-main-container"]}>
        <Card className={styles["country-info-container"]}>
          <CountryInfo />
        </Card>
        <Card className={styles["country-map-container"]}>
          <Map />
        </Card>
      </div>
    </div>
  );
}

export default App;
