import { INITIAL_FILTERS_STATE } from "../constants";

export function filtersReducer(state, action) {
  let newState;
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      newState = { ...state, currentPage: action.currentPage };
      break;
    case "INCREASE_CURRENT_PAGE":
      newState = { ...state, currentPage: state.currentPage++ };
      break;
    case "DECREASE_CURRENT_PAGE":
      newState = { ...state, currentPage: state.currentPage-- };
      break;
    case "SET_STATUS":
      newState = { ...state, currentPage: 1, status: action.status };
      break;
    case "SET_GENDER":
      newState = { ...state, currentPage: 1, gender: action.gender };
      break;
    case "SET_SPECIES":
      newState = { ...state, currentPage: 1, species: action.species };
      break;
    case "SET_NAME":
      newState = { ...state, currentPage: 1, name: action.name };
      break;
    case "RESET_FILTERS":
      newState = { ...INITIAL_FILTERS_STATE };
      break;
    default:
      throw new Error();
  }
  return newState;
}
