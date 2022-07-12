//icons
import { IoIosBowtie, IoIosPeople } from "react-icons/io";
import { FaCity, FaMoneyBill } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { GiFlatPlatform, GiAfrica, GiPoland } from "react-icons/gi";

import styles from "./CountryInfoDetail.module.css";

const CountryInfoDetail = (props) => {
  const {
    name,
    capital,
    languages,
    currencies,
    population,
    area,
    region,
    continent,
    isLoading,
  } = props;

  return (
    <>
      <div
        className={`${styles["country-infos-container"]} ${
          isLoading ? styles["country-infos-loading"] : ""
        }`}
      >
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <IoIosBowtie className={styles["info-icon"]} />
              Official Name:
            </span>
            <span className={styles["info-data"]}>
              {name}
              {name && "."}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <FaCity className={styles["info-icon"]} />
              Capital:
            </span>
            <span className={styles["info-data"]}>{capital}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <IoLanguage className={styles["info-icon"]} />
              Languages:
            </span>
            <span className={styles["info-data"]}>{languages}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <FaMoneyBill className={styles["info-icon"]} />
              Currency:
            </span>
            <span className={styles["info-data"]}>{currencies}</span>
          </div>
        </div>
        <div className={styles["info-column"]}>
          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <IoIosPeople className={styles["info-icon"]} />
              Population:
            </span>
            <span className={styles["info-data"]}>{population}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <GiFlatPlatform className={styles["info-icon"]} />
              Area:
            </span>
            <span className={styles["info-data"]}>
              {area}
              {area && <sup>2</sup>}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <GiAfrica className={styles["info-icon"]} />
              Continent:
            </span>
            <span className={styles["info-data"]}>
              {continent}
              {continent && "."}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles["info-field"]}>
              <GiPoland className={styles["info-icon"]} />
              Region:
            </span>
            <span className={styles["info-data"]}>
              {region}
              {region && "."}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryInfoDetail;
