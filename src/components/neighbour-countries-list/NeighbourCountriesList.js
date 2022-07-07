import { useSelector } from "react-redux";

import styles from "./NeighbourCountriesList.module.css";
import NeighbourCountry from "./NeighbourCountry";

const NeighbourCountriesList = () => {
  const neighbourCountriesList = useSelector(
    (state) => state.neighbouringCountries.neighbourCountries
  );
  return (
    <div className={styles["neighbours-container"]}>
      {neighbourCountriesList.map((con) => {
        return (
          <NeighbourCountry
            flag={con.flags.svg}
            name={con.name.common}
            key={con.name.official}
          />
        );
      })}
    </div>
  );
};

export default NeighbourCountriesList;
