import styles from "./MainPage.module.css";
import CountryInfo from "../components/country-info/CountryInfo";
import Map from "../components/map/Map";
import NeighbourCountriesList from "../components/neighbour-countries-list/NeighbourCountriesList";

const MainPage = () => {
  return (
    <>
      <div className={styles["country-main-infos-container"]}>
        <CountryInfo />
        <Map />
      </div>
      <NeighbourCountriesList />
    </>
  );
};

export default MainPage;
