import { createPortal } from "react-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return createPortal(
    <div className={styles["layout"]}></div>,
    document.getElementById("layout")
  );
};

export default Layout;
