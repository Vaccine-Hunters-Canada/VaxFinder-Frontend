import React, { useState } from "react";
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
import { VaccineAvailabilityRequirementsResponse } from "../../apiClient";
import { useTranslation } from "react-i18next";

interface RequirementsWithAvailabilityInterface
  extends VaccineAvailabilityRequirementsResponse {
  numberAvailable: number;
}

interface VaccineAvailabilitiesByDateAndRequirementsInterface {
  [date: string]: {
    totalAvailable: number;
    requirements: RequirementsWithAvailabilityInterface[];
  };
}

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
  vaccineAvailabilities: VaccineAvailabilitiesByDateAndRequirementsInterface;
}

export function PharmacyCard(props: PharmacyProps) {
  const { t, i18n } = useTranslation();
  const [shouldShowMap, setShouldShowMap] = useState(false);
  const [shouldShowSlots, setShouldShowSlots] = useState(false);

  const availabilityMarkup = () => {
    if (props.booking) {
      return (
        <Banner status="success">
          <p>
            <strong>{t("appointmentsavailable")}</strong>
            {props.lastUpdated.length > 0 && (
              <> {t("asof", { date: new Date(props.lastUpdated) })}</>
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
            <> {t("asof", { date: new Date(props.lastUpdated) })}</>
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
      frameBorder={0}
      styles={{ border: "none" }}
    />
  );

  const dataTableRows = Object.keys(props.vaccineAvailabilities).map((date) => {
    return [
      new Date(date).toLocaleDateString(i18n.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      props.vaccineAvailabilities[date].totalAvailable,
    ];
  });

  // TODO:
  // Based off coversations with the backend team, there may be a need to differentiate vaccineAvailabilities
  // by requirements on a given day.  If so, something like the below could work.  We would need to consider
  // styling, inclusion of a total count, etc.
  // const dataTableRowsWithRequirements = () => {
  //   const rows: (string | number)[][] = [];

  //   Object.keys(props.vaccineAvailabilities).forEach((date) => {
  //     rows.push([format(new Date(date), "MMM d, y"), ""]);
  //     props.vaccineAvailabilities[date].requirements.forEach((requirement) => {
  //       rows.push([
  //         `- ${requirement.description}`,
  //         requirement.numberAvailable,
  //       ]);
  //     });
  //   });
  //   return rows;
  // };

  const dataTableMarkup = shouldShowSlots ? (
    <DataTable
      columnContentTypes={["text", "numeric"]}
      headings={[t("date"), t("quantity")]}
      rows={dataTableRows}
    />
  ) : undefined;

  const appointmentsAvailableMarkup = () => {
    if (Object.keys(props.vaccineAvailabilities).length > 0) {
      return (
        <Card.Section title={t("dates")}>
          <Button
            primary
            onClick={() => {
              setShouldShowSlots(!shouldShowSlots);
            }}
          >
            {shouldShowSlots ? t("hide") : t("show")}
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
      <div data-testid="pharmacy-card">
        <TextContainer>
          <Card.Section fullWidth>{availabilityMarkup()}</Card.Section>
          <Card.Section title={t("details")}>
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
