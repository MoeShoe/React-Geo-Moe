const COUNTRY_NAMES_LIST = [
  {
    common: "Cyprus",
    official: "Republic of Cyprus",
    isUN: true,
  },
  {
    common: ["Macedonia", "North Macedonia"],
    official: "Republic of North Macedonia",
    isUN: true,
  },
  {
    common: "Yemen",
    official: "Republic of Yemen",
    isUN: true,
  },
  {
    common: "Sint Maarten",
    official: "Sint Maarten",
    isUN: false,
  },
  {
    common: "Macau",
    official:
      "Macao Special Administrative Region of the People's Republic of China",
    isUN: false,
  },
  {
    common: "Niger",
    official: "Republic of Niger",
    isUN: true,
  },
  {
    common: "Nigeria",
    official: "Federal Republic of Nigeria",
    isUN: true,
  },
  {
    common: "Somalia",
    official: "Federal Republic of Somalia",
    isUN: true,
  },
  {
    common: "Myanmar",
    official: "Republic of the Union of Myanmar",
    isUN: true,
  },
  {
    common: "Liberia",
    official: "Republic of Liberia",
    isUN: true,
  },
  {
    common: "Dominican Republic",
    official: "Dominican Republic",
    isUN: true,
  },
  {
    common: "Dominica",
    official: "Commonwealth of Dominica",
    isUN: true,
  },
  {
    common: "Saint Kitts and Nevis",
    official: "Federation of Saint Christopher and Nevis",
    isUN: true,
  },
  {
    common: "North Korea",
    official: "Democratic People's Republic of Korea",
    isUN: true,
  },
  {
    common: "Saudi Arabia",
    official: "Kingdom of Saudi Arabia",
    isUN: true,
  },
  {
    common: "Nepal",
    official: "Federal Democratic Republic of Nepal",
    isUN: true,
  },
  {
    common: "Venezuela",
    official: "Bolivarian Republic of Venezuela",
    isUN: true,
  },
  {
    common: "Guam",
    official: "Guam",
    isUN: false,
  },
  {
    common: "Bermuda",
    official: "Bermuda",
    isUN: false,
  },
  {
    common: "Kenya",
    official: "Republic of Kenya",
    isUN: true,
  },
  {
    common: "Cameroon",
    official: "Republic of Cameroon",
    isUN: true,
  },
  {
    common: "Rwanda",
    official: "Republic of Rwanda",
    isUN: true,
  },
  {
    common: "Mauritania",
    official: "Islamic Republic of Mauritania",
    isUN: true,
  },
  {
    common: "New Caledonia",
    official: "New Caledonia",
    isUN: false,
  },
  {
    common: "Fiji",
    official: "Republic of Fiji",
    isUN: true,
  },
  {
    common: "Argentina",
    official: "Argentine Republic",
    isUN: true,
  },
  {
    common: "Brunei",
    official: "Nation of Brunei, Abode of Peace",
    isUN: true,
  },
  {
    common: "Nicaragua",
    official: "Republic of Nicaragua",
    isUN: true,
  },
  {
    common: ["United Kingdom", "UK"],
    official: "United Kingdom of Great Britain and Northern Ireland",
    isUN: true,
  },
  {
    common: "Laos",
    official: "Lao People's Democratic Republic",
    isUN: true,
  },
  {
    common: "Marshall Islands",
    official: "Republic of the Marshall Islands",
    isUN: true,
  },
  {
    common: ["Ukraine", "The Ukraine"],
    official: "Ukraine",
    isUN: true,
  },
  {
    common: "Isle of Man",
    official: "Isle of Man",
    isUN: false,
  },
  {
    common: "Kuwait",
    official: "State of Kuwait",
    isUN: true,
  },
  {
    common: "Antigua and Barbuda",
    official: "Antigua and Barbuda",
    isUN: true,
  },
  {
    common: ["Netherlands", "Holland"],
    official: "Kingdom of the Netherlands",
    isUN: true,
  },
  {
    common: "Palau",
    official: "Republic of Palau",
    isUN: true,
  },
  {
    common: "New Zealand",
    official: "New Zealand",
    isUN: true,
  },
  {
    common: ["Congo", "Republic of the Congo"],
    official: "Republic of the Congo",
    isUN: true,
  },
  {
    common: ["Virgin Islands", "British Virgin Islands"],
    official: "Virgin Islands",
    isUN: false,
  },
  {
    common: "Bahrain",
    official: "Kingdom of Bahrain",
    isUN: true,
  },
  {
    common: "Bolivia",
    official: "Plurinational State of Bolivia",
    isUN: true,
  },
  {
    common: "Togo",
    official: "Togolese Republic",
    isUN: true,
  },
  {
    common: "Uzbekistan",
    official: "Republic of Uzbekistan",
    isUN: true,
  },
  {
    common: "Bahamas",
    official: "Commonwealth of the Bahamas",
    isUN: true,
  },
  {
    common: "Mali",
    official: "Republic of Mali",
    isUN: true,
  },
  {
    common: "Maldives",
    official: "Republic of the Maldives",
    isUN: true,
  },
  {
    common: "Turkmenistan",
    official: "Turkmenistan",
    isUN: true,
  },
  {
    common: "Uruguay",
    official: "Oriental Republic of Uruguay",
    isUN: true,
  },
  {
    common: "Bulgaria",
    official: "Republic of Bulgaria",
    isUN: true,
  },
  {
    common: "Lesotho",
    official: "Kingdom of Lesotho",
    isUN: true,
  },
  {
    common: "Saint Pierre and Miquelon",
    official: "Saint Pierre and Miquelon",
    isUN: false,
  },
  {
    common: "Cuba",
    official: "Republic of Cuba",
    isUN: true,
  },
  {
    common: "Haiti",
    official: "Republic of Haiti",
    isUN: true,
  },
  {
    common: "Malta",
    official: "Republic of Malta",
    isUN: true,
  },
  {
    common: "Tonga",
    official: "Kingdom of Tonga",
    isUN: true,
  },
  {
    common: "Falkland Islands",
    official: "Falkland Islands",
    isUN: false,
  },
  {
    common: "Ethiopia",
    official: "Federal Democratic Republic of Ethiopia",
    isUN: true,
  },
  {
    common: "South Sudan",
    official: "Republic of South Sudan",
    isUN: true,
  },
  {
    common: "Tunisia",
    official: "Tunisian Republic",
    isUN: true,
  },
  {
    common: "Puerto Rico",
    official: "Commonwealth of Puerto Rico",
    isUN: false,
  },
  {
    common: "Ecuador",
    official: "Republic of Ecuador",
    isUN: true,
  },
  {
    common: ["Cape Verde", "Cabo Verde"],
    official: "Republic of Cabo Verde",
    isUN: true,
  },
  {
    common: "Monaco",
    official: "Principality of Monaco",
    isUN: true,
  },
  {
    common: "Tajikistan",
    official: "Republic of Tajikistan",
    isUN: true,
  },
  {
    common: "Botswana",
    official: "Republic of Botswana",
    isUN: true,
  },
  {
    common: "Bouvet Island",
    official: "Bouvet Island",
    isUN: false,
  },
  {
    common: "Indonesia",
    official: "Republic of Indonesia",
    isUN: true,
  },
  {
    common: "Estonia",
    official: "Republic of Estonia",
    isUN: true,
  },
  {
    common: "Qatar",
    official: "State of Qatar",
    isUN: true,
  },
  {
    common: "Cayman Islands",
    official: "Cayman Islands",
    isUN: false,
  },
  {
    common: "Croatia",
    official: "Republic of Croatia",
    isUN: true,
  },
  {
    common: "Zambia",
    official: "Republic of Zambia",
    isUN: true,
  },
  {
    common: "Guadeloupe",
    official: "Guadeloupe",
    isUN: false,
  },
  {
    common: "Romania",
    official: "Romania",
    isUN: true,
  },
  {
    common: "Faroe Islands",
    official: "Faroe Islands",
    isUN: false,
  },
  {
    common: "Moldova",
    official: "Republic of Moldova",
    isUN: true,
  },
  {
    common: "Niue",
    official: "Niue",
    isUN: false,
  },
  {
    common: "Wallis and Futuna",
    official: "Territory of the Wallis and Futuna Islands",
    isUN: false,
  },
  {
    common: "Pitcairn Islands",
    official: "Pitcairn Group of Islands",
    isUN: false,
  },
  {
    common: "Barbados",
    official: "Barbados",
    isUN: true,
  },
  {
    common: "Bosnia and Herzegovina",
    official: "Bosnia and Herzegovina",
    isUN: true,
  },
  {
    common: "South Korea",
    official: "Republic of Korea",
    isUN: true,
  },
  {
    common: "Burkina Faso",
    official: "Burkina Faso",
    isUN: true,
  },
  {
    common: "El Salvador",
    official: "Republic of El Salvador",
    isUN: true,
  },
  {
    common: "Syria",
    official: "Syrian Arab Republic",
    isUN: true,
  },
  {
    common: "Colombia",
    official: "Republic of Colombia",
    isUN: true,
  },
  {
    common: "Bangladesh",
    official: "People's Republic of Bangladesh",
    isUN: true,
  },
  {
    common: "Martinique",
    official: "Martinique",
    isUN: false,
  },
  {
    common: "Micronesia",
    official: "Federated States of Micronesia",
    isUN: true,
  },
  {
    common: "Sweden",
    official: "Kingdom of Sweden",
    isUN: true,
  },
  {
    common: "Hungary",
    official: "Hungary",
    isUN: true,
  },
  {
    common: "French Southern and Antarctic Lands",
    official: "Territory of the French Southern and Antarctic Lands",
    isUN: false,
  },
  {
    common: "Nauru",
    official: "Republic of Nauru",
    isUN: true,
  },
  {
    common: "Iraq",
    official: "Republic of Iraq",
    isUN: true,
  },
  {
    common: "Poland",
    official: "Republic of Poland",
    isUN: true,
  },
  {
    common: "Greece",
    official: "Hellenic Republic",
    isUN: true,
  },
  {
    common: "Tanzania",
    official: "United Republic of Tanzania",
    isUN: true,
  },
  {
    common: "Morocco",
    official: "Kingdom of Morocco",
    isUN: true,
  },
  {
    common: "Liechtenstein",
    official: "Principality of Liechtenstein",
    isUN: true,
  },
  {
    common: ["Timor-Leste", "East Timor"],
    official: "Democratic Republic of Timor-Leste",
    isUN: true,
  },
  {
    common: "Eritrea",
    official: "State of Eritrea",
    isUN: true,
  },
  {
    common: "Mayotte",
    official: "Department of Mayotte",
    isUN: false,
  },
  {
    common: "France",
    official: "French Republic",
    isUN: true,
  },
  {
    common: "Honduras",
    official: "Republic of Honduras",
    isUN: true,
  },
  {
    common: "Samoa",
    official: "Independent State of Samoa",
    isUN: true,
  },
  {
    common: "Greenland",
    official: "Greenland",
    isUN: false,
  },
  {
    common: "Kosovo",
    official: "Republic of Kosovo",
    isUN: false,
  },
  {
    common: "Anguilla",
    official: "Anguilla",
    isUN: false,
  },
  {
    common: "Serbia",
    official: "Republic of Serbia",
    isUN: true,
  },
  {
    common: "Slovakia",
    official: "Slovak Republic",
    isUN: true,
  },
  {
    common: "Heard Island and McDonald Islands",
    official: "Heard Island and McDonald Islands",
    isUN: false,
  },
  {
    common: "Kiribati",
    official: "Independent and Sovereign Republic of Kiribati",
    isUN: true,
  },
  {
    common: "Montserrat",
    official: "Montserrat",
    isUN: false,
  },
  {
    common: "Spain",
    official: "Kingdom of Spain",
    isUN: true,
  },
  {
    common: "Belize",
    official: "Belize",
    isUN: true,
  },
  {
    common: "Seychelles",
    official: "Republic of Seychelles",
    isUN: true,
  },
  {
    common: "Western Sahara",
    official: "Sahrawi Arab Democratic Republic",
    isUN: false,
  },
  {
    common: "Gibraltar",
    official: "Gibraltar",
    isUN: false,
  },
  {
    common: "Thailand",
    official: "Kingdom of Thailand",
    isUN: true,
  },
  {
    common: "Vietnam",
    official: "Socialist Republic of Vietnam",
    isUN: true,
  },
  {
    common: "Saint Helena, Ascension and Tristan da Cunha",
    official: "Saint Helena, Ascension and Tristan da Cunha",
    isUN: false,
  },
  {
    common: "Austria",
    official: "Republic of Austria",
    isUN: true,
  },
  {
    common: ["Saint Vincent and the Grenadines", "Saint Vincent"],
    official: "Saint Vincent and the Grenadines",
    isUN: true,
  },
  {
    common: "Andorra",
    official: "Principality of Andorra",
    isUN: true,
  },
  {
    common: "Svalbard and Jan Mayen",
    official: "Svalbard og Jan Mayen",
    isUN: false,
  },
  {
    common: "Norfolk Island",
    official: "Territory of Norfolk Island",
    isUN: false,
  },
  {
    common: "Suriname",
    official: "Republic of Suriname",
    isUN: true,
  },
  {
    common: "Mongolia",
    official: "Mongolia",
    isUN: true,
  },
  {
    common: "Bhutan",
    official: "Kingdom of Bhutan",
    isUN: true,
  },
  {
    common: "Sierra Leone",
    official: "Republic of Sierra Leone",
    isUN: true,
  },
  {
    common: "Cambodia",
    official: "Kingdom of Cambodia",
    isUN: true,
  },
  {
    common: "Algeria",
    official: "People's Democratic Republic of Algeria",
    isUN: true,
  },
  {
    common: "Gabon",
    official: "Gabonese Republic",
    isUN: true,
  },
  {
    common: "Afghanistan",
    official: "Islamic Republic of Afghanistan",
    isUN: true,
  },
  {
    common: "Armenia",
    official: "Republic of Armenia",
    isUN: true,
  },
  {
    common: "Saint Lucia",
    official: "Saint Lucia",
    isUN: true,
  },
  {
    common: "Tuvalu",
    official: "Tuvalu",
    isUN: true,
  },
  {
    common: "Turks and Caicos Islands",
    official: "Turks and Caicos Islands",
    isUN: false,
  },
  {
    common: "Guinea",
    official: "Republic of Guinea",
    isUN: true,
  },
  {
    common: "Equatorial Guinea",
    official: "Republic of Equatorial Guinea",
    isUN: true,
  },
  {
    common: "Sudan",
    official: "Republic of the Sudan",
    isUN: true,
  },
  {
    common: "Antarctica",
    official: "Antarctica",
    isUN: false,
  },
  {
    common: ["São Tomé and Príncipe", "Sao Tome and Principe"],
    official: "Democratic Republic of São Tomé and Príncipe",
    isUN: true,
  },
  {
    common: "Slovenia",
    official: "Republic of Slovenia",
    isUN: true,
  },
  {
    common: "Hong Kong",
    official:
      "Hong Kong Special Administrative Region of the People's Republic of China",
    isUN: false,
  },
  {
    common: "Réunion",
    official: "Réunion Island",
    isUN: false,
  },
  {
    common: "Saint Martin",
    official: "Saint Martin",
    isUN: false,
  },
  {
    common: "Latvia",
    official: "Republic of Latvia",
    isUN: true,
  },
  {
    common: "French Guiana",
    official: "Guiana",
    isUN: false,
  },
  {
    common: "Pakistan",
    official: "Islamic Republic of Pakistan",
    isUN: true,
  },
  {
    common: "Azerbaijan",
    official: "Republic of Azerbaijan",
    isUN: true,
  },
  {
    common: "Comoros",
    official: "Union of the Comoros",
    isUN: true,
  },
  {
    common: "Oman",
    official: "Sultanate of Oman",
    isUN: true,
  },
  {
    common: "Senegal",
    official: "Republic of Senegal",
    isUN: true,
  },
  {
    common: ["United States", "USA", "US"],
    official: "United States of America",
    isUN: true,
  },
  {
    common: "United States Virgin Islands",
    official: "Virgin Islands of the United States",
    isUN: false,
  },
  {
    common: "Ghana",
    official: "Republic of Ghana",
    isUN: true,
  },
  {
    common: "Central African Republic",
    official: "Central African Republic",
    isUN: true,
  },
  {
    common: "South Georgia",
    official: "South Georgia and the South Sandwich Islands",
    isUN: false,
  },
  {
    common: "American Samoa",
    official: "American Samoa",
    isUN: false,
  },
  {
    common: "Israel",
    official: "State of Israel",
    isUN: true,
  },
  {
    common: "Zimbabwe",
    official: "Republic of Zimbabwe",
    isUN: true,
  },
  {
    common: "Burundi",
    official: "Republic of Burundi",
    isUN: true,
  },
  {
    common: "Guinea-Bissau",
    official: "Republic of Guinea-Bissau",
    isUN: true,
  },
  {
    common: "Malawi",
    official: "Republic of Malawi",
    isUN: true,
  },
  {
    common: "Panama",
    official: "Republic of Panama",
    isUN: true,
  },
  {
    common: "Madagascar",
    official: "Republic of Madagascar",
    isUN: true,
  },
  {
    common: "Georgia",
    official: "Georgia",
    isUN: true,
  },
  {
    common: "Portugal",
    official: "Portuguese Republic",
    isUN: true,
  },

  {
    common: "Cook Islands",
    official: "Cook Islands",
    isUN: false,
  },
  {
    common: "Iceland",
    official: "Iceland",
    isUN: true,
  },
  {
    common: "Chad",
    official: "Republic of Chad",
    isUN: true,
  },
  {
    common: "Turkey",
    official: "Republic of Turkey",
    isUN: true,
  },
  {
    common: "Christmas Island",
    official: "Territory of Christmas Island",
    isUN: false,
  },
  {
    common: "Costa Rica",
    official: "Republic of Costa Rica",
    isUN: true,
  },
  {
    common: "Lithuania",
    official: "Republic of Lithuania",
    isUN: true,
  },
  {
    common: "Cocos (Keeling) Islands",
    official: "Territory of the Cocos (Keeling) Islands",
    isUN: false,
  },
  {
    common: "India",
    official: "Republic of India",
    isUN: true,
  },
  {
    common: "Egypt",
    official: "Arab Republic of Egypt",
    isUN: true,
  },
  {
    common: "Jersey",
    official: "Bailiwick of Jersey",
    isUN: false,
  },
  {
    common: ["Vatican City", "Vatican"],
    official: "Vatican City State",
    isUN: true,
  },
  {
    common: "South Africa",
    official: "Republic of South Africa",
    isUN: true,
  },
  {
    common: "Jamaica",
    official: "Jamaica",
    isUN: true,
  },
  {
    common: "Brazil",
    official: "Federative Republic of Brazil",
    isUN: true,
  },
  {
    common: "Denmark",
    official: "Kingdom of Denmark",
    isUN: true,
  },
  {
    common: "Belgium",
    official: "Kingdom of Belgium",
    isUN: true,
  },
  {
    common: "Paraguay",
    official: "Republic of Paraguay",
    isUN: true,
  },
  {
    common: "Kazakhstan",
    official: "Republic of Kazakhstan",
    isUN: true,
  },
  {
    common: "Namibia",
    official: "Republic of Namibia",
    isUN: true,
  },
  {
    common: "Ivory Coast",
    official: "Republic of Côte d'Ivoire",
    isUN: true,
  },
  {
    common: "Mauritius",
    official: "Republic of Mauritius",
    isUN: true,
  },
  {
    common: "Palestine",
    official: "State of Palestine",
    isUN: true,
  },
  {
    common: "Montenegro",
    official: "Montenegro",
    isUN: true,
  },
  {
    common: "British Indian Ocean Territory",
    official: "British Indian Ocean Territory",
    isUN: false,
  },
  {
    common: "Malaysia",
    official: "Malaysia",
    isUN: true,
  },
  {
    common: "Djibouti",
    official: "Republic of Djibouti",
    isUN: true,
  },
  {
    common: "Solomon Islands",
    official: "Solomon Islands",
    isUN: true,
  },
  {
    common: "Guyana",
    official: "Co-operative Republic of Guyana",
    isUN: true,
  },
  {
    common: "Curaçao",
    official: "Country of Curaçao",
    isUN: false,
  },
  {
    common: "Kyrgyzstan",
    official: "Kyrgyz Republic",
    isUN: true,
  },
  {
    common: "Philippines",
    official: "Republic of the Philippines",
    isUN: true,
  },
  {
    common: "Papua New Guinea",
    official: "Independent State of Papua New Guinea",
    isUN: true,
  },
  {
    common: "Trinidad and Tobago",
    official: "Republic of Trinidad and Tobago",
    isUN: true,
  },
  {
    common: "Libya",
    official: "State of Libya",
    isUN: true,
  },
  {
    common: "Aruba",
    official: "Aruba",
    isUN: false,
  },
  {
    common: "Russia",
    official: "Russian Federation",
    isUN: true,
  },
  {
    common: "Germany",
    official: "Federal Republic of Germany",
    isUN: true,
  },
  {
    common: "Grenada",
    official: "Grenada",
    isUN: true,
  },
  {
    common: "Canada",
    official: "Canada",
    isUN: true,
  },
  {
    common: "French Polynesia",
    official: "French Polynesia",
    isUN: false,
  },
  {
    common: "Eswatini",
    official: "Kingdom of Eswatini",
    isUN: true,
  },
  {
    common: "Iran",
    official: "Islamic Republic of Iran",
    isUN: true,
  },
  {
    common: "Japan",
    official: "Japan",
    isUN: true,
  },
  {
    common: ["China", "PRC"],
    official: "People's Republic of China",
    isUN: true,
  },
  {
    common: "Saint Barthélemy",
    official: "Collectivity of Saint Barthélemy",
    isUN: false,
  },
  {
    common: "Angola",
    official: "Republic of Angola",
    isUN: true,
  },
  {
    common: "Ireland",
    official: "Republic of Ireland",
    isUN: true,
  },
  {
    common: "Norway",
    official: "Kingdom of Norway",
    isUN: true,
  },
  {
    common: "Mozambique",
    official: "Republic of Mozambique",
    isUN: true,
  },
  {
    common: "Jordan",
    official: "Hashemite Kingdom of Jordan",
    isUN: true,
  },
  {
    common: ["Gambia", "The Gambia"],
    official: "Republic of the Gambia",
    isUN: true,
  },
  {
    common: "Singapore",
    official: "Republic of Singapore",
    isUN: true,
  },
  {
    common: "San Marino",
    official: "Republic of San Marino",
    isUN: true,
  },
  {
    common: "Chile",
    official: "Republic of Chile",
    isUN: true,
  },
  {
    common: "United States Minor Outlying Islands",
    official: "United States Minor Outlying Islands",
    isUN: false,
  },
  {
    common: "Benin",
    official: "Republic of Benin",
    isUN: true,
  },
  {
    common: "Sri Lanka",
    official: "Democratic Socialist Republic of Sri Lanka",
    isUN: true,
  },
  {
    common: "Belarus",
    official: "Republic of Belarus",
    isUN: true,
  },
  {
    common: "Caribbean Netherlands",
    official: "Bonaire, Sint Eustatius and Saba",
    isUN: false,
  },
  {
    common: "Peru",
    official: "Republic of Peru",
    isUN: true,
  },
  {
    common: "Guernsey",
    official: "Bailiwick of Guernsey",
    isUN: false,
  },
  {
    common: "Aland Islands",
    official: "Åland Islands",
    isUN: false,
  },

  {
    common: "Tokelau",
    official: "Tokelau",
    isUN: false,
  },
  {
    common: ["United Arab Emirates", "UAE"],
    official: "United Arab Emirates",
    isUN: true,
  },
  {
    common: "Australia",
    official: "Commonwealth of Australia",
    isUN: true,
  },
  {
    common: "Guatemala",
    official: "Republic of Guatemala",
    isUN: true,
  },
  {
    common: "Lebanon",
    official: "Lebanese Republic",
    isUN: true,
  },
  {
    common: "Luxembourg",
    official: "Grand Duchy of Luxembourg",
    isUN: true,
  },
  {
    common: "Albania",
    official: "Republic of Albania",
    isUN: true,
  },
  {
    common: "Vanuatu",
    official: "Republic of Vanuatu",
    isUN: true,
  },
  {
    common: [
      "Democratic Republic of the Congo",
      "Democratic Republic of Congo",
    ],
    official: "Democratic Republic of the Congo",
    isUN: true,
  },
  {
    common: "Northern Mariana Islands",
    official: "Commonwealth of the Northern Mariana Islands",
    isUN: false,
  },
  {
    common: ["Czechia", "Czech Republic"],
    official: "Czech Republic",
    isUN: true,
  },
  {
    common: "Italy",
    official: "Italian Republic",
    isUN: true,
  },
  {
    common: "Uganda",
    official: "Republic of Uganda",
    isUN: true,
  },
  {
    common: "Switzerland",
    official: "Swiss Confederation",
    isUN: true,
  },
  {
    common: "Mexico",
    official: "United Mexican States",
    isUN: true,
  },
  {
    common: "Taiwan",
    official: "Republic of China (Taiwan)",
    isUN: false,
  },
  {
    common: "Finland",
    official: "Republic of Finland",
    isUN: true,
  },
];

export default COUNTRY_NAMES_LIST;
