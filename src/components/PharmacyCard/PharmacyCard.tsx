import React, { useState } from "react";
import {
  Card,
  Link,
  Banner,
  TextContainer,
  Stack,
  Layout,
} from "@shopify/polaris";
import { MobileAcceptMajor, CircleDisabledMajor } from "@shopify/polaris-icons";

interface PharmacyProps {
  // Id used for creating React keys
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  pharmacyName: string;
  booking: boolean;
  address: string;
  phone: string;
  website: string;
  lastUpdated: string;
}

export function PharmacyCard(props: PharmacyProps) {
  const [booking, setBooking] = useState(props.booking);
  const [lastUpdated, setlastUpdated] = useState(props.lastUpdated);

  const updatePharmacy = (availability: boolean) => {
    const time = new Date();
    setlastUpdated(time.toLocaleString());
    setBooking(availability);
  };

  const availabilityMarkup = () => {
    if (booking) {
      return (
        <Banner status="success">
          <p>
            <strong>Appointments available</strong> as of {lastUpdated}
          </p>
        </Banner>
      );
    }
    return (
      <Banner status="critical">
        <p>
          <strong>Appointments not available</strong> as of {lastUpdated}
        </p>
      </Banner>
    );
  };
  return (
    <Layout.Section>
      <Card
        title={props.pharmacyName}
        sectioned
        primaryFooterAction={{
          content: "Report Availability",
          icon: MobileAcceptMajor,
          onAction: () => {
            updatePharmacy(true);
          },
        }}
        secondaryFooterActions={[
          {
            content: "Report No Availability",
            icon: CircleDisabledMajor,
            onAction: () => {
              updatePharmacy(false);
            },
          },
        ]}
      >
        <TextContainer>
          <Card.Section fullWidth>{availabilityMarkup()}</Card.Section>
          <Card.Section title="Store Info">
            <Card.Subsection>{props.address}</Card.Subsection>
            <Card.Subsection>
              <Stack>
                <Stack.Item>{props.phone}</Stack.Item>
              </Stack>
              <Stack>
                <Stack.Item>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link url={props.website}>{props.website}</Link>
                </Stack.Item>
              </Stack>
            </Card.Subsection>
          </Card.Section>
        </TextContainer>
      </Card>
    </Layout.Section>
  );
}
