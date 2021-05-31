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
} from "@shopify/polaris";
import slugify from "slugify";
import React, { useState } from "react";
import { postalCodeIsValid } from "../../utils";
import {
  useCreateVaccineAvailabilityExpandedKeyApiV1VaccineAvailabilityLocationsKeyExternalKeyPost,
  VaccineAvailabilityExpandedCreateRequest,
} from "../../apiClient";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

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
  const [vaccineType, setVaccineType] = useState(1);
  const [isPopOverActive, setIsPopOverActive] = useState(false);

  const [isPopUpRequestSuccessful, setIsPopUpRequestSuccessful] = useState(
    false,
  );

  const slug = slugify(`popup-${address}`, { locale: "fr" });
  const {
    mutate: post,
    loading,
    error,
  } = useCreateVaccineAvailabilityExpandedKeyApiV1VaccineAvailabilityLocationsKeyExternalKeyPost(
    { external_key: slug },
  );

  const { t } = useTranslation();

  const getValidUrl = (url = "") => {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if (/^(:\/\/)/.test(newUrl)) {
      return `http${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `http://${newUrl}`;
    }

    return newUrl;
  };

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

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const utcDate = zonedTimeToUtc(
      date,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );

    const requestPayload: VaccineAvailabilityExpandedCreateRequest = {
      active: 1,
      date: format(utcDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      inputType: 2,
      name,
      numberAvailable: 2,
      numberTotal: 1,
      vaccine: vaccineType,
      postcode: postalCode,
      province,
      city,
      externalKey: slug,
      line1: address,
      line2: "",
      notes: "",
      organization: 25, // popups are always 25
      phone: phoneNumber,
      tagsA: "",
      tagsL: "",
      url: getValidUrl(website),
    };

    post(requestPayload)
      .then((user) => {
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
    ? "Invalid Postal"
    : undefined;

  const invalidURLMessage = shouldShowInvalidURL
    ? "URL must not be empty"
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
                  name="name"
                />
                <TextField
                  value={date}
                  onChange={setDate}
                  label="Enter Date"
                  helpText={<span>Ex: 2021-06-18</span>}
                  error={invalidDateMessage}
                  type="date"
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
              <FormLayout.Group>
                <TextField
                  value={numAvailable}
                  onChange={setNumAvailable}
                  label="Enter Number Available (Optional)"
                  type="number"
                />
                <Stack>
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
                              setVaccineType(3);
                              setVaccineTypeString("Pfizer");
                            },
                          },
                          {
                            content: "Moderna",
                            onAction: () => {
                              setVaccineType(4);
                              setVaccineTypeString("Moderna");
                            },
                          },
                          {
                            content: "AstraZeneca",
                            onAction: () => {
                              setVaccineType(5);
                              setVaccineTypeString("AstraZeneca");
                            },
                          },
                          {
                            content: "Not Sure",
                            onAction: () => {
                              setVaccineType(6);
                              setVaccineTypeString("Not Sure");
                            },
                          },
                        ]}
                      />
                    </Popover>
                  </Stack.Item>
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
