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
  Spinner,
  Checkbox,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
  useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet,
  useCreateVaccineAvailabilityExpandedKeyApiV1VaccineAvailabilityLocationsKeyExternalKeyPost,
  VaccineAvailabilityExpandedCreateRequest,
} from "../../apiClient";

import { postalCodeIsValid } from "../../utils";
import { usePrevious } from "../../hooks/usePrevious";
import { subHours, format, startOfDay } from "date-fns";
import { getValidUrl } from "../../utils/getValidUrl";
import { useTranslation } from "react-i18next";
import { getTimezoneOffset } from "date-fns-tz";

export function RapidAppointment() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const key = Array.isArray(params.externalKey)
    ? params.externalKey[0]
    : params.externalKey;

  const organizationId = Array.isArray(params.organizationId)
    ? params.organizationId[0]
    : params.organizationId;

  const {
    data: locationData,
    error: locationError,
    loading: locationLoading,
    refetch,
  } = useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet({
    external_key: key || "",
    lazy: true,
  });

  const {
    mutate: post,
    loading: createLoading,
    error: createError,
  } = useCreateVaccineAvailabilityExpandedKeyApiV1VaccineAvailabilityLocationsKeyExternalKeyPost(
    { external_key: key || "" },
  );

  /** Error state */
  const [shouldShowInvalidName, setShouldShowInvalidName] = useState(false);
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
  const [shouldShowInvalidNotes, setShouldShowInvalidNotes] = useState(false);
  const [shouldShowInvalidAge, setShouldShowInvalidAge] = useState(false);

  const [name, setName] = useState("");
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
  const [specialNotes, setSpecialNotes] = useState(
    "Include any other notes for VHC staff below:\n",
  );
  const [isPopOverActive, setIsPopOverActive] = useState(false);
  const [isExpiringDosesChecked, setIsExpiringDosesChecked] = useState(false);
  const [isCancellationsChecked, setIsCancellationsChecked] = useState(false);
  const [isCallAheadChecked, setIsCallAheadChecked] = useState(false);
  const [isWalkInChecked, setIsWalkInChecked] = useState(false);
  const [isVisitWebsiteChecked, setIsVisitWebsiteChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isFirstDose, setIsFirstDose] = useState(false);
  const [isSecondDose, setIsSecondDose] = useState(false);
  const [isThirdDose, setIsThirdDose] = useState(false);
  const [isCreateRequestSuccessful, setIsCreateRequestSuccessful] = useState(
    false,
  );
  const [isAdultDoses, setIsAdultDoses] = useState(false);
  const [isChildrenDoses, setIsChildrenDoses] = useState(false);

  const previousData = usePrevious(locationData);
  useEffect(() => {
    if (!previousData && locationData) {
      setName(locationData.name);
      setAddress(locationData.address?.line1 || "");
      setCity(locationData.address?.city || "");
      setProvince(locationData.address?.province || "");
      setPostalCode(locationData.address?.postcode || "");
      setPhoneNumber(locationData.phone || "");
      setWebsite(locationData.url || "");
    }
  }, [locationData, previousData]);

  useEffect(() => {
    if (isCreateRequestSuccessful) {
      const queryParams = new URLSearchParams();
      queryParams.append("externalKey", key!);
      queryParams.append("organizationId", organizationId!);
      queryParams.append("saveSuccess", "true");
      history.push(`/admin/pharmacistLanding?${queryParams.toString()}`);
    }
  }, [history, isCreateRequestSuccessful, key, organizationId, search]);

  const validateForm = () => {
    let isValid = true;
    if (!name) {
      setShouldShowInvalidName(true);
      isValid = false;
    } else {
      setShouldShowInvalidName(false);
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

    if (!specialNotes) {
      setShouldShowInvalidNotes(true);
      isValid = false;
    } else {
      setShouldShowInvalidNotes(false);
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

    if (isFirstDose || isSecondDose || isThirdDose) {
      setShouldShowInvalidDoses(false);
    } else {
      setShouldShowInvalidDoses(true);
      isValid = false;
    }

    if (isChildrenDoses || isAdultDoses) {
      setShouldShowInvalidAge(false);
    } else {
      setShouldShowInvalidAge(true);
      isValid = false;
    }

    return isValid;
  };

  const discordWebhook = () => {
    // Ensure we don't invoke this during test runs and development
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const request = new XMLHttpRequest();
    request.open(
      "POST",
      "https://discord.com/api/webhooks/858188462783201342/8HhiTj-fVmxyhm9ARCG58G8AdcV1C_VAD0zLNEJL2tpT9uxTZdN0PJ281k3hK1N7H927",
    );
    request.setRequestHeader("Content-type", "application/json");

    let reasoningString = "";
    let tweetBookingMethods = "";
    if (isCancellationsChecked) {
      reasoningString += "Cancellation";
    }
    if (isExpiringDosesChecked) {
      if (reasoningString === "") {
        reasoningString += "Expiring Doses";
      } else {
        reasoningString += " and Expiring Doses";
      }
    }
    if (!isCancellationsChecked && !isExpiringDosesChecked) {
      reasoningString = "General Availability";
    }

    let bookingMethodsString = "";
    if (isCallAheadChecked) {
      bookingMethodsString += "Call Ahead";
      tweetBookingMethods += `Call ${phoneNumber}`;
    }
    if (isVisitWebsiteChecked) {
      if (bookingMethodsString === "") {
        bookingMethodsString += "Visit Website";
        tweetBookingMethods += `Book at ${website}`;
      } else {
        bookingMethodsString += ", Visit Website";
        tweetBookingMethods += `, Book at ${website}`;
      }
    }
    if (isWalkInChecked) {
      if (bookingMethodsString === "") {
        bookingMethodsString += "Walk In";
        tweetBookingMethods += "Walk-In to Clinic";
      } else {
        bookingMethodsString += ", Walk In";
        tweetBookingMethods += ", Walk-In to Clinic";
      }
    }
    if (isEmailChecked) {
      if (bookingMethodsString === "") {
        bookingMethodsString += "Email";
      } else {
        bookingMethodsString += ", Email";
      }
    }

    const doses = [];
    if (isFirstDose) {
      doses.push("First");
    }
    if (isSecondDose) {
      doses.push("Second");
    }
    if (isThirdDose) {
      doses.push("Third");
    }
    const doseString = `${doses.join(", ")}`;

    const ages = [];
    if (isChildrenDoses) {
      ages.push("5-11 Year Olds");
    }
    if (isAdultDoses) {
      ages.push("12+ Year Olds");
    }
    const agesString = `${ages.join(", ")}`;

    const autoGeneratedTweet = `${city}\n${
      vaccineId === 1 ? "Vaccine Type Not Reported" : vaccineTypeString
    }\nDose 1: ${agesString}\nDose 2: Moderna 28+ days ago, Pfizer 21+ days ago\n${name} at ${address}, ${city}, ${province}, ${postalCode}\n${tweetBookingMethods}`;

    const discordParams = {
      username: "Pharmacy Updates",
      avatar_url: "https://vaccinehunters.ca/favicon.ico",
      content: "<@&835240707241148428>",
      embeds: [
        {
          title: `New Availability for ${name} at ${address}, ${city}, ${province}, ${postalCode}`,
          description:
            "New availability was reported through our reporting form. @pharmacy",
          fields: [
            {
              name: "Phone Number",
              value: phoneNumber === "" ? "Not Reported" : phoneNumber,
              inline: true,
            },
            {
              name: "Website",
              value: `${website}`,
              inline: true,
            },
            {
              name: "Number Available",
              value: numAvailable === "" ? "Not Reported" : numAvailable,
              inline: true,
            },
            {
              name: "Vaccine Type",
              value: vaccineId === 1 ? "Not Reported" : vaccineTypeString,
              inline: true,
            },
            {
              name: "Reasoning",
              value: reasoningString === "" ? "Not Reported" : reasoningString,
              inline: true,
            },
            {
              name: "Booking Method",
              value:
                bookingMethodsString === ""
                  ? "Not Reported"
                  : bookingMethodsString,
              inline: true,
            },
            {
              name: "Doses",
              value: doseString === "" ? "Not Reported" : doseString,
              inline: true,
            },
            {
              name: "Ages",
              value: agesString === "" ? "Not Reported" : agesString,
              inline: true,
            },
            {
              name: "Special Notes",
              value: specialNotes === "" ? "Not Reported" : specialNotes,
              inline: false,
            },
            {
              name: "Autogenerated Tweet",
              value: autoGeneratedTweet,
              inline: false,
            },
          ],
        },
      ],
    };

    request.send(JSON.stringify(discordParams));
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

    if (isThirdDose) {
      tagsCommaSeparatedString.push("3rd Dose");
    }

    if (isChildrenDoses) {
      tagsCommaSeparatedString.push("5-11 Year Olds");
    }

    if (isAdultDoses) {
      tagsCommaSeparatedString.push("12+ Year Olds");
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
      subHours(startOfDay(new Date()), tzOffset),
      "yyyy-MM-dd'T'00:00:00-00:00:00",
    )}`;

    const requestPayload: VaccineAvailabilityExpandedCreateRequest = {
      active: 1, // boolean indicating if location is active
      date: dateToSend,
      inputType: 2, // represents how availability data was recorded
      name,
      numberAvailable: numAvailable ? Number(numAvailable) : 1,
      numberTotal: numAvailable ? Number(numAvailable) : 1,
      vaccine: vaccineId,
      postcode: postalCode.replace(/[\W]/gi, ""),
      province,
      city,
      externalKey: key!,
      line1: address,
      line2: "",
      notes: "",
      organization: Number(organizationId!),
      phone: phoneNumber,
      tagsA: tagsCommaSeparatedString.join(","),
      tagsL: "",
      url: getValidUrl(website),
    };

    discordWebhook();

    post(requestPayload)
      .then(() => {
        setName("");
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
        setIsCreateRequestSuccessful(true);
      })
      .catch((err) => console.error(err));
  };
  const invalidNameMessage = shouldShowInvalidName
    ? "Name must not be empty"
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

  const invalidAgeMessage = shouldShowInvalidAge
    ? "At least one age group must be checked"
    : undefined;

  const invalidNotesMessage = shouldShowInvalidNotes
    ? "You must include notes"
    : undefined;

  const activator = (
    <Button onClick={() => setIsPopOverActive(!isPopOverActive)} disclosure>
      {vaccineTypeString}
    </Button>
  );

  if (!params.externalKey || !params.organizationId) {
    return <Redirect to="/admin/externalKey" />;
  }

  if (locationLoading) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel="Loading" />
      </div>
    );
  }

  if (!locationLoading && !locationData && !locationError) {
    refetch().catch((err) => console.error(err));
  }

  return (
    <section aria-label="pop-up" style={{ marginBottom: "2rem" }}>
      <Card>
        <Banner title="Submission Warning" status="warning">
          Once you hit submit, this record will be immediately added to the live
          website.
          <strong> PLEASE TRIPLE CHECK YOUR ENTRY BEFORE SUBMITTING.</strong>
        </Banner>

        {createError ? (
          <Banner title="Error" status="critical">
            {t("anerrorhasoccurred")}
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
                  <TextStyle>
                    Select Appointment Reasoning(s) (Optional)
                  </TextStyle>
                  <Checkbox
                    label="Cancellations"
                    checked={isCancellationsChecked}
                    onChange={() => {
                      setIsCancellationsChecked(!isCancellationsChecked);
                    }}
                  />
                  <Checkbox
                    label="Expiring Doses"
                    checked={isExpiringDosesChecked}
                    onChange={() => {
                      setIsExpiringDosesChecked(!isExpiringDosesChecked);
                    }}
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
                  <Checkbox
                    label="3rd Dose"
                    checked={isThirdDose}
                    onChange={() => {
                      setIsThirdDose(!isThirdDose);
                    }}
                    error={invalidDoseMessage}
                  />
                </Stack>
                <Stack vertical>
                  <TextStyle>Ages Allowed</TextStyle>
                  <Checkbox
                    label="5-11 Year Old"
                    checked={isChildrenDoses}
                    onChange={() => {
                      setIsChildrenDoses(!isChildrenDoses);
                    }}
                    error={invalidAgeMessage}
                  />
                  <Checkbox
                    label="12+ Year Old"
                    checked={isAdultDoses}
                    onChange={() => {
                      setIsAdultDoses(!isAdultDoses);
                    }}
                    error={invalidAgeMessage}
                  />
                </Stack>
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={specialNotes}
                  onChange={setSpecialNotes}
                  label="Notes (optional)."
                  multiline
                  type="text"
                  placeholder="Enter any additional information/instructions you would like to be included in the Twitter post."
                  error={invalidNotesMessage}
                  autoComplete="false"
                />
              </FormLayout.Group>
              <Button primary submit disabled={createLoading}>
                Submit
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </section>
  );
}
