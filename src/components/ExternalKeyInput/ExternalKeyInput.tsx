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
  ExceptionList,
  ActionListItemDescriptor,
} from "@shopify/polaris";
import React, { useState } from "react";
import { postalCodeIsValid } from "../../utils";
import { useListOrganizationsApiV1OrganizationsGet } from "../../apiClient";
import { CircleAlertMajor } from "@shopify/polaris-icons";

/**
 * Form used to record popup clinic details
 *
 * This component could have benefited from a form management library, but given it
 * was a one-off, it has been developed with controlled components. If we start adding
 * more forms, it might be worthwhile introducing a form lib and refactoring.
 *
 * @returns A form component to record popup clinic details
 */
export function ExternalKeyInput() {
  /** Fetch Organizations */
  const { data, loading, error } = useListOrganizationsApiV1OrganizationsGet(
    {},
  );
  /** Error state */
  const [shouldShowInvalidPostal, setShouldShowInvalidPostal] = useState(false);
  const [
    shouldShowInvalidStreetNumber,
    setShouldShowInvalidStreetNumber,
  ] = useState(false);
  const [
    shouldShowInvalidOrganization,
    setShouldShowInvalidOrganization,
  ] = useState(false);

  /** Controlled component state */
  const [postalCode, setPostalCode] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [organizationId, setOrganizationId] = useState(0);
  const [organizationName, setOrganizationName] = useState(
    "Please Select an Organization",
  );

  const [isPopOverActive, setIsPopOverActive] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!postalCodeIsValid(postalCode)) {
      setShouldShowInvalidPostal(true);
      isValid = false;
    } else {
      setShouldShowInvalidPostal(false);
    }

    if (!streetNumber) {
      setShouldShowInvalidStreetNumber(true);
      isValid = false;
    } else {
      setShouldShowInvalidStreetNumber(false);
    }

    if (organizationId === 0) {
      setShouldShowInvalidOrganization(true);
      isValid = false;
    } else {
      setShouldShowInvalidOrganization(false);
    }

    return isValid;
  };

  const handleSubmit = () => {
    // eslint-disable-next-line no-empty
    if (!validateForm()) {
    }
  };
  const invalidStreetNumber = shouldShowInvalidStreetNumber
    ? "Street number most not be empty."
    : undefined;

  const invalidPostalCodeMessage = shouldShowInvalidPostal
    ? "Invalid Postal Code"
    : undefined;

  const activator = (
    <Button onClick={() => setIsPopOverActive(!isPopOverActive)} disclosure>
      {organizationName}
    </Button>
  );

  const organizationListMarkup = () => {
    if (!data) {
      return [];
    }

    const items: ActionListItemDescriptor[] = data.map((organization) => {
      return {
        content: organization.fullName,
        onAction: () => {
          setOrganizationId(organization.id);
          setOrganizationName(organization.fullName ?? organization.shortName);
          setIsPopOverActive(false);
        },
      };
    });

    return items;
  };

  const postalErrorBanner = shouldShowInvalidPostal ? (
    <Banner title="Please select your organization" status="critical">
      Please select your corresponding organization. If you are independant
      pharmacy, select &quot;Independently Owned Pharmacy&quot;.
    </Banner>
  ) : undefined;

  if (loading) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel="Loading Organization Data" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <ExceptionList
          items={[
            {
              icon: CircleAlertMajor,
              status: "critical",
              description: (
                <TextStyle variation="negative">
                  <strong>Could not load organization data</strong>
                </TextStyle>
              ),
            },
          ]}
        />
      </div>
    );
  }

  return (
    <section aria-label="pop-up" style={{ marginBottom: "2rem" }}>
      <Card>
        {postalErrorBanner}
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  value={postalCode}
                  onChange={setPostalCode}
                  label="Enter Clinic Postal Code"
                  helpText={
                    <span>Enter the postal code of the clinic. IE: K2T0E5</span>
                  }
                  error={invalidPostalCodeMessage}
                  type="text"
                />
                <TextField
                  value={streetNumber}
                  onChange={setStreetNumber}
                  label="Enter your street number."
                  error={invalidStreetNumber}
                  type="number"
                />
                <Stack>
                  <Stack.Item>
                    <TextStyle>Enter Organization</TextStyle>
                    <Popover
                      active={isPopOverActive}
                      activator={activator}
                      onClose={() => setIsPopOverActive(!isPopOverActive)}
                    >
                      <ActionList items={organizationListMarkup()} />
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
