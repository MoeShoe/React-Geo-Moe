import { quizzesActions } from "./quizzes-slice";
import { uiActions } from "./UI-slice";

const getQuizCountry = (country, position) => async (dispatch) => {
  try {
    const initialFetch = await fetch(
      `https://restcountries.com/v3.1/name/${country.official}?fields=flags,name`
    );

    if (!initialFetch.ok) throw new Error();

    let data = await initialFetch.json();

    console.log(data);

    if (data.length !== 1)
      data = data.filter((con) => con.name.official === country.official);

    const formattedData = {
      position,
      countryData: { name: country.common, flag: data.at(0).flags.svg },
    };

    dispatch(quizzesActions.setCountryPosition(formattedData));

    dispatch(
      quizzesActions.setCountryPosition({
        country: formattedData.countryData,
        arr: position,
      })
    );
  } catch (_) {
    dispatch(uiActions.setError("You appear to be offline!"));
  }
};

export default getQuizCountry;
