import React, { useState } from "react";
import {
  Card,
  Banner,
  TextContainer,
  Stack,
  DataTable,
  Button,
  // Badge,
  Icon,
} from "@shopify/polaris";
import {
  DomainsMajor,
  LocationMajor,
  LocationsMinor,
  PhoneMajor,
} from "@shopify/polaris-icons";
import Iframe from "react-iframe";
import { VaccineAvailabilityRequirementsResponse } from "../../apiClient";
import { useTranslation } from "react-i18next";
import { PharmacyBadge } from "./PharmacyBadge";

interface RequirementsWithAvailabilityInterface
  extends VaccineAvailabilityRequirementsResponse {
  numberAvailable: number;
  tags: string | undefined;
}

interface VaccineAvailabilitiesByDateAndRequirementsInterface {
  [date: string]: {
    totalAvailable: number;
    requirements: RequirementsWithAvailabilityInterface[];
    tags: string;
    timeslots: string[] | undefined;
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
  organizationId: number;
}

export function PharmacyCard(props: PharmacyProps) {
  const { t, i18n } = useTranslation();
  const [shouldShowMap, setShouldShowMap] = useState(false);
  const [shouldShowSlots, setShouldShowSlots] = useState(false);
  // const shouldShowSlots = true;

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

  const POPUP_ORGANIZATION_ID = 25;
  const bannerMarkup = () => {
    if (props.organizationId === POPUP_ORGANIZATION_ID) {
      return (
        <Banner title={t("popupwarning")} status="warning">
          {t("popupwarningmessage")}
        </Banner>
      );
    }
    let returnValue;
    // eslint-disable-next-line consistent-return
    Object.keys(props.vaccineAvailabilities).forEach((availability) => {
      const tags = props.vaccineAvailabilities[availability].tags.split(",");
      if (tags.includes("Cancellation")) {
        returnValue = (
          <Banner title={t("cancellationwarning")} status="warning">
            {t("cancellationwarningmessage")}
          </Banner>
        );
      }
      if (tags.includes("Expiring Doses")) {
        returnValue = (
          <Banner title={t("expiringdose")} status="warning">
            {t("expiringdosemessage")}
          </Banner>
        );
      }
    });
    return returnValue;
  };
  const Map = () => (
    <Iframe
      // the key is hardcoded for now, but there's no rate limit or usage limit for embedding
      url={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
        props.address,
      )}&key=AIzaSyCJF0WPrXAbLIePWWFbS7rRxdCBaY8pjAs`}
      width="100%"
      height="350px"
      position="relative"
      frameBorder={0}
      styles={{ border: "none" }}
    />
  );

  const printtimeslots = (timeslots: string[] | undefined) => {
    if (timeslots !== undefined) {
      return timeslots
        .map((x) => {
          // Convert timeslots to user's local time zone
          return new Date(x).toLocaleTimeString(i18n.language, {
            hour: "numeric",
            minute: "numeric",
          });
        })
        .join(", ");
    }
    return "";
  };

  const dataTableRows = Object.keys(props.vaccineAvailabilities).map((date) => {
    return [
      new Date(date).toLocaleDateString(i18n.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      props.vaccineAvailabilities[date].totalAvailable,
      printtimeslots(props.vaccineAvailabilities[date].timeslots),
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
      headings={[t("date"), t("quantity"), "Timeslots"]}
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

  let tagging = "";
  Object.keys(props.vaccineAvailabilities).forEach((availability) => {
    tagging = props.vaccineAvailabilities[availability].tags;
  });

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
          <Stack spacing="extraTight">
            <PharmacyBadge tags={tagging} />
          </Stack>
          {availabilityMarkup()}
          {appointmentsAvailableMarkup()}
          <Card.Section title={t("details")}>
            <Stack>
              <Icon source={LocationsMinor} color="base" />
              <Card.Subsection>{props.address}</Card.Subsection>
            </Stack>
            <Stack>
              <Icon source={PhoneMajor} color="base" />
              <Stack.Item>
                {props.phone ? props.phone : t("unknownphonenumber")}
              </Stack.Item>
            </Stack>
          </Card.Section>
          {bannerMarkup()}
        </TextContainer>
        {shouldShowMap ? <Map /> : null}
      </div>
    </Card>
  );
}
