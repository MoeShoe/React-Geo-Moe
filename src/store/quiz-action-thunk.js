import { quizzesActions } from "./quizzes-slice";
import { uiActions } from "./UI-slice";

const getQuizCountry =
  (country, position = "nextFadedCountry") =>
  async (dispatch) => {
    try {
      const initialFetch = await fetch(
        `https://restcountries.com/v3.1/name/${country.official}?fields=flags`
      );

      if (!initialFetch.ok) throw new Error();

      const [data] = await initialFetch.json();

      const formattedData = {
        position,
        countryData: { name: country.common, flag: data.flags.svg },
      };

      dispatch(quizzesActions.setCountryPosition(formattedData));

      if (position.includes("next"))
        dispatch(
          quizzesActions.updateNextPrevCountries({
            country: formattedData.countryData,
            arr: position,
          })
        );
    } catch (_) {
      dispatch(uiActions.setError("You appear to be offline"));
    }
  };

export default getQuizCountry;
