const PROJECT_NAME = "Rick'n'Morty";

const INITIAL_FILTERS_STATE = {
  currentPage: 1,
  status: "",
  gender: "",
  species: "",
  name: "",
};

const ALIVE_CHARACTER_STATUS = "Alive";
const DEAD_CHARACTER_STATUS = "Dead";
const UNKNOWN_CHARACTER_STATUS = "unknown";

const CHARACTER_STATUS_OPTIONS = [
  { id: 0, value: ALIVE_CHARACTER_STATUS, label: "Alive" },
  { id: 1, value: DEAD_CHARACTER_STATUS, label: "Dead" },
  { id: 2, value: UNKNOWN_CHARACTER_STATUS, label: "Unknown" },
];

const CHARACTER_GENDER_OPTIONS = [
  { id: 0, value: "female", label: "Female" },
  { id: 1, value: "male", label: "Male" },
  { id: 2, value: "genderless", label: "Genderless" },
  { id: 3, value: "unknown", label: "Unknown" },
];

const CHARACTER_SPECIES_OPTIONS = [
  { id: 0, value: "alien", label: "Alien" },
  { id: 1, value: "human", label: "Human" },
  { id: 2, value: "unknown", label: "Unknown" },
];

export {
  PROJECT_NAME,
  INITIAL_FILTERS_STATE,
  CHARACTER_STATUS_OPTIONS,
  CHARACTER_GENDER_OPTIONS,
  CHARACTER_SPECIES_OPTIONS,
  ALIVE_CHARACTER_STATUS,
  DEAD_CHARACTER_STATUS,
  UNKNOWN_CHARACTER_STATUS,
};
