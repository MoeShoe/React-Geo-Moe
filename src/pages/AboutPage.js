//* icons
import { BsGithub, BsLinkedin } from "react-icons/bs";

import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles["about-page-container"]}>
      <div className={styles["about-title"]}>About</div>
      <div className={styles["about-container-details"]}>
        This webapp was made with 💜 by S. Moussa. I took the endeavor of making
        this webapp as a challenge to myself to prove my comptence as a Web
        Developer. Fueling myself in this journey by my passion for Coding, my
        love for Geography and my pure dogged persistence. This webapp is not
        meant to reflect any of my political views as a developer for it was
        made with complete objectivity in mind, its goal is purely educational.
        The code repository for this webapp is public and anyone can contribute
        to it on{" "}
        <a
          href="https://github.com/MoeShoe/React-Geo-Moe"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </div>
      <div className={styles["about-title"]}>Contact Me</div>
      <div className={styles["contacts-container"]}>
        <div className={styles["contact"]}>
          <a
            href="https://github.com/MoeShoe"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["contact-link"]}
          >
            <BsGithub
              className={styles["contact-icon"]}
              style={{ color: "#000" }}
            />{" "}
            GitHub
          </a>
        </div>
        <div className={styles["contact"]}>
          <a
            href="https://www.linkedin.com/in/moussa-sahli-301176233/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["contact-link"]}
          >
            <BsLinkedin
              className={styles["contact-icon"]}
              style={{ color: "#0A66C2" }}
            />
            LinkedIn
          </a>
        </div>
      </div>
      <div className={styles["about-title"]}>Attributes</div>
      <div className={styles["attributes-container"]}>
        <a
          href="https://restcountries.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["att-link"]}
        >
          RestCountries API ❤️
        </a>
        <a
          href="https://geocodify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["att-link"]}
        >
          GeoCodify
        </a>
        <a
          href="https://github.com/MoeShoe/React-Geo-Moe"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["att-link"]}
        >
          A full list of dependecies on GitHub
        </a>
        <a
          href="https://www.flaticon.com/free-icons/globe"
          title="globe icons"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["att-link"]}
        >
          Icon by Freepik - Flaticon
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
