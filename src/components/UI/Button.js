import styles from "./Button.module.css";

const Button = (props) => {
  const { className: classNames, ...restOfProps } = props;
  return (
    <button className={`${styles.button} ${classNames}`} {...restOfProps}>
      {props.children}
    </button>
  );
};

export default Button;
