import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  ActionList,
  Popover,
  Stack,
  TextStyle,
  Banner,
  Checkbox,
} from "@shopify/polaris";
import slugify from "slugify";
import React, { useState } from "react";
import { postalCodeIsValid } from "../../utils";
import {
  useCreateVaccineAvailabilityExpandedKeyApiV1VaccineAvailabilityLocationsKeyExternalKeyPost,
  VaccineAvailabilityExpandedCreateRequest,
} from "../../apiClient";
import { useTranslation } from "react-i18next";
import { getValidUrl } from "../../utils/getValidUrl";
import { subHours, format } from "date-fns";
import { getTimezoneOffset } from "date-fns-tz";

/**
 * Form used to record popup clinic details
 *
 * This component could have benefited from a form management library, but given it
 * was a one-off, it has been developed with controlled components. If we start adding
 * more forms, it might be worthwhile introducing a form lib and refactoring.
 *
 * @returns A form component to record popup clinic details
 */
export function PopUpForm() {
  /** Error state */
  const [shouldShowInvalidName, setShouldShowInvalidName] = useState(false);
  const [shouldShowInvalidDate, setShouldShowInvalidDate] = useState(false);
  const [shouldShowInvalidAddress, setShouldShowInvalidAddress] = useState(
    false,
  );
  const [shouldShowInvalidCity, setShouldShowInvalidCity] = useState(false);
  const [shouldShowInvalidProvince, setShouldShowInvalidProvince] = useState(
    false,
  );
  const [shouldShowInvalidPostal, setShouldShowInvalidPostal] = useState(false);
  const [shouldShowInvalidURL, setShouldShowInvalidURL] = useState(false);
  const [shouldShowInvalidBooking, setShouldShowInvalidBooking] = useState(
    false,
  );
  const [shouldShowInvalidDoses, setShouldShowInvalidDoses] = useState(false);

  /** Controlled component state */
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [numAvailable, setNumAvailable] = useState("");
  const [vaccineTypeString, setVaccineTypeString] = useState(
    "Select Vaccine Type",
  );
  const [vaccineId, setVaccineId] = useState(1);
  const [isPopOverActive, setIsPopOverActive] = useState(false);
  const [isExpiringDosesChecked, setIsExpiringDosesChecked] = useState(false);
  const [isCancellationsChecked, setIsCancellationsChecked] = useState(false);
  const [isCallAheadChecked, setIsCallAheadChecked] = useState(false);
  const [isWalkInChecked, setIsWalkInChecked] = useState(false);
  const [isVisitWebsiteChecked, setIsVisitWebsiteChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isFirstDose, setIsFirstDose] = useState(false);
  const [isSecondDose, setIsSecondDose] = useState(false);
  const [isPopUpRequestSuccessful, setIsPopUpRequestSuccessful] = useState(
    false,
  );

  // We generate the location by slugifying the address of the popup
  const locationId = slugify(`popup-${address}`, { locale: "fr" });
  const {
    mutate: post,
    loading,
    error,
  } = useCreateVaccineAvailabilityExpandedKeyApiV1VaccineAvailabilityLocationsKeyExternalKeyPost(
    { external_key: locationId },
  );

  const { t } = useTranslation();

  const validateForm = () => {
    let isValid = true;
    if (!name) {
      setShouldShowInvalidName(true);
      isValid = false;
    } else {
      setShouldShowInvalidName(false);
    }

    if (!date) {
      setShouldShowInvalidDate(true);
      isValid = false;
    } else {
      setShouldShowInvalidDate(false);
    }

    if (!address) {
      setShouldShowInvalidAddress(true);
      isValid = false;
    } else {
      setShouldShowInvalidAddress(false);
    }

    if (!city) {
      setShouldShowInvalidCity(true);
      isValid = false;
    } else {
      setShouldShowInvalidCity(false);
    }

    if (!province) {
      setShouldShowInvalidProvince(true);
      isValid = false;
    } else {
      setShouldShowInvalidProvince(false);
    }

    if (!postalCodeIsValid(postalCode)) {
      setShouldShowInvalidPostal(true);
      isValid = false;
    } else {
      setShouldShowInvalidPostal(false);
    }

    if (!website) {
      setShouldShowInvalidURL(true);
      isValid = false;
    } else {
      setShouldShowInvalidURL(false);
    }

    if (
      !isWalkInChecked &&
      !isEmailChecked &&
      !isCallAheadChecked &&
      !isVisitWebsiteChecked
    ) {
      setShouldShowInvalidBooking(true);
      isValid = false;
    } else {
      setShouldShowInvalidBooking(false);
    }

    if (isFirstDose || isSecondDose) {
      setShouldShowInvalidDoses(false);
    } else {
      setShouldShowInvalidDoses(true);
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const tagsCommaSeparatedString: string[] = [];

    if (isCallAheadChecked) {
      tagsCommaSeparatedString.push("Call Ahead");
    }
    if (isWalkInChecked) {
      tagsCommaSeparatedString.push("Walk In");
    }

    if (isVisitWebsiteChecked) {
      tagsCommaSeparatedString.push("Visit Website");
    }
    if (isEmailChecked) {
      tagsCommaSeparatedString.push("Email");
    }

    if (isCancellationsChecked) {
      tagsCommaSeparatedString.push("Cancellation");
    }

    if (isExpiringDosesChecked) {
      tagsCommaSeparatedString.push("Expiring Doses");
    }

    if (isFirstDose) {
      tagsCommaSeparatedString.push("1st Dose");
    }

    if (isSecondDose) {
      tagsCommaSeparatedString.push("2nd Dose");
    }

    if (vaccineId !== 1) {
      tagsCommaSeparatedString.push(vaccineTypeString);
    }

    const tzOffset =
      getTimezoneOffset(Intl.DateTimeFormat().resolvedOptions().timeZone) /
      1000 /
      60 /
      60;

    // This is a temporary hack while the backend figures out how to manage timezones properly
    // at which point we will localize properly
    const dateToSend = `${format(
      subHours(new Date(date), tzOffset),
      "yyyy-MM-dd'T'00:00:00-00:00:00",
    )}`;

    // This request payload will be used for various vaccintion availabilities in addition to popup clinics,
    // some values are hardcoded but I will explain them to the best of my understanding
    const requestPayload: VaccineAvailabilityExpandedCreateRequest = {
      active: 1, // boolean indicating if popup is active
      date: dateToSend,
      inputType: 1, // represents how availability data was recorded - not used at time of writing
      name,
      numberAvailable: numAvailable ? Number(numAvailable) : 1,
      numberTotal: numAvailable ? Number(numAvailable) : 1,
      vaccine: vaccineId, // This is the vaccine id
      postcode: postalCode.replace(/[\W]/gi, ""),
      province,
      city,
      externalKey: locationId,
      line1: address,
      line2: "",
      notes: "",
      organization: 25, // popups are always 25
      phone: phoneNumber,
      tagsA: tagsCommaSeparatedString.join(","),
      tagsL: "",
      url: getValidUrl(website),
    };

    post(requestPayload)
      .then((user) => {
        setName("");
        setDate("");
        setAddress("");
        setCity("");
        setProvince("");
        setPostalCode("");
        setPhoneNumber("");
        setWebsite("");
        setNumAvailable("");
        setVaccineTypeString("Select Vaccine Type");
        setVaccineId(1);
        setIsCallAheadChecked(false);
        setIsCancellationsChecked(false);
        setIsExpiringDosesChecked(false);
        setIsVisitWebsiteChecked(false);
        setIsEmailChecked(false);
        setIsWalkInChecked(false);
        setIsFirstDose(false);
        setIsSecondDose(false);
        setIsPopUpRequestSuccessful(true);
      })
      .catch((err) => console.error(err));
  };

  const invalidNameMessage = shouldShowInvalidName
    ? "Name must not be empty"
    : undefined;

  const invalidDateMessage = shouldShowInvalidDate
    ? "Date is empty. Please Select a date."
    : undefined;

  const invalidAddressMessage = shouldShowInvalidAddress
    ? "Address must not be empty"
    : undefined;

  const invalidCityMessage = shouldShowInvalidCity
    ? "City must not be empty"
    : undefined;

  const invalidProvinceMessage = shouldShowInvalidProvince
    ? "Province must not be empty"
    : undefined;

  const invalidPostalCodeMessage = shouldShowInvalidPostal
    ? "Invalid Postal Code"
    : undefined;

  const invalidURLMessage = shouldShowInvalidURL
    ? "URL must not be empty"
    : undefined;

  const invalidBookingMessage = shouldShowInvalidBooking
    ? "At least one booking method must be checked"
    : undefined;

  const invalidDoseMessage = shouldShowInvalidDoses
    ? "At least one dose must be checked"
    : undefined;
  const activator = (
    <Button onClick={() => setIsPopOverActive(!isPopOverActive)} disclosure>
      {vaccineTypeString}
    </Button>
  );
  return (
    <section aria-label="pop-up" style={{ marginBottom: "2rem" }}>
      <Card>
        <Banner title="Submission Warning" status="warning">
          Once you hit submit, this record will be immediately added to the live
          website.
          <strong> PLEASE TRIPLE CHECK YOUR ENTRY BEFORE SUBMITTING.</strong>
        </Banner>

        {error ? (
          <Banner title="Error" status="critical">
            {t("anerrorhasoccurred")}
          </Banner>
        ) : undefined}

        {isPopUpRequestSuccessful ? (
          <Banner title="Success" status="success">
            Your popup has been saved.
          </Banner>
        ) : undefined}
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  value={name}
                  onChange={setName}
                  label="Enter Clinic Name"
                  helpText={
                    <span>Enter the name of the clinic, or location</span>
                  }
                  error={invalidNameMessage}
                  type="text"
                  autoComplete="false"
                />
                <TextField
                  value={date}
                  onChange={setDate}
                  label="Enter Date"
                  helpText={<span>Ex: 2021-06-18</span>}
                  error={invalidDateMessage}
                  type="date"
                  autoComplete="false"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={address}
                  onChange={setAddress}
                  label="Enter Address"
                  error={invalidAddressMessage}
                  type="text"
                  autoComplete="false"
                />
                <TextField
                  value={city}
                  onChange={setCity}
                  label="Enter City"
                  error={invalidCityMessage}
                  type="text"
                  autoComplete="false"
                />
                <TextField
                  value={province}
                  onChange={setProvince}
                  label="Enter Province"
                  error={invalidProvinceMessage}
                  type="text"
                  autoComplete="false"
                />
                <TextField
                  value={postalCode}
                  onChange={setPostalCode}
                  label="Enter Postal Code"
                  error={invalidPostalCodeMessage}
                  type="text"
                  autoComplete="false"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  label="Enter Phone Number (Optional)"
                  type="text"
                  autoComplete="false"
                />
                <TextField
                  value={website}
                  onChange={setWebsite}
                  label="Enter Website URL"
                  error={invalidURLMessage}
                  type="text"
                  autoComplete="false"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={numAvailable}
                  onChange={setNumAvailable}
                  label="Enter Number Available (Optional)"
                  type="number"
                  autoComplete="false"
                />
                <Stack distribution="fill">
                  <Stack.Item>
                    <TextStyle>Enter Vaccine Type (Optional)</TextStyle>
                    <Popover
                      active={isPopOverActive}
                      activator={activator}
                      onClose={() => setIsPopOverActive(!isPopOverActive)}
                    >
                      <ActionList
                        items={[
                          {
                            content: "Pfizer",
                            onAction: () => {
                              setVaccineId(3);
                              setVaccineTypeString("Pfizer");
                              setIsPopOverActive(false);
                            },
                          },
                          {
                            content: "Moderna",
                            onAction: () => {
                              setVaccineId(4);
                              setVaccineTypeString("Moderna");
                              setIsPopOverActive(false);
                            },
                          },
                          {
                            content: "AstraZeneca",
                            onAction: () => {
                              setVaccineId(5);
                              setVaccineTypeString("AstraZeneca");
                              setIsPopOverActive(false);
                            },
                          },
                          {
                            content: "Not Sure",
                            onAction: () => {
                              setVaccineId(1);
                              setVaccineTypeString("Not Sure");
                              setIsPopOverActive(false);
                            },
                          },
                        ]}
                      />
                    </Popover>
                  </Stack.Item>
                </Stack>
              </FormLayout.Group>
              <FormLayout.Group>
                <Stack vertical>
                  <TextStyle>Select Booking Methods</TextStyle>
                  <Checkbox
                    label="Walk-Ins"
                    checked={isWalkInChecked}
                    onChange={() => {
                      setIsWalkInChecked(!isWalkInChecked);
                    }}
                    error={invalidBookingMessage}
                  />
                  <Checkbox
                    label="Email"
                    checked={isEmailChecked}
                    onChange={() => {
                      setIsEmailChecked(!isEmailChecked);
                    }}
                    error={invalidBookingMessage}
                  />
                  <Checkbox
                    label="Call Ahead"
                    checked={isCallAheadChecked}
                    onChange={() => {
                      setIsCallAheadChecked(!isCallAheadChecked);
                    }}
                    error={invalidBookingMessage}
                  />
                  <Checkbox
                    label="Visit Website"
                    checked={isVisitWebsiteChecked}
                    onChange={() => {
                      setIsVisitWebsiteChecked(!isVisitWebsiteChecked);
                    }}
                    error={invalidBookingMessage}
                  />
                </Stack>
                <Stack vertical>
                  <TextStyle>Select Doses</TextStyle>
                  <Checkbox
                    label="1st Dose"
                    checked={isFirstDose}
                    onChange={() => {
                      setIsFirstDose(!isFirstDose);
                    }}
                    error={invalidDoseMessage}
                  />
                  <Checkbox
                    label="2nd Dose"
                    checked={isSecondDose}
                    onChange={() => {
                      setIsSecondDose(!isSecondDose);
                    }}
                    error={invalidDoseMessage}
                  />
                </Stack>
              </FormLayout.Group>
              <Button primary submit disabled={loading}>
                Submit
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </section>
  );
}
