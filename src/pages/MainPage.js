import { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./MainPage.module.css";
import CountryInfo from "../components/country-info/CountryInfo";
import Map from "../components/map/Map";
import NeighbourCountriesList from "../components/neighbour-countries-list/NeighbourCountriesList";
import { countryActions } from "../store/country-slice";
import { neighbourCountriesActions } from "../store/neighbour-countries-slice";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countryActions.resetCountries());
    dispatch(neighbourCountriesActions.resetNeighoubringCountries());
  }, [dispatch]);

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
