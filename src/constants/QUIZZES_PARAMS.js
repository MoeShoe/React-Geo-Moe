import COUNTRY_NAMES_LIST from "./COUNTRY_NAMES_LIST";

const RELAXED_QUIZ_PARAMS = {
  numberOfCountries: 50,
  time: 300, // in seconds
  lives: Infinity,
  onlyUN: true, // only include countries that are members or obsersver states in the UN, therefore no territories included.
};

const CHALLENGE_QUIZ_PARAMS = {
  numberOfCountries: 192,
  time: 600,
  lives: 5,
  onlyUN: true,
};

const HARDCORE_QUIZ_PARAMS = {
  numberOfCountries: COUNTRY_NAMES_LIST.length, // 252 including territories
  time: 900,
  lives: 3,
  onlyUN: false, // territories included
};

export { RELAXED_QUIZ_PARAMS, CHALLENGE_QUIZ_PARAMS, HARDCORE_QUIZ_PARAMS };
