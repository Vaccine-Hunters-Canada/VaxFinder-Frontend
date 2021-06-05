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
import { useTranslation } from "react-i18next";
import { usePrevious } from "../../hooks/usePrevious";

export function RapidAppointment() {
  const { search } = useLocation();
  const params = queryString.parse(search);

  const key = Array.isArray(params.externalKey)
    ? params.externalKey[0]
    : params.externalKey;

  const {
    data,
    error,
    loading,
    refetch,
  } = useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet({
    external_key: key || "",
    lazy: true,
  });

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
  const [isCallAheadChecked, setIsCallAheadChecked] = useState(false);
  const [isWalkInChecked, setIsWalkInChecked] = useState(false);
  const [isVisitWebsiteChecked, setIsVisitWebsiteChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [shouldShowExpandedForm, setShouldShowExpandedForm] = useState(true);

  const { t } = useTranslation();

  const previousData = usePrevious(data);
  useEffect(() => {
    if (!previousData && data) {
      setName(data.name);
      setAddress(data.address?.line1 || "");
      setCity(data.address?.city || "");
      setProvince(data.address?.province || "");
      setPostalCode(data.address?.postcode || "");
      setPhoneNumber(data.phone || "");
      setWebsite(data.url || "");
      setShouldShowExpandedForm(false);
    }
  }, [data, previousData]);
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
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    let tagsCommaSeperatedString = "";

    if (isCallAheadChecked) {
      tagsCommaSeperatedString = "Call Ahead";
    }
    if (isWalkInChecked) {
      if (!tagsCommaSeperatedString) {
        tagsCommaSeperatedString = "Walk In";
      } else {
        tagsCommaSeperatedString += ",Walk In";
      }
    }
    if (isVisitWebsiteChecked) {
      if (!tagsCommaSeperatedString) {
        tagsCommaSeperatedString = "Visit Website";
      } else {
        tagsCommaSeperatedString += ",Visit Website";
      }
    }
    if (isEmailChecked) {
      if (!tagsCommaSeperatedString) {
        tagsCommaSeperatedString = "Email";
      } else {
        tagsCommaSeperatedString += ",Email";
      }
    }

    // This request payload will be used for various vaccintion availabilities in addition to popup clinics,
    // some values are hardcoded but I will explain them to the best of my understanding
    // const requestPayload: VaccineAvailabilityExpandedCreateRequest = {
    //   active: 1, // boolean indicating if popup is active
    //   date: format(utcDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    //   inputType: 1, // represents how availability data was recorded - not used at time of writing
    //   name,
    //   numberAvailable: numAvailable ? 1 : Number(numAvailable),
    //   numberTotal: numAvailable ? 1 : Number(numAvailable),
    //   vaccine: vaccineId, // This is the vaccine id
    //   postcode: postalCode.replace(/[\W]/gi, ""),
    //   province,
    //   city,
    //   externalKey: locationId,
    //   line1: address,
    //   line2: "",
    //   notes: "",
    //   organization: 25, // popups are always 25
    //   phone: phoneNumber,
    //   tagsA: tagsCommaSeperatedString,
    //   tagsL: "",
    //   url: getValidUrl(website),
    // };

    // post(requestPayload)
    //   .then((user) => {
    //     setName("");
    //     setDate("");
    //     setAddress("");
    //     setCity("");
    //     setProvince("");
    //     setPostalCode("");
    //     setPhoneNumber("");
    //     setWebsite("");
    //     setNumAvailable("");
    //     setVaccineTypeString("Select Vaccine Type");
    //     setVaccineId(1);
    //     setIsPopUpRequestSuccessful(true);
    //   })
    //   .catch((err) => console.error(err));
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
  const activator = (
    <Button onClick={() => setIsPopOverActive(!isPopOverActive)} disclosure>
      {vaccineTypeString}
    </Button>
  );

  if (!params.externalKey) {
    return <Redirect to="/admin/externalKey" />;
  }

  if (loading) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel="Loading" />
      </div>
    );
  }

  if (!loading && !data && !error) {
    refetch().catch((err) => console.error(err));
  }

  if (shouldShowExpandedForm) {
    return (
      <section aria-label="pop-up" style={{ marginBottom: "2rem" }}>
        <Card>
          <Banner title="Submission Warning" status="warning">
            Once you hit submit, this record will be immediately added to the
            live website.
            <strong> PLEASE TRIPLE CHECK YOUR ENTRY BEFORE SUBMITTING.</strong>
          </Banner>

          {/* {error ? (
            <Banner title="Error" status="critical">
              {t("anerrorhasoccurred")}
            </Banner>
          ) : undefined} */}

          {/* {isPopUpRequestSuccessful ? (
            <Banner title="Success" status="success">
              Your popup has been saved.
            </Banner>
          ) : undefined} */}
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
                    />
                    <Checkbox
                      label="Email"
                      checked={isEmailChecked}
                      onChange={() => {
                        setIsEmailChecked(!isEmailChecked);
                      }}
                    />
                    <Checkbox
                      label="Call Ahead"
                      checked={isCallAheadChecked}
                      onChange={() => {
                        setIsCallAheadChecked(!isCallAheadChecked);
                      }}
                    />
                    <Checkbox
                      label="Visit Website"
                      checked={isVisitWebsiteChecked}
                      onChange={() => {
                        setIsVisitWebsiteChecked(!isVisitWebsiteChecked);
                      }}
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
  return (
    <section aria-label="pop-up" style={{ marginBottom: "2rem" }}>
      <Card>
        <Banner title="Submission Warning" status="warning">
          Once you hit submit, this record will be immediately added to the live
          website.
          <strong> PLEASE TRIPLE CHECK YOUR ENTRY BEFORE SUBMITTING.</strong>
        </Banner>

        {/* {error ? (
          <Banner title="Error" status="critical">
            {t("anerrorhasoccurred")}
          </Banner>
        ) : undefined} */}

        {/* {isPopUpRequestSuccessful ? (
          <Banner title="Success" status="success">
            Your popup has been saved.
          </Banner>
        ) : undefined} */}
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
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
                  />
                  <Checkbox
                    label="Email"
                    checked={isEmailChecked}
                    onChange={() => {
                      setIsEmailChecked(!isEmailChecked);
                    }}
                  />
                  <Checkbox
                    label="Call Ahead"
                    checked={isCallAheadChecked}
                    onChange={() => {
                      setIsCallAheadChecked(!isCallAheadChecked);
                    }}
                  />
                  <Checkbox
                    label="Visit Website"
                    checked={isVisitWebsiteChecked}
                    onChange={() => {
                      setIsVisitWebsiteChecked(!isVisitWebsiteChecked);
                    }}
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
