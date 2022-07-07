import styles from "./NeighbourCountry.module.css";
import Card from "../UI/Card";

const NeighbourCountry = (props) => {
  return (
    <Card className={styles["neighbour-card"]} onClick={props.onCountryClick}>
      <img
        src={props.flag}
        alt={`Flag of ${props.name}`}
        className={styles.flag}
      />
      <div className={styles["country-name"]}>
        <span>{props.name}</span>
      </div>
    </Card>
  );
};

export default NeighbourCountry;
