import { useSelector } from "react-redux";

import styles from "./CountryInfo.module.css";
import Card from "../UI/Card";
import CountryInfoHeader from "./CountryInfoHeader";
import CountryInfoDetail from "./CountryInfoDetail";
import CountryIntroduction from "./CountryIntroduction";

const CountryInfo = () => {
  const isLoading = useSelector((state) => state.ui.isLoading.countryIsLoading);

  const {
    population,
    area,
    region,
    name,
    capital,
    currencies,
    languages,
    flag,
    continent,
  } = useSelector((state) => state.country.country);

  const isInitial = !!!name.common;

  if (isInitial) {
    return (
      <Card className={styles["country-info-container"]}>
        <CountryIntroduction isLoading={isLoading} />
      </Card>
    );
  }

  return (
    <Card className={styles["country-info-container"]}>
      <CountryInfoHeader isLoading={isLoading} name={name.common} flag={flag} />
      <CountryInfoDetail
        name={name.official}
        population={population}
        area={area}
        region={region}
        capital={capital}
        currencies={currencies}
        languages={languages}
        continent={continent}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default CountryInfo;
