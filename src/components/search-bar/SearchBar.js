import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles["search-bar-container"]}>
      <input className={styles["search-bar"]} />
    </div>
  );
};

export default SearchBar;
