export const PHONE_NUMBER_REGEX = "^(+0?1s)?(?d{3})?[s.-]d{3}[s.-]d{4}$";

export const phoneNumberIsValid = (value: string) =>
  value.match(PHONE_NUMBER_REGEX);
