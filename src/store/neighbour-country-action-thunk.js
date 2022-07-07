const fetchNeighbouringCountries = (borderCountries) => async () => {
  try {
    let apiEndPoint = "https://restcountries.com/v3.1/alpha?codes=";

    borderCountries.forEach((con, i, arr) => {
      apiEndPoint += `${con}${
        arr.length - i !== 1 ? "," : "&fields=name,flag,unMember"
      }`;
    });

    const initialFetch = await fetch(apiEndPoint);
    const data = await initialFetch.json();

    console.log(data);

    const neighbourCountriesData = data.filter(
      (con) =>
        con.unMember ||
        NON_UN_MEMBERS_SOVEREIGN_STATES.includes(con.name.official)
    );

    console.log(apiEndPoint);
    console.log(neighbourCountriesData);
  } catch (err) {
    console.error(err);
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
