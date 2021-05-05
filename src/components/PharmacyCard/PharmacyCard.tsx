import React from "react";
import { format } from "date-fns-tz";
import { Card, Banner, TextContainer, Stack, Layout } from "@shopify/polaris";
import { DomainsMajor } from "@shopify/polaris-icons";

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
  const availabilityMarkup = () => {
    if (props.booking) {
      return (
        <Banner status="success">
          <p>
            <strong>Appointments available</strong> as of{" "}
            {format(new Date(props.lastUpdated), "MMM d y, h:mm a z")}
          </p>
        </Banner>
      );
    }
    return (
      <Banner status="critical">
        <p>
          <strong>Appointments not available</strong> as of{" "}
          {format(new Date(props.lastUpdated), "MMM d y, h:mm a z")}
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
          content: "Visit Website",
          icon: DomainsMajor,
          external: true,
          url: props.website,
        }}
      >
        <TextContainer>
          <Card.Section fullWidth>{availabilityMarkup()}</Card.Section>
          <Card.Section title="Store Info">
            <Card.Subsection>{props.address}</Card.Subsection>
            <Card.Subsection>
              <Stack>
                <Stack.Item>{props.phone}</Stack.Item>
              </Stack>
            </Card.Subsection>
          </Card.Section>
        </TextContainer>
      </Card>
    </Layout.Section>
  );
}
