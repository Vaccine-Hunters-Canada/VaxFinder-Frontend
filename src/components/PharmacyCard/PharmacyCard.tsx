import React, { useState } from "react";
import { format } from "date-fns-tz";
import { Card, Banner, TextContainer, Stack } from "@shopify/polaris";
import { DomainsMajor, LocationMajor } from "@shopify/polaris-icons";
import Iframe from "react-iframe";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [shouldShowMap, setShouldShowMap] = useState(false);
  const availabilityMarkup = () => {
    if (props.booking) {
      return (
        <Banner status="success">
          <p>
            <strong>{t("appointmentsavailable")}</strong>
            {props.lastUpdated.length > 0 && (
              <>
                {" "}
                {t("asof")} {format(new Date(props.lastUpdated), "MMM d, y")}
              </>
            )}
          </p>
        </Banner>
      );
    }
    return (
      <Banner status="critical">
        <p>
          <strong>{t("appointmentsnotavailable")}</strong>
          {props.lastUpdated.length > 0 && (
            <>
              {" "}
              {t("asof")} {format(new Date(props.lastUpdated), "MMM d, y")}
            </>
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
  return (
    <Card
      title={props.pharmacyName}
      sectioned
      primaryFooterAction={{
        content: t("visitwebsite"),
        icon: DomainsMajor,
        external: true,
        url: props.website,
      }}
      secondaryFooterActions={[
        {
          content: t("loadmap"),
          icon: LocationMajor,
          onAction: () => {
            setShouldShowMap(!shouldShowMap);
          },
        },
      ]}
    >
      <TextContainer>
        <Card.Section fullWidth>{availabilityMarkup()}</Card.Section>
        <Card.Section title={t("storeinfo")}>
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
  );
}
