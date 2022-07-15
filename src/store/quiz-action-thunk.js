import { quizzesActions } from "./quizzes-slice";
import { uiActions } from "./UI-slice";

const getQuizCountry = (country, position) => async (dispatch) => {
  try {
    const initialFetch = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fields=flags`
    );

    if (!initialFetch.ok) throw new Error();

    const [data] = await initialFetch.json();

    const formattedData = {
      position,
      countryData: { name: country, flag: data.flags.svg },
    };

    dispatch(quizzesActions.setCountryPosition(formattedData));
  } catch (_) {
    dispatch(uiActions.setError("You appear to be offline"));
  }
};

export default getQuizCountry;
