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
  const fetchNextCountry = () => {
    if (
      numberOfCountries -
        (quizGameState.numberOfGuessedCountries +
          (fetchedCountriesList.length - 2)) >
      0
    )
      dispatch(getQuizCountry(getRandomCountry(), "NEXT"));
    else if (
      numberOfCountries -
        (quizGameState.numberOfGuessedCountries +
          (fetchedCountriesList.length - 2)) >
      -2
    ) {
      dispatch(
        quizzesActions.setCountryPosition({
          country: { name: "", flag: "" },
          arr: "NEXT",
        })
      );
    }
  };

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
        //TODO too imperative
        //* set the countryCardsClasses to this
        const $$countryCardsClasses =
          state.cardClasses.$countryCardsClasses.map(($class) => {
            if ($class === styles["current-country"])
              return styles["next-faded-country"];
            if ($class === styles["next-faded-country"])
              return styles["next-country"];
            if ($class === styles["next-country"])
              return styles["current-country"];
            return $class;
          });

        //* set the $countryCardsClasses to this
        const $$$countryCardsClasses = $$countryCardsClasses.slice();

        $$countryCardsClasses[
          $$countryCardsClasses.indexOf(styles["next-faded-country"])
        ] =
          $$countryCardsClasses[
            $$countryCardsClasses.indexOf(styles["next-faded-country"])
          ] + ` ${styles["card-is-correct"]}`;

        //TODO too imperative
        //* set currentCountryIndex to this
        const $$currentCountryIndex = state.cardClasses.currentCountryIndex.map(
          (ind) => {
            if (ind === state.currentFetchedCountryIndex)
              return state.currentFetchedCountryIndex - 2;
            if (ind === state.currentFetchedCountryIndex - 2)
              return state.currentFetchedCountryIndex - 1;
            if (ind === state.currentFetchedCountryIndex - 1)
              return state.currentFetchedCountryIndex;
            return ind;
          }
        );

        return deepClone({
          ...state,
          cardClasses: {
            currentCountryIndex: $$currentCountryIndex,
            countryCardsClasses: $$countryCardsClasses,
            $countryCardsClasses: $$$countryCardsClasses,
          },
        });

      case "SHIFT_CLASSES_LEFT":
        //classes
        //TODO too imperative
        const leftCountryCardsClasses =
          state.cardClasses.$countryCardsClasses.map(($class) => {
            if ($class === styles["current-country"])
              return styles["prev-country"];
            if ($class === styles["prev-country"])
              return styles["prev-faded-country"];
            if ($class === styles["prev-faded-country"])
              return styles["next-faded-country"];
            if ($class === styles["next-faded-country"])
              return styles["next-country"];
            if ($class === styles["next-country"])
              return styles["current-country"];
            return $class;
          });

        // index array
        const leftCurrentCountryIndex =
          state.cardClasses.currentCountryIndex.map((ind) => {
            const $index =
              ind + 1 > state.currentFetchedCountryIndex + 2
                ? state.currentFetchedCountryIndex - 2
                : ind + 1;
            return $index - 1;
          });

        const leftFetchedCountryIndex = state.currentFetchedCountryIndex - 1;
        return deepClone({
          ...state,
          currentFetchedCountryIndex: leftFetchedCountryIndex,
          cardClasses: {
            currentCountryIndex: leftCurrentCountryIndex,
            countryCardsClasses: leftCountryCardsClasses,
            $countryCardsClasses: leftCountryCardsClasses,
          },
        });

      case "SHIFT_CLASSES_RIGHT":
        //classes
        //TODO too imperative
        const rightCountryCardsClasses =
          state.cardClasses.$countryCardsClasses.map(($class) => {
            if ($class === styles["current-country"])
              return styles["next-country"];
            if ($class === styles["prev-country"])
              return styles["current-country"];
            if ($class === styles["prev-faded-country"])
              return styles["prev-country"];
            if ($class === styles["next-faded-country"])
              return styles["prev-faded-country"];
            if ($class === styles["next-country"])
              return styles["next-faded-country"];
            return $class;
          });

        // index array
        const rightCurrentCountryIndex =
          state.cardClasses.currentCountryIndex.map((ind) => {
            const $index =
              ind - 1 < state.currentFetchedCountryIndex - 2
                ? state.currentFetchedCountryIndex + 2
                : ind - 1;
            return $index + 1;
          });

        const rightFetchedCountryIndex = state.currentFetchedCountryIndex + 1;
        return deepClone({
          ...state,
          currentFetchedCountryIndex: rightFetchedCountryIndex,
          cardClasses: {
            currentCountryIndex: rightCurrentCountryIndex,
            countryCardsClasses: rightCountryCardsClasses,
            $countryCardsClasses: rightCountryCardsClasses,
          },
        });

      default:
        return deepClone({ ...state });
    }
  };

  console.log(fetchedCountriesList);

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
      countryCardsClasses: countryCardsClasses.slice(),
      // a duplicate array that is not polluted by animation classes
      $countryCardsClasses: countryCardsClasses.slice(),
    },

    numberOfGuessedCountries: 0,
    guessAnimation: "",
  };

  const [quizGameState, dispatchQuizGameState] = useReducer(
    quizGameStateReducer,
    quizGameInitialState
  );

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

      dispatch(
        quizzesActions.onGuessSuccess(quizGameState.currentFetchedCountryIndex)
      );

      dispatchQuizGameState({ type: "INCREMENT_GUESS" });

      //? find a way
      inputGuess.current.value = "";

      //Guard Clause
      if (
        !fetchedCountriesList.at(quizGameState.currentFetchedCountryIndex - 1)
          .name
      ) {
        return;
      }
      fetchNextCountry();
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
    // Guard Clause
    if (
      !fetchedCountriesList.at(quizGameState.currentFetchedCountryIndex - 1)
        .name
    ) {
      return;
    }

    dispatchQuizGameState({ type: "SHIFT_CLASSES_LEFT" });
    fetchNextCountry();
  };

  const rightArrowClickHandler = () => {
    // Guard Clause
    if (
      !fetchedCountriesList.at(quizGameState.currentFetchedCountryIndex + 1)
        .name
    ) {
      return;
    }

    dispatchQuizGameState({ type: "SHIFT_CLASSES_RIGHT" });
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
