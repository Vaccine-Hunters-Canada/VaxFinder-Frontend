const postalCodeIsValid = (postalCode: string) => {
  return /[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]/.test(
    postalCodeToBrowserFormat(postalCode),
  );
};

const postalCodeToApiFormat = (postalCode: string) => {
  return postalCode.toLowerCase().replace(" ", "").substring(0, 3);
};

const postalCodeToBrowserFormat = (postalCode: string) => {
  return postalCode.toLowerCase().replace(" ", "");
};

const postalCodeToHumanFormat = (postalCode: string) => {
  return postalCode
    .replace(" ", "")
    .substr(0, 3)
    .concat(" ")
    .concat(postalCode.substr(-3))
    .toUpperCase();
};

export {
  postalCodeIsValid,
  postalCodeToApiFormat,
  postalCodeToBrowserFormat,
  postalCodeToHumanFormat,
};
