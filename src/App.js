import styles from "./App.module.css";
import CountryInfo from "./components/country-info/CountryInfo";
import SearchBar from "./components/search-bar/SearchBar";
import Map from "./components/map/Map";

function App() {
  return (
    <>
      <SearchBar />
      <CountryInfo />
      <Map />
    </>
  );
}

export default App;
