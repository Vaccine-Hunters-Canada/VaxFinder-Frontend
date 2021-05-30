import { securityHandlers } from "./security/handlers";
import { vaccineAvailabilityHandlers } from "./vaccineAvailability/handlers";
import { vaccineLocationHandlers } from "./vaccineLocations/handlers";

export const handlers = [
  ...securityHandlers,
  ...vaccineAvailabilityHandlers,
  ...vaccineLocationHandlers,
];
