const COUNTRY_NAMES_LIST = [
  {
    common: "Cyprus",
    official: "Republic of Cyprus",
  },
  {
    common: "North Macedonia",
    official: "Republic of North Macedonia",
  },
  {
    common: "Yemen",
    official: "Republic of Yemen",
  },
  {
    common: "Sint Maarten",
    official: "Sint Maarten",
  },
  {
    common: "Macau",
    official:
      "Macao Special Administrative Region of the People's Republic of China",
  },
  {
    common: "Niger",
    official: "Republic of Niger",
  },
  {
    common: "Nigeria",
    official: "Federal Republic of Nigeria",
  },
  {
    common: "Somalia",
    official: "Federal Republic of Somalia",
  },
  {
    common: "Myanmar",
    official: "Republic of the Union of Myanmar",
  },
  {
    common: "Liberia",
    official: "Republic of Liberia",
  },
  {
    common: "Dominica",
    official: "Commonwealth of Dominica",
  },
  {
    common: "Saint Kitts and Nevis",
    official: "Federation of Saint Christopher and Nevis",
  },
  {
    common: "North Korea",
    official: "Democratic People's Republic of Korea",
  },
  {
    common: "Saudi Arabia",
    official: "Kingdom of Saudi Arabia",
  },
  {
    common: "Nepal",
    official: "Federal Democratic Republic of Nepal",
  },
  {
    common: "Venezuela",
    official: "Bolivarian Republic of Venezuela",
  },
  {
    common: "Guam",
    official: "Guam",
  },
  {
    common: "Bermuda",
    official: "Bermuda",
  },
  {
    common: "Kenya",
    official: "Republic of Kenya",
  },
  {
    common: "Cameroon",
    official: "Republic of Cameroon",
  },
  {
    common: "Rwanda",
    official: "Republic of Rwanda",
  },
  {
    common: "Mauritania",
    official: "Islamic Republic of Mauritania",
  },
  {
    common: "New Caledonia",
    official: "New Caledonia",
  },
  {
    common: "Fiji",
    official: "Republic of Fiji",
  },
  {
    common: "Argentina",
    official: "Argentine Republic",
  },
  {
    common: "Brunei",
    official: "Nation of Brunei, Abode of Peace",
  },
  {
    common: "Nicaragua",
    official: "Republic of Nicaragua",
  },
  {
    common: "United Kingdom",
    official: "United Kingdom of Great Britain and Northern Ireland",
  },
  {
    common: "Laos",
    official: "Lao People's Democratic Republic",
  },
  {
    common: "Marshall Islands",
    official: "Republic of the Marshall Islands",
  },
  {
    common: "Ukraine",
    official: "Ukraine",
  },
  {
    common: "Isle of Man",
    official: "Isle of Man",
  },
  {
    common: "Kuwait",
    official: "State of Kuwait",
  },
  {
    common: "Antigua and Barbuda",
    official: "Antigua and Barbuda",
  },
  {
    common: "Netherlands",
    official: "Kingdom of the Netherlands",
  },
  {
    common: "Palau",
    official: "Republic of Palau",
  },
  {
    common: "New Zealand",
    official: "New Zealand",
  },
  {
    common: "Republic of the Congo",
    official: "Republic of the Congo",
  },
  {
    common: "British Virgin Islands",
    official: "Virgin Islands",
  },
  {
    common: "Bahrain",
    official: "Kingdom of Bahrain",
  },
  {
    common: "Bolivia",
    official: "Plurinational State of Bolivia",
  },
  {
    common: "Togo",
    official: "Togolese Republic",
  },
  {
    common: "Uzbekistan",
    official: "Republic of Uzbekistan",
  },
  {
    common: "Bahamas",
    official: "Commonwealth of the Bahamas",
  },
  {
    common: "Mali",
    official: "Republic of Mali",
  },
  {
    common: "Maldives",
    official: "Republic of the Maldives",
  },
  {
    common: "Turkmenistan",
    official: "Turkmenistan",
  },
  {
    common: "Uruguay",
    official: "Oriental Republic of Uruguay",
  },
  {
    common: "Bulgaria",
    official: "Republic of Bulgaria",
  },
  {
    common: "Lesotho",
    official: "Kingdom of Lesotho",
  },
  {
    common: "Saint Pierre and Miquelon",
    official: "Saint Pierre and Miquelon",
  },
  {
    common: "Cuba",
    official: "Republic of Cuba",
  },
  {
    common: "Haiti",
    official: "Republic of Haiti",
  },
  {
    common: "Malta",
    official: "Republic of Malta",
  },
  {
    common: "Tonga",
    official: "Kingdom of Tonga",
  },
  {
    common: "Falkland Islands",
    official: "Falkland Islands",
  },
  {
    common: "Ethiopia",
    official: "Federal Democratic Republic of Ethiopia",
  },
  {
    common: "South Sudan",
    official: "Republic of South Sudan",
  },
  {
    common: "Tunisia",
    official: "Tunisian Republic",
  },
  {
    common: "Puerto Rico",
    official: "Commonwealth of Puerto Rico",
  },
  {
    common: "Ecuador",
    official: "Republic of Ecuador",
  },
  {
    common: "Cape Verde",
    official: "Republic of Cabo Verde",
  },
  {
    common: "Monaco",
    official: "Principality of Monaco",
  },
  {
    common: "Tajikistan",
    official: "Republic of Tajikistan",
  },
  {
    common: "Botswana",
    official: "Republic of Botswana",
  },
  {
    common: "Bouvet Island",
    official: "Bouvet Island",
  },
  {
    common: "Indonesia",
    official: "Republic of Indonesia",
  },
  {
    common: "Estonia",
    official: "Republic of Estonia",
  },
  {
    common: "Qatar",
    official: "State of Qatar",
  },
  {
    common: "Cayman Islands",
    official: "Cayman Islands",
  },
  {
    common: "Croatia",
    official: "Republic of Croatia",
  },
  {
    common: "Zambia",
    official: "Republic of Zambia",
  },
  {
    common: "Guadeloupe",
    official: "Guadeloupe",
  },
  {
    common: "Romania",
    official: "Romania",
  },
  {
    common: "Faroe Islands",
    official: "Faroe Islands",
  },
  {
    common: "Moldova",
    official: "Republic of Moldova",
  },
  {
    common: "Niue",
    official: "Niue",
  },
  {
    common: "Wallis and Futuna",
    official: "Territory of the Wallis and Futuna Islands",
  },
  {
    common: "Pitcairn Islands",
    official: "Pitcairn Group of Islands",
  },
  {
    common: "Barbados",
    official: "Barbados",
  },
  {
    common: "Bosnia and Herzegovina",
    official: "Bosnia and Herzegovina",
  },
  {
    common: "South Korea",
    official: "Republic of Korea",
  },
  {
    common: "Burkina Faso",
    official: "Burkina Faso",
  },
  {
    common: "El Salvador",
    official: "Republic of El Salvador",
  },
  {
    common: "Syria",
    official: "Syrian Arab Republic",
  },
  {
    common: "Colombia",
    official: "Republic of Colombia",
  },
  {
    common: "Bangladesh",
    official: "People's Republic of Bangladesh",
  },
  {
    common: "Martinique",
    official: "Martinique",
  },
  {
    common: "Micronesia",
    official: "Federated States of Micronesia",
  },
  {
    common: "Sweden",
    official: "Kingdom of Sweden",
  },
  {
    common: "Hungary",
    official: "Hungary",
  },
  {
    common: "French Southern and Antarctic Lands",
    official: "Territory of the French Southern and Antarctic Lands",
  },
  {
    common: "Nauru",
    official: "Republic of Nauru",
  },
  {
    common: "Iraq",
    official: "Republic of Iraq",
  },
  {
    common: "Poland",
    official: "Republic of Poland",
  },
  {
    common: "Greece",
    official: "Hellenic Republic",
  },
  {
    common: "Tanzania",
    official: "United Republic of Tanzania",
  },
  {
    common: "Morocco",
    official: "Kingdom of Morocco",
  },
  {
    common: "Liechtenstein",
    official: "Principality of Liechtenstein",
  },
  {
    common: "Timor-Leste",
    official: "Democratic Republic of Timor-Leste",
  },
  {
    common: "Eritrea",
    official: "State of Eritrea",
  },
  {
    common: "Mayotte",
    official: "Department of Mayotte",
  },
  {
    common: "France",
    official: "French Republic",
  },
  {
    common: "Honduras",
    official: "Republic of Honduras",
  },
  {
    common: "Samoa",
    official: "Independent State of Samoa",
  },
  {
    common: "Greenland",
    official: "Greenland",
  },
  {
    common: "Kosovo",
    official: "Republic of Kosovo",
  },
  {
    common: "Anguilla",
    official: "Anguilla",
  },
  {
    common: "Serbia",
    official: "Republic of Serbia",
  },
  {
    common: "Slovakia",
    official: "Slovak Republic",
  },
  {
    common: "Heard Island and McDonald Islands",
    official: "Heard Island and McDonald Islands",
  },
  {
    common: "Kiribati",
    official: "Independent and Sovereign Republic of Kiribati",
  },
  {
    common: "Montserrat",
    official: "Montserrat",
  },
  {
    common: "Spain",
    official: "Kingdom of Spain",
  },
  {
    common: "Belize",
    official: "Belize",
  },
  {
    common: "Seychelles",
    official: "Republic of Seychelles",
  },
  {
    common: "Western Sahara",
    official: "Sahrawi Arab Democratic Republic",
  },
  {
    common: "Gibraltar",
    official: "Gibraltar",
  },
  {
    common: "Thailand",
    official: "Kingdom of Thailand",
  },
  {
    common: "Vietnam",
    official: "Socialist Republic of Vietnam",
  },
  {
    common: "Saint Helena, Ascension and Tristan da Cunha",
    official: "Saint Helena, Ascension and Tristan da Cunha",
  },
  {
    common: "Austria",
    official: "Republic of Austria",
  },
  {
    common: "Saint Vincent and the Grenadines",
    official: "Saint Vincent and the Grenadines",
  },
  {
    common: "Andorra",
    official: "Principality of Andorra",
  },
  {
    common: "Svalbard and Jan Mayen",
    official: "Svalbard og Jan Mayen",
  },
  {
    common: "Norfolk Island",
    official: "Territory of Norfolk Island",
  },
  {
    common: "Suriname",
    official: "Republic of Suriname",
  },
  {
    common: "Mongolia",
    official: "Mongolia",
  },
  {
    common: "Bhutan",
    official: "Kingdom of Bhutan",
  },
  {
    common: "Sierra Leone",
    official: "Republic of Sierra Leone",
  },
  {
    common: "Cambodia",
    official: "Kingdom of Cambodia",
  },
  {
    common: "Algeria",
    official: "People's Democratic Republic of Algeria",
  },
  {
    common: "Gabon",
    official: "Gabonese Republic",
  },
  {
    common: "Afghanistan",
    official: "Islamic Republic of Afghanistan",
  },
  {
    common: "Armenia",
    official: "Republic of Armenia",
  },
  {
    common: "Saint Lucia",
    official: "Saint Lucia",
  },
  {
    common: "Tuvalu",
    official: "Tuvalu",
  },
  {
    common: "Turks and Caicos Islands",
    official: "Turks and Caicos Islands",
  },
  {
    common: "Guinea",
    official: "Republic of Guinea",
  },
  {
    common: "Equatorial Guinea",
    official: "Republic of Equatorial Guinea",
  },
  {
    common: "Sudan",
    official: "Republic of the Sudan",
  },
  {
    common: "Antarctica",
    official: "Antarctica",
  },
  {
    common: "São Tomé and Príncipe",
    official: "Democratic Republic of São Tomé and Príncipe",
  },
  {
    common: "Slovenia",
    official: "Republic of Slovenia",
  },
  {
    common: "Hong Kong",
    official:
      "Hong Kong Special Administrative Region of the People's Republic of China",
  },
  {
    common: "Réunion",
    official: "Réunion Island",
  },
  {
    common: "Saint Martin",
    official: "Saint Martin",
  },
  {
    common: "Latvia",
    official: "Republic of Latvia",
  },
  {
    common: "French Guiana",
    official: "Guiana",
  },
  {
    common: "Pakistan",
    official: "Islamic Republic of Pakistan",
  },
  {
    common: "Azerbaijan",
    official: "Republic of Azerbaijan",
  },
  {
    common: "Comoros",
    official: "Union of the Comoros",
  },
  {
    common: "Oman",
    official: "Sultanate of Oman",
  },
  {
    common: "Senegal",
    official: "Republic of Senegal",
  },
  {
    common: "United States Virgin Islands",
    official: "Virgin Islands of the United States",
  },
  {
    common: "Ghana",
    official: "Republic of Ghana",
  },
  {
    common: "Central African Republic",
    official: "Central African Republic",
  },
  {
    common: "South Georgia",
    official: "South Georgia and the South Sandwich Islands",
  },
  {
    common: "American Samoa",
    official: "American Samoa",
  },
  {
    common: "Israel",
    official: "State of Israel",
  },
  {
    common: "Zimbabwe",
    official: "Republic of Zimbabwe",
  },
  {
    common: "Burundi",
    official: "Republic of Burundi",
  },
  {
    common: "Guinea-Bissau",
    official: "Republic of Guinea-Bissau",
  },
  {
    common: "Malawi",
    official: "Republic of Malawi",
  },
  {
    common: "United States",
    official: "United States of America",
  },
  {
    common: "Panama",
    official: "Republic of Panama",
  },
  {
    common: "Madagascar",
    official: "Republic of Madagascar",
  },
  {
    common: "Georgia",
    official: "Georgia",
  },
  {
    common: "Portugal",
    official: "Portuguese Republic",
  },

  {
    common: "Cook Islands",
    official: "Cook Islands",
  },
  {
    common: "Iceland",
    official: "Iceland",
  },
  {
    common: "Chad",
    official: "Republic of Chad",
  },
  {
    common: "Turkey",
    official: "Republic of Turkey",
  },
  {
    common: "Christmas Island",
    official: "Territory of Christmas Island",
  },
  {
    common: "Costa Rica",
    official: "Republic of Costa Rica",
  },
  {
    common: "Lithuania",
    official: "Republic of Lithuania",
  },
  {
    common: "Cocos (Keeling) Islands",
    official: "Territory of the Cocos (Keeling) Islands",
  },
  {
    common: "India",
    official: "Republic of India",
  },
  {
    common: "Egypt",
    official: "Arab Republic of Egypt",
  },
  {
    common: "Jersey",
    official: "Bailiwick of Jersey",
  },
  {
    common: "Vatican City",
    official: "Vatican City State",
  },
  {
    common: "South Africa",
    official: "Republic of South Africa",
  },
  {
    common: "Jamaica",
    official: "Jamaica",
  },
  {
    common: "Brazil",
    official: "Federative Republic of Brazil",
  },
  {
    common: "Denmark",
    official: "Kingdom of Denmark",
  },
  {
    common: "Belgium",
    official: "Kingdom of Belgium",
  },
  {
    common: "Paraguay",
    official: "Republic of Paraguay",
  },
  {
    common: "Kazakhstan",
    official: "Republic of Kazakhstan",
  },
  {
    common: "Namibia",
    official: "Republic of Namibia",
  },
  {
    common: "Ivory Coast",
    official: "Republic of Côte d'Ivoire",
  },
  {
    common: "Mauritius",
    official: "Republic of Mauritius",
  },
  {
    common: "Palestine",
    official: "State of Palestine",
  },
  {
    common: "Montenegro",
    official: "Montenegro",
  },
  {
    common: "British Indian Ocean Territory",
    official: "British Indian Ocean Territory",
  },
  {
    common: "Malaysia",
    official: "Malaysia",
  },
  {
    common: "Djibouti",
    official: "Republic of Djibouti",
  },
  {
    common: "Solomon Islands",
    official: "Solomon Islands",
  },
  {
    common: "Guyana",
    official: "Co-operative Republic of Guyana",
  },
  {
    common: "Curaçao",
    official: "Country of Curaçao",
  },
  {
    common: "Kyrgyzstan",
    official: "Kyrgyz Republic",
  },
  {
    common: "Philippines",
    official: "Republic of the Philippines",
  },
  {
    common: "Papua New Guinea",
    official: "Independent State of Papua New Guinea",
  },
  {
    common: "Trinidad and Tobago",
    official: "Republic of Trinidad and Tobago",
  },
  {
    common: "Libya",
    official: "State of Libya",
  },
  {
    common: "Aruba",
    official: "Aruba",
  },
  {
    common: "Russia",
    official: "Russian Federation",
  },
  {
    common: "Germany",
    official: "Federal Republic of Germany",
  },
  {
    common: "Grenada",
    official: "Grenada",
  },
  {
    common: "Canada",
    official: "Canada",
  },
  {
    common: "French Polynesia",
    official: "French Polynesia",
  },
  {
    common: "Eswatini",
    official: "Kingdom of Eswatini",
  },
  {
    common: "Iran",
    official: "Islamic Republic of Iran",
  },
  {
    common: "Japan",
    official: "Japan",
  },
  {
    common: "China",
    official: "People's Republic of China",
  },
  {
    common: "Saint Barthélemy",
    official: "Collectivity of Saint Barthélemy",
  },
  {
    common: "Angola",
    official: "Republic of Angola",
  },
  {
    common: "Ireland",
    official: "Republic of Ireland",
  },
  {
    common: "Norway",
    official: "Kingdom of Norway",
  },
  {
    common: "Mozambique",
    official: "Republic of Mozambique",
  },
  {
    common: "Jordan",
    official: "Hashemite Kingdom of Jordan",
  },
  {
    common: "Gambia",
    official: "Republic of the Gambia",
  },
  {
    common: "Singapore",
    official: "Republic of Singapore",
  },
  {
    common: "San Marino",
    official: "Republic of San Marino",
  },
  {
    common: "Chile",
    official: "Republic of Chile",
  },
  {
    common: "United States Minor Outlying Islands",
    official: "United States Minor Outlying Islands",
  },
  {
    common: "Benin",
    official: "Republic of Benin",
  },
  {
    common: "Sri Lanka",
    official: "Democratic Socialist Republic of Sri Lanka",
  },
  {
    common: "Belarus",
    official: "Republic of Belarus",
  },
  {
    common: "Caribbean Netherlands",
    official: "Bonaire, Sint Eustatius and Saba",
  },
  {
    common: "Peru",
    official: "Republic of Peru",
  },
  {
    common: "Guernsey",
    official: "Bailiwick of Guernsey",
  },
  {
    common: "Åland Islands",
    official: "Åland Islands",
  },
  {
    common: "Dominican Republic",
    official: "Dominican Republic",
  },
  {
    common: "Tokelau",
    official: "Tokelau",
  },
  {
    common: "United Arab Emirates",
    official: "United Arab Emirates",
  },
  {
    common: "Australia",
    official: "Commonwealth of Australia",
  },
  {
    common: "Guatemala",
    official: "Republic of Guatemala",
  },
  {
    common: "Lebanon",
    official: "Lebanese Republic",
  },
  {
    common: "Luxembourg",
    official: "Grand Duchy of Luxembourg",
  },
  {
    common: "Albania",
    official: "Republic of Albania",
  },
  {
    common: "Vanuatu",
    official: "Republic of Vanuatu",
  },
  {
    common: "DR Congo",
    official: "Democratic Republic of the Congo",
  },
  {
    common: "Northern Mariana Islands",
    official: "Commonwealth of the Northern Mariana Islands",
  },
  {
    common: "Czechia",
    official: "Czech Republic",
  },
  {
    common: "Italy",
    official: "Italian Republic",
  },
  {
    common: "Uganda",
    official: "Republic of Uganda",
  },
  {
    common: "Switzerland",
    official: "Swiss Confederation",
  },
  {
    common: "Mexico",
    official: "United Mexican States",
  },
  {
    common: "Taiwan",
    official: "Republic of China (Taiwan)",
  },
  {
    common: "Finland",
    official: "Republic of Finland",
  },
];

export default COUNTRY_NAMES_LIST;
