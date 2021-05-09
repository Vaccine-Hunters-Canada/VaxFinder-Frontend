import React, { useState } from "react";
import { format } from "date-fns-tz";
import {
  Card,
  Banner,
  TextContainer,
  Stack,
  DataTable,
  Button,
} from "@shopify/polaris";
import { DomainsMajor, LocationMajor } from "@shopify/polaris-icons";
import Iframe from "react-iframe";
import { VaccineAvailabilityTimeslotRequirementExpandedResponse } from "../../apiClient";

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
  vaccineAvailabilities: VaccineAvailabilityTimeslotRequirementExpandedResponse[];
}

export function PharmacyCard(props: PharmacyProps) {
  const [shouldShowMap, setShouldShowMap] = useState(false);
  const [shouldShowSlots, setShouldShowSlots] = useState(false);
  const availabilityMarkup = () => {
    if (props.booking) {
      return (
        <Banner status="success">
          <p>
            <strong>Appointments available</strong>
            {props.lastUpdated.length > 0 && (
              <> as of {format(new Date(props.lastUpdated), "MMM d, y")}</>
            )}
          </p>
        </Banner>
      );
    }
    return (
      <Banner status="critical">
        <p>
          <strong>Appointments not available</strong>
          {props.lastUpdated.length > 0 && (
            <> as of {format(new Date(props.lastUpdated), "MMM d, y")}</>
          )}
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
  const generateRows = () => {
    const rows: (string | number)[][] = [];
    props.vaccineAvailabilities.forEach((availability) => {
      const newRow = [availability.date, availability.numberAvailable];
      rows.push(newRow);
    });
    return rows;
  };
  const dataTableMarkup = shouldShowSlots ? (
    <DataTable
      columnContentTypes={["text", "numeric"]}
      headings={["Date", "Quantity"]}
      rows={generateRows()}
    />
  ) : undefined;

  const appointmentsAvailableMarkup = () => {
    if (props.vaccineAvailabilities.length !== 0) {
      return (
        <Card.Section title="Dates">
          <Button
            primary
            onClick={() => {
              setShouldShowSlots(!shouldShowSlots);
            }}
          >
            See Slots
          </Button>
          {dataTableMarkup}
        </Card.Section>
      );
    }
    return undefined;
  };
  return (
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
      <div data-testid="pharmacy-card">
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
          {appointmentsAvailableMarkup()}
        </TextContainer>
        {shouldShowMap ? <Map /> : null}
      </div>
    </Card>
  );
}
