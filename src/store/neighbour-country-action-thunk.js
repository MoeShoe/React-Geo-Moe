import { neighbourCountriesActions } from "./neighbour-countries-slice";
import { uiActions } from "./UI-slice";

const fetchNeighbouringCountries = (borderCountries) => async (dispatch) => {
  try {
    dispatch(uiActions.setNeighboursAreLoading(true));
    if (borderCountries.length === 0) {
      dispatch(neighbourCountriesActions.setNeighbouringCountries([]));
      return;
    }

    let apiEndPoint = "https://restcountries.com/v3.1/alpha?codes=";

    borderCountries.forEach((con, i, arr) => {
      apiEndPoint += `${con}${
        arr.length - i !== 1 ? "," : "&fields=name,flags,unMember"
      }`;
    });

    const initialFetch = await fetch(apiEndPoint);
    if (!initialFetch.ok) throw new Error("NEIGHBOUR_ERROR");
    const data = await initialFetch.json();

    // filter the list to only sovereign? states (so it would match official lists)
    const neighbourCountriesData = data.filter(
      (con) =>
        con.unMember ||
        NON_UN_MEMBERS_SOVEREIGN_STATES.includes(con.name.official)
    );

    //dispatch the list
    dispatch(
      neighbourCountriesActions.setNeighbouringCountries(neighbourCountriesData)
    );
  } catch (err) {
    // Error handling
    if (err.message === "NEIGHBOUR_ERROR") {
      dispatch(
        uiActions.setError(
          "Something went wrong with fetching neighbouring countries!"
        )
      );
      return;
    }
    //Generic error handling
    dispatch(
      uiActions.setError(
        "Something went wrong with the neighbouring countries!"
      )
    );
  } finally {
    dispatch(uiActions.setNeighboursAreLoading(false));
  }
};

export default fetchNeighbouringCountries;

/* this is not meant to reflect any of my political views as a developer,
 i made this project with complete objectivity in mind. this was listed according to Wikipedia*/
const NON_UN_MEMBERS_SOVEREIGN_STATES = [
  "State of Palestine",
  "Republic of Kosovo",
  "Republic of China (Taiwan)",
];
