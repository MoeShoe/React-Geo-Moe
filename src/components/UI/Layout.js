import { createPortal } from "react-dom";
import styles from "./Layout.module.css";

const Layout = (props) => {
  return createPortal(
    <div className={`${styles["layout"]} ${props.className}`}>
      {props.children}
    </div>,
    document.getElementById("layout")
  );
};

export default Layout;
