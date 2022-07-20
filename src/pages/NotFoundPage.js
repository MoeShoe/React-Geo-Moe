import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

//* this is the 404 page
const NotFoundPage = () => {
  return (
    <div className={styles["not-found-container"]}>
      <Link to="/" className={styles["four-zero-four"]}>
        <span className={styles["four"]}>4</span>
        <span className={styles["zero"]}>0</span>
        <span className={styles["four"]}>4</span>
      </Link>
      <div className={styles["not-found-description"]}>Page not found.</div>
    </div>
  );
};

export default NotFoundPage;
