import { ALIVE_CHARACTER_STATUS, DEAD_CHARACTER_STATUS } from "../constants";

export function getStatusColor(status) {
  if (status === DEAD_CHARACTER_STATUS) {
    return "#d63d2e";
  }
  if (status === ALIVE_CHARACTER_STATUS) {
    return "#55cc44";
  }
  return "#9e9e9e";
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
