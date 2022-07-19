import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
//*icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import useSetupQuiz from "../../hooks/use-setup-quiz";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { quizzesActions } from "../../store/quizzes-slice";

const Quiz = () => {
  const dispatch = useDispatch();

  const inputGuess = useRef();

  //* quiz parameters
  const { name, numberOfCountries, time, lives, onlyUN } = useSelector(
    (state) => state.quizzes.quiz.quizParams
  );

  const fetchedCountriesList = useSelector(
    (state) => state.quizzes.quizGameData.countries
  );

  //* setup quiz hook
  const [
    quizGameState,
    userGuessHandler,
    quizTime,
    guessAnimation,
    leftArrowClickHandler,
    rightArrowClickHandler,
  ] = useSetupQuiz(
    numberOfCountries,
    fetchedCountriesList,
    lives,
    time,
    onlyUN
  );

  //? may not even use
  // if (quizGameState.gameState.lost) {
  //   console.log("You lost! :( try again?");
  // }

  if (quizGameState.gameState.won || quizGameState.gameState.lost) {
    clearInterval(quizGameState.timer.quizTimer);
    // dispatch(quizzesActions.resetQuiz());
  }

  //* event handlers
  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
    //Guard Clauses
    if (inputGuess.current.value.trim() === "") return;
    if (quizGameState.gameState.won || quizGameState.gameState.lost) return;

    userGuessHandler(inputGuess.current.value) &&
      (inputGuess.current.value = "");
  };

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz-details-container"]}>
        <div
          className={styles["quiz-lives"]}
          style={
            Number.isFinite(lives)
              ? {
                  color: `hsl(${(quizGameState.lives / lives) * 120},100%,40%)`,
                }
              : { color: "hsl(120,100%,40%)" }
          }
        >
          {quizGameState.formattedLives}
        </div>
        <div className={styles["quiz-type"]}>{name}</div>
        <div
          className={styles["quiz-time"]}
          style={{
            color: `hsl(${(quizTime.time / time) * 120},100%,40%)`,
          }}
        >
          {quizTime.formattedTime}
        </div>
      </div>
      <div className={styles["country-cards-container"]}>
        <Card
          className={`${styles["country-card"]} ${
            !fetchedCountriesList
              .at(quizGameState.cardClasses.currentCountryIndex[0])
              ?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${quizGameState.cardClasses.countryCardsClasses[0]}`}
        >
          <img
            src={
              fetchedCountriesList.at(
                quizGameState.cardClasses.currentCountryIndex[0]
              )?.flag
            }
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !fetchedCountriesList
              .at(quizGameState.cardClasses.currentCountryIndex[1])
              ?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${quizGameState.cardClasses.countryCardsClasses[1]}`}
        >
          <img
            src={
              fetchedCountriesList.at(
                quizGameState.cardClasses.currentCountryIndex[1]
              )?.flag
            }
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !fetchedCountriesList
              .at(quizGameState.cardClasses.currentCountryIndex[2])
              ?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${quizGameState.cardClasses.countryCardsClasses[2]}`}
        >
          <img
            src={
              fetchedCountriesList.at(
                quizGameState.cardClasses.currentCountryIndex[2]
              )?.flag
            }
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !fetchedCountriesList
              .at(quizGameState.cardClasses.currentCountryIndex[3])
              ?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${quizGameState.cardClasses.countryCardsClasses[3]}`}
        >
          <img
            src={
              fetchedCountriesList.at(
                quizGameState.cardClasses.currentCountryIndex[3]
              )?.flag
            }
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
        <Card
          className={`${styles["country-card"]} ${
            !fetchedCountriesList
              .at(quizGameState.cardClasses.currentCountryIndex[4])
              ?.name?.at(0)
              ? styles["hidden-country"]
              : ""
          } ${quizGameState.cardClasses.countryCardsClasses[4]}`}
        >
          <img
            src={
              fetchedCountriesList.at(
                quizGameState.cardClasses.currentCountryIndex[4]
              )?.flag
            }
            alt="Mystery Flag"
            className={styles.flag}
          />
          <div className={styles["country-name"]}>
            <span>?</span>
          </div>
        </Card>
      </div>
      <div className={styles["number-of-countries"]}>
        <Button
          className={styles["card-navigation-button"]}
          onClick={leftArrowClickHandler}
          disabled={
            quizGameState.gameState.won ||
            quizGameState.gameState.lost ||
            !fetchedCountriesList.at(
              quizGameState.currentFetchedCountryIndex - 1
            )?.name
          }
        >
          <FaArrowLeft className={styles["card-navigation-icon"]} />
        </Button>
        {quizGameState.numberOfGuessedCountries}/{numberOfCountries}
        <Button
          className={styles["card-navigation-button"]}
          onClick={rightArrowClickHandler}
          disabled={
            quizGameState.gameState.won ||
            quizGameState.gameState.lost ||
            !fetchedCountriesList.at(
              quizGameState.currentFetchedCountryIndex + 1
            )?.name
          }
        >
          <FaArrowRight className={styles["card-navigation-icon"]} />
        </Button>
      </div>
      <form
        className={`${styles["quiz-input-container"]}`}
        autoComplete="off"
        onSubmit={quizGuessSubmitHandler}
      >
        <input
          className={`${styles["quiz-input"]} ${
            guessAnimation ? styles[guessAnimation] : ""
          }`}
          maxLength="33"
          placeholder={quizGameState.isInitial ? "Input your guess here!" : ""}
          ref={inputGuess}
          disabled={quizGameState.gameState.won || quizGameState.gameState.lost}
        />
      </form>
    </div>
  );
};

export default Quiz;
