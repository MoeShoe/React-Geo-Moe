import { useRef, useEffect, useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
//*icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import styles from "./Quiz.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import getQuizCountry from "../../store/quiz-action-thunk";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import { quizzesActions } from "../../store/quizzes-slice";

//!

const countryCardsClasses = [
  styles["next-faded-country"],
  styles["next-country"],
  styles["current-country"],
  styles["prev-country"],
  styles["prev-faded-country"],
];

// const shiftClassesRight = () => {
//   const poppedClass = countryCardsClasses.pop();
//   countryCardsClasses.unshift(poppedClass);

//   // if (currentCountryIndex !== 4) currentCountryIndex++;
//   // else currentCountryIndex = 0;

//   return countryCardsClasses.slice();
// };

// const shiftClassesLeft = () => {
//   const shiftedClass = countryCardsClasses.shift();
//   countryCardsClasses.push(shiftedClass);

//   // if (currentCountryIndex !== 0) currentCountryIndex--;
//   // else currentCountryIndex = 4;

//   return countryCardsClasses.slice();
// };

//! end

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

  //!

  //* helper functions
  const deepClone = (refData) => JSON.parse(JSON.stringify(refData));
  const getRandomIndex = (lgth) => Math.trunc(Math.random() * lgth);

  const getRandomCountry = () => {
    // Guard Clause
    if (quizGameState.countriesList.length === 0) {
      return;
    }

    const randomIndex = getRandomIndex(quizGameState.countriesList.length);

    dispatchQuizGameState({ type: "REMOVE_COUNTRY", payload: randomIndex });
    return quizGameState.countriesList[randomIndex];
  };

  //* Quiz Game state reducer

  const quizGameStateReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_GAME":
        let $countriesList;
        if (onlyUN)
          $countriesList = deepClone(
            COUNTRY_NAMES_LIST.filter((con) => con.isUN)
          );
        else $countriesList = deepClone(COUNTRY_NAMES_LIST);

        dispatch(
          getQuizCountry(
            $countriesList
              .splice(getRandomIndex($countriesList.length), 1)
              .at(0),
            "NEXT"
          )
        );

        dispatch(
          getQuizCountry(
            $countriesList
              .splice(getRandomIndex($countriesList.length), 1)
              .at(0),
            "NEXT"
          )
        );

        dispatch(
          getQuizCountry(
            $countriesList
              .splice(getRandomIndex($countriesList.length), 1)
              .at(0),
            "NEXT"
          )
        );

        return deepClone({
          ...state,
          countriesList: $countriesList,
        });

      case "REMOVE_COUNTRY":
        return deepClone({
          ...state,
          countriesList: state.countriesList
            .slice(0, action.payload)
            .concat(state.countriesList.slice(action.payload + 1)),
        });

      case "UNDO_INITIAL":
        return deepClone({ ...state, isInitial: false });

      case "UPDATE_GAME_STATE":
        return deepClone({ ...state, gameState: action.payload });

      case "INCREMENT_GUESS":
        return deepClone({
          ...state,
          numberOfGuessedCountries: ++state.numberOfGuessedCountries,
        });

      case "DECREMENT_LIVES":
        return deepClone({
          ...state,
          lives: --state.lives,
          formattedLives: `${state.lives} Lives`,
        });

      case "SET_TIMER":
        return deepClone({
          ...state,
          timer: {
            ...state.timer,
            startTimer: action.payload.startTimer,
            quizTimer: action.payload.timer,
          },
        });

      case "SHIFT_GUESS_CORRECT":
        const slicedCardClasses = state.cardClasses.$countryCardsClasses.slice(
          0,
          3
        );

        const shiftedClass = slicedCardClasses.shift();
        slicedCardClasses.push(shiftedClass);

        //* set the countryCardsClasses to this
        const $$countryCardsClasses = slicedCardClasses.concat(
          state.cardClasses.$countryCardsClasses.slice(3)
        );

        //* set the $countryCardsClasses to this
        const $$$countryCardsClasses = $$countryCardsClasses.slice();

        $$countryCardsClasses[state.cardClasses.currentCountryClassIndex] =
          $$countryCardsClasses[state.cardClasses.currentCountryClassIndex] +
          ` ${styles["card-is-correct"]}`;

        //* set currentCountryClassIndex to this
        let $currentCountryClassIndex =
          state.cardClasses.currentCountryClassIndex;

        if ($currentCountryClassIndex !== 0) $currentCountryClassIndex--;
        else $currentCountryClassIndex = 2;

        const $currentCountryIndex =
          state.cardClasses.currentCountryIndex.slice(0, 3);
        const $index = $currentCountryIndex.shift();
        $currentCountryIndex.push($index);

        //* set currentCountryIndex to this
        const $$currentCountryIndex = $currentCountryIndex.concat(
          state.cardClasses.currentCountryIndex.slice(3)
        );

        return deepClone({
          ...state,
          cardClasses: {
            currentCountryIndex: $$currentCountryIndex,
            currentCountryClassIndex: $currentCountryClassIndex,
            countryCardsClasses: $$countryCardsClasses,
            $countryCardsClasses: $$$countryCardsClasses,
          },
        });

      case "SHIFT_CLASSES_LEFT":
        const leftCountryCardsClasses =
          state.cardClasses.$countryCardsClasses.slice();
        const leftPoppedClass = leftCountryCardsClasses.shift();
        leftCountryCardsClasses.push(leftPoppedClass);

        let leftCurrentCountryClassIndex =
          state.cardClasses.currentCountryClassIndex;
        if (leftCurrentCountryClassIndex !== 0) leftCurrentCountryClassIndex++;
        else leftCurrentCountryClassIndex = 2;

        const leftCurrentCountryIndex =
          state.cardClasses.currentCountryIndex.slice();
        const leftIndex = leftCurrentCountryIndex.shift();
        leftCurrentCountryIndex.push(leftIndex);

        return deepClone({
          ...state,
          cardClasses: {
            currentCountryIndex: leftCurrentCountryIndex,
            currentCountryClassIndex: leftCurrentCountryClassIndex,
            countryCardsClasses: leftCountryCardsClasses,
            $countryCardsClasses: leftCountryCardsClasses,
          },
        });

      case "SHIFT_CLASSES_RIGHT":
        break;

      default:
        console.log("you are in the default block!");
        return deepClone({ ...state });
    }
  };

  //* Quiz Game initial state

  const quizGameInitialState = {
    isInitial: true,
    countriesList: [],
    gameState: { won: false, lost: false },
    currentFetchedCountryIndex: -3,

    lives: lives, //*
    formattedLives: `${
      Number.isFinite(lives) ? lives + " Lives" : "Unlimited Lives"
    }`,

    timer: {
      startTimer: false,
      quizTimer: null,
    },

    cardClasses: {
      currentCountryIndex: [-5, -4, -3, -2, -1],
      currentCountryClassIndex: 2,
      countryCardsClasses: countryCardsClasses.slice(),
      // a duplicate array added to handle on guess correct
      $countryCardsClasses: countryCardsClasses.slice(),
    },

    numberOfGuessedCountries: 0,
    guessAnimation: "",
  };

  const [quizGameState, dispatchQuizGameState] = useReducer(
    quizGameStateReducer,
    quizGameInitialState
  );

  // console.log(quizGameState);

  //! reducer end
  ///////////////////////////////////////////////
  //TODO
  //! refactor into a hook and move elsewhere

  const [quizTime, setQuizTime] = useState({
    time: time, //*
    formattedTime: new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(time),
  });

  const [guessAnimation, setGuessAnimation] = useState("");

  useEffect(() => {
    if (guessAnimation) {
      const animationTimer = setTimeout(() => setGuessAnimation(""), 250);

      return () => clearTimeout(animationTimer);
    }
  }, [guessAnimation]);

  // initializes the game
  useEffect(() => {
    dispatchQuizGameState({ type: "INITIALIZE_GAME" });
  }, []);

  if (quizGameState.gameState.lost) {
    console.log("You lost! :( try again?");
  }

  if (quizGameState.gameState.won || quizGameState.gameState.lost) {
    console.log("game has been resolved!");
    // dispatch(quizzesActions.resetQuiz());
    clearInterval(quizGameState.timer.quizTimer);
  }
  //! end

  //* event handlers
  const quizGuessSubmitHandler = (e) => {
    e.preventDefault();
    //Guard Clause
    if (inputGuess.current.value === "") return;

    if (quizGameState.gameState.won || quizGameState.gameState.lost) return;

    //TODO
    /* create a handler function in the hook that takes 
    this argument 'inputGuess.current.value.toLowerCase()' */
    //!
    const targetCountryName = fetchedCountriesList.at(
      quizGameState.currentFetchedCountryIndex
    ).name;

    console.log(targetCountryName);

    let guessIsCorrect;

    if (Array.isArray(targetCountryName)) {
      guessIsCorrect = targetCountryName
        .map((countryName) => countryName.toLowerCase())
        .includes(inputGuess.current.value.toLowerCase());
    } else {
      guessIsCorrect =
        inputGuess.current.value.toLowerCase() ===
        targetCountryName.toLowerCase();
    }

    //* On correct guess
    if (guessIsCorrect) {
      dispatchQuizGameState({ type: "SHIFT_GUESS_CORRECT" });
      setGuessAnimation("guess-correct");

      //* add winning handler
      if (quizGameState.numberOfGuessedCountries === numberOfCountries - 1) {
        console.log("Congratulations!, you won!");
        dispatchQuizGameState({
          type: "UPDATE_GAME_STATE",
          payload: { won: true },
        });
      }

      if (numberOfCountries - quizGameState.numberOfGuessedCountries > 3)
        dispatch(getQuizCountry(getRandomCountry(), "NEXT", true));
      else {
        dispatch(
          quizzesActions.setCountryPosition({
            country: { name: "", flag: "" },
            arr: "NEXT",
            shift: true,
          })
        );
      }

      dispatch(
        quizzesActions.onGuessSuccess(quizGameState.currentFetchedCountryIndex)
      );

      dispatchQuizGameState({ type: "INCREMENT_GUESS" });

      //? find a way!
      inputGuess.current.value = "";
    }
    //* On false guess
    else {
      setGuessAnimation("guess-false");

      if (Number.isFinite(quizGameState.lives)) {
        dispatchQuizGameState({ type: "DECREMENT_LIVES" });
      }

      //* add losing handler
      if (quizGameState.lives === 1)
        dispatchQuizGameState({
          type: "UPDATE_GAME_STATE",
          payload: { lost: true },
        });
    }

    if (!quizGameState.timer.startTimer) {
      dispatchQuizGameState({
        type: "SET_TIMER",
        payload: {
          startTimer: true,
          timer: setInterval(() => {
            setQuizTime((state) => {
              const newTime = state.time - 1_000; //because it's in milliseconds
              if (newTime === 0) {
                dispatchQuizGameState({
                  type: "UPDATE_GAME_STATE",
                  payload: { lost: true },
                });
              }
              return {
                time: newTime,
                formattedTime: new Intl.DateTimeFormat("en-US", {
                  second: "2-digit",
                  minute: "2-digit",
                }).format(newTime),
              };
            });
          }, 1000),
        },
      });
    }
    // undo initial state
    if (quizGameState.isInitial)
      dispatchQuizGameState({ type: "UNDO_INITIAL" });
    //! end
  };

  //TODO
  const leftArrowClickHandler = () => {
    dispatchQuizGameState({ type: "SHIFT_CLASSES_LEFT" });
    dispatch(quizzesActions.onShiftCardsLeft());
    console.log("clicked!");
  };

  console.log(fetchedCountriesList);

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
        >
          <FaArrowLeft className={styles["card-navigation-icon"]} />
        </Button>
        {quizGameState.numberOfGuessedCountries}/{numberOfCountries}
        <Button className={styles["card-navigation-button"]}>
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
