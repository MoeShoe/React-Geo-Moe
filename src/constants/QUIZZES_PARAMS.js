import COUNTRY_NAMES_LIST from "./COUNTRY_NAMES_LIST";

const RELAXED_QUIZ_PARAMS = {
  name: "Relaxed",
  numberOfCountries: 50,
  time: 300 * 1_000, // in milliseconds
  lives: Infinity,
  onlyUN: true, // only include countries that are members or obsersver states in the UN, therefore no territories included.
};

const CHALLENGE_QUIZ_PARAMS = {
  name: "Challenge",
  numberOfCountries: COUNTRY_NAMES_LIST.filter((con) => con.isUN).length,
  time: 600 * 1_000,
  lives: 5,
  onlyUN: true,
};

const HARDCORE_QUIZ_PARAMS = {
  name: "Hardcore",
  numberOfCountries: COUNTRY_NAMES_LIST.length, // 252 including territories
  time: 900 * 1_000,
  lives: 10,
  onlyUN: false, // non UN members (only countries that are widely recognized to some extent) and territories included
};

export { RELAXED_QUIZ_PARAMS, CHALLENGE_QUIZ_PARAMS, HARDCORE_QUIZ_PARAMS };
