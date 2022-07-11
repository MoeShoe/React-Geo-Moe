import { useSelector } from "react-redux";

import styles from "./CountryInfo.module.css";
import Card from "../UI/Card";
import CountryInfoHeader from "./CountryInfoHeader";
import CountryInfoDetail from "./CountryInfoDetail";

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
      />
    </Card>
  );
};

export default CountryInfo;
