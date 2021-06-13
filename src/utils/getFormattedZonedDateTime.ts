import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export const getFormattedZonedDateTime = (date: Date) => {
  const utcDate = zonedTimeToUtc(
    date,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  return format(utcDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
};
