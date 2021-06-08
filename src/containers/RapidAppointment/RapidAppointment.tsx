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
import { Redirect, useLocation } from "react-router-dom";
import {
  useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet,
  useCreateVaccineAvailabilityExpandedKeyApiV1VaccineAvailabilityLocationsKeyExternalKeyPost,
  VaccineAvailabilityExpandedCreateRequest,
} from "../../apiClient";

import { postalCodeIsValid } from "../../utils";
import { usePrevious } from "../../hooks/usePrevious";
import { startOfDay } from "date-fns";
import { getValidUrl } from "../../utils/getValidUrl";
import { useTranslation } from "react-i18next";
import { getFormattedZonedDateTime } from "../../utils/getFormattedZonedDateTime";

export function RapidAppointment() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const params = queryString.parse(search);

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
  const [shouldShowInvalidReasons, setShouldShowInvalidReasons] = useState(
    false,
  );

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

  const [isPopOverActive, setIsPopOverActive] = useState(false);
  const [isExpiringDosesChecked, setIsExpiringDosesChecked] = useState(false);
  const [isCancellationsChecked, setIsCancellationsChecked] = useState(false);
  const [isCallAheadChecked, setIsCallAheadChecked] = useState(false);
  const [isWalkInChecked, setIsWalkInChecked] = useState(false);
  const [isVisitWebsiteChecked, setIsVisitWebsiteChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [shouldShowExpandedForm, setShouldShowExpandedForm] = useState(true);
  const [isCreateRequestSuccessful, setIsCreateRequestSuccessful] = useState(
    false,
  );

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
      setShouldShowExpandedForm(false);
    }
  }, [locationData, previousData]);

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

    if (!isCancellationsChecked && !isExpiringDosesChecked) {
      setShouldShowInvalidReasons(true);
      isValid = false;
    } else {
      setShouldShowInvalidReasons(false);
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
      "https://discord.com/api/webhooks/845851034001211463/N36oMCLIt5-gWecLzXVsaqrMdLAty95O2e4NuHOdI8PQxk7cI8CwDn5uf-5zSiD0aJPC",
    );
    request.setRequestHeader("Content-type", "application/json");

    let reasoningString = "";
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

    let bookingMethodsString = "";
    if (isCallAheadChecked) {
      bookingMethodsString += "Call Ahead";
    }
    if (isVisitWebsiteChecked) {
      if (bookingMethodsString === "") {
        bookingMethodsString += "Visit Website";
      } else {
        bookingMethodsString += ", Visit Website";
      }
    }
    if (isWalkInChecked) {
      if (bookingMethodsString === "") {
        bookingMethodsString += "Walk In";
      } else {
        bookingMethodsString += ", Walk In";
      }
    }
    if (isEmailChecked) {
      if (bookingMethodsString === "") {
        bookingMethodsString += "Email";
      } else {
        bookingMethodsString += ", Email";
      }
    }
    const discordParams = {
      username: "Pharmacy Updates",
      avatar_url: "https://vaccinehunters.ca/favicon.ico",
      embeds: [
        {
          title: `New Availability for ${name} at ${address}, ${city}, ${province}, ${postalCode}`,
          description:
            "New availability was reported through our reporting form.",
          fields: [
            {
              name: "Phone Number",
              value: `${phoneNumber}`,
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
              value: reasoningString,
              inline: true,
            },
            {
              name: "Booking Method",
              value: bookingMethodsString,
              inline: true,
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

    const requestPayload: VaccineAvailabilityExpandedCreateRequest = {
      active: 1, // boolean indicating if location is active
      date: getFormattedZonedDateTime(startOfDay(new Date())),
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

  const invalidReasonMessage = shouldShowInvalidReasons
    ? "At least one reason must be checked"
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

        {isCreateRequestSuccessful ? (
          <Banner title="Success" status="success">
            Your record has been saved.
          </Banner>
        ) : undefined}
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              {shouldShowExpandedForm ? (
                <div className="wrapper">
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
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      value={address}
                      onChange={setAddress}
                      label="Enter Address"
                      error={invalidAddressMessage}
                      type="text"
                    />
                    <TextField
                      value={city}
                      onChange={setCity}
                      label="Enter City"
                      error={invalidCityMessage}
                      type="text"
                    />
                    <TextField
                      value={province}
                      onChange={setProvince}
                      label="Enter Province"
                      error={invalidProvinceMessage}
                      type="text"
                    />
                    <TextField
                      value={postalCode}
                      onChange={setPostalCode}
                      label="Enter Postal Code"
                      error={invalidPostalCodeMessage}
                      type="text"
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      label="Enter Phone Number (Optional)"
                      type="text"
                    />
                    <TextField
                      value={website}
                      onChange={setWebsite}
                      label="Enter Website URL"
                      error={invalidURLMessage}
                      type="text"
                    />
                  </FormLayout.Group>
                </div>
              ) : undefined}
              <FormLayout.Group>
                <TextField
                  value={numAvailable}
                  onChange={setNumAvailable}
                  label="Enter Number Available (Optional)"
                  type="number"
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
                  <TextStyle>Select Appointment Reasoning(s)</TextStyle>
                  <Checkbox
                    label="Cancellations"
                    checked={isCancellationsChecked}
                    onChange={() => {
                      setIsCancellationsChecked(!isCancellationsChecked);
                    }}
                    error={invalidReasonMessage}
                  />
                  <Checkbox
                    label="Expiring Doses"
                    checked={isExpiringDosesChecked}
                    onChange={() => {
                      setIsExpiringDosesChecked(!isExpiringDosesChecked);
                    }}
                    error={invalidReasonMessage}
                  />
                </Stack>
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
