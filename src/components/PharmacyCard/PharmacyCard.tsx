import React, { useState } from "react";
import Iframe from "react-iframe";
import { format } from "date-fns-tz";
import {
  Card,
  Link,
  Banner,
  TextContainer,
  Stack,
  Layout,
  Button,
} from "@shopify/polaris";
import {
  MobileAcceptMajor,
  CircleDisabledMajor,
  LocationMajor,
} from "@shopify/polaris-icons";

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
  const [showMap, setShowMap] = useState(false);

  const updatePharmacy = (availability: boolean) => {
    const time = new Date();
    setlastUpdated(time.toLocaleString());
    setBooking(availability);
  };

  const showTheMap = () => {
    setShowMap(true);
  };

  const Map = () => (
    <Iframe
      // the key is hardcoded for now, but there's no rate limit or usage limit for embedding
      url={`https://www.google.com/maps/embed/v1/place?q=${props.address}&key=AIzaSyCJF0WPrXAbLIePWWFbS7rRxdCBaY8pjAs`}
      width="450px"
      height="450px"
      id="myId"
      className="myClassname"
      position="relative"
    />
  );

  const availabilityMarkup = () => {
    if (booking) {
      return (
        <Banner status="success">
          <p>
            <strong>Appointments available</strong> as of{" "}
            {format(new Date(lastUpdated), "MMM d y, h:mm a z")}
          </p>
        </Banner>
      );
    }
    return (
      <Banner status="critical">
        <p>
          <strong>Appointments not available</strong> as of{" "}
          {format(new Date(lastUpdated), "MMM d y, h:mm a z")}
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
            setShowMap(true);
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
              <Stack>
                {showMap ? null : (
                  <Stack.Item>
                    <Button icon={LocationMajor} onClick={showTheMap}>
                      Load map and directions
                    </Button>
                  </Stack.Item>
                )}
              </Stack>
            </Card.Subsection>
          </Card.Section>
        </TextContainer>
        {showMap ? <Map /> : null}
      </Card>
    </Layout.Section>
  );
}
