import styles from "./NeighbourCountriesList.module.css";
import NeighbourCountry from "./NeighbourCountry";

const NeighbourCountriesList = () => {
  return (
    <div className={styles["neighbours-container"]}>
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
      <NeighbourCountry />
    </div>
  );
};

export default NeighbourCountriesList;
