import { vaccineAvailabilityHandlers } from "./vaccineAvailability/handlers";
import { vaccineLocationHandlers } from "./vaccineLocations/handlers";

export const handlers = [
  ...vaccineAvailabilityHandlers,
  ...vaccineLocationHandlers,
];
