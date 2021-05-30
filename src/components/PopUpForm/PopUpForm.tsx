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
import React, { useState } from "react";
import { postalCodeIsValid } from "../../utils";

export function PopUpForm() {
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
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [vaccineType, setVaccineType] = useState(1);
  /* eslint-enable  @typescript-eslint/no-unused-vars */
  const [active, setActive] = useState(false);

  let UTCDate: Date;

  const handleSubmit = () => {
    let valid = true;
    if (!name) {
      setShouldShowInvalidName(true);
      valid = false;
    } else {
      setShouldShowInvalidName(false);
    }

    if (!date) {
      setShouldShowInvalidDate(true);
      valid = false;
    } else {
      setShouldShowInvalidDate(false);
      /* eslint-disable  @typescript-eslint/no-unused-vars */
      UTCDate = new Date(date);
      /* eslint-enable  @typescript-eslint/no-unused-vars */
    }

    if (!address) {
      setShouldShowInvalidAddress(true);
      valid = false;
    } else {
      setShouldShowInvalidAddress(false);
    }

    if (!city) {
      setShouldShowInvalidCity(true);
      valid = false;
    } else {
      setShouldShowInvalidCity(false);
    }

    if (!province) {
      setShouldShowInvalidProvince(true);
      valid = false;
    } else {
      setShouldShowInvalidProvince(false);
    }

    if (!postalCodeIsValid(postalCode)) {
      setShouldShowInvalidPostal(true);
      valid = false;
    } else {
      setShouldShowInvalidPostal(false);
    }

    if (!website) {
      setShouldShowInvalidURL(true);
      valid = false;
    } else {
      setShouldShowInvalidURL(false);
    }

    if (valid) {
      // POST here
    }
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
    <Button onClick={() => setActive(!active)} disclosure>
      {vaccineTypeString}
    </Button>
  );
  return (
    <section aria-label="pop-up" style={{ marginBottom: "2rem" }}>
      <Card>
        <Banner title="Submission Warning" status="warning">
          Once you hit submit, this will record will immediately added to the
          live website.
          <strong> PLEASE TRIPLE CHECK YOUR ENTRY BEFORE SUBMITTING.</strong>
        </Banner>
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
                      active={active}
                      activator={activator}
                      onClose={() => setActive(!active)}
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
              <Button primary submit>
                Submit
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </section>
  );
}
