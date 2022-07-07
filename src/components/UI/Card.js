import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${styles.card} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
