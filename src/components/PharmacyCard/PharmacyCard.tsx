import React, { useState } from "react";
import { format } from "date-fns-tz";
import { Card, Banner, TextContainer, Stack, Layout } from "@shopify/polaris";
import { DomainsMajor, LocationMajor } from "@shopify/polaris-icons";
import Iframe from "react-iframe";

interface PharmacyProps {
  // Id used for creating React keys
  // eslint-disable-next-line react/no-unused-prop-types
  id: string | number;
  pharmacyName: string;
  booking: boolean;
  address: string;
  phone: string;
  website: string;
  lastUpdated: string;
}

export function PharmacyCard(props: PharmacyProps) {
  const [shouldShowMap, setShouldShowMap] = useState(false);
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
  const Map = () => (
    <Iframe
      // the key is hardcoded for now, but there's no rate limit or usage limit for embedding
      url={`https://www.google.com/maps/embed/v1/place?q=${props.address}&key=AIzaSyCJF0WPrXAbLIePWWFbS7rRxdCBaY8pjAs`}
      width="100%"
      height="350px"
      position="relative"
      styles={{ border: "none" }}
    />
  );
  return (
    <Layout.Section>
      <div data-testid="pharmacy-card">
        <Card
          title={props.pharmacyName}
          sectioned
          primaryFooterAction={{
            content: "Visit Website",
            icon: DomainsMajor,
            external: true,
            url: props.website,
          }}
          secondaryFooterActions={[
            {
              content: "Load Map",
              icon: LocationMajor,
              onAction: () => {
                setShouldShowMap(!shouldShowMap);
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
              </Card.Subsection>
            </Card.Section>
          </TextContainer>
          {shouldShowMap ? <Map /> : null}
        </Card>
      </div>
    </Layout.Section>
  );
}
