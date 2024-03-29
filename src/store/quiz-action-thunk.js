import { quizzesActions } from "./quizzes-slice";
import { uiActions } from "./UI-slice";

const getQuizCountry = (country, position) => async (dispatch) => {
  try {
    const initialFetch = await fetch(
      `https://restcountries.com/v3.1/name/${country.official}?fields=flags,name`
    );

    if (!initialFetch.ok) throw new Error();

    let data = await initialFetch.json();

    if (data.length !== 1)
      data = data.filter((con) => con.name.official === country.official);

    dispatch(
      quizzesActions.setCountryPosition({
        country: { name: country.common, flag: data.at(0).flags.svg },
        arr: position,
      })
    );
  } catch (_) {
    dispatch(uiActions.setError("You appear to be offline!"));
  }
};

export default getQuizCountry;
