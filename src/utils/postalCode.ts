// Check if 3 or 6 character Canadian postal code is valid
const postalCodeIsValid = (postalCode: string) => {
  if (postalCode.length === 3) {
    return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]/i.test(
      postalCodeToBrowserFormat(postalCode),
    );
  }
  return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
    postalCodeToBrowserFormat(postalCode),
  );
};

// Get first three characters of postal code
const postalCodeToApiFormat = (postalCode: string) => {
  return postalCode.toLowerCase().replace(" ", "").substring(0, 3);
};

const postalCodeToBrowserFormat = (postalCode: string) => {
  return postalCode.toLowerCase().replace(" ", "");
};

// Format postal code for human format (for browser)
const postalCodeToHumanFormat = (postalCode: string) => {
  return postalCode
    .replace(" ", "")
    .substring(0, 3)
    .concat(
      postalCode.length === 3
        ? ""
        : ` ${postalCode.substring(postalCode.length - 3)}`,
    )
    .toUpperCase();
};

export {
  postalCodeIsValid,
  postalCodeToApiFormat,
  postalCodeToBrowserFormat,
  postalCodeToHumanFormat,
};
