import { PharmacyCard } from "../../components/PharmacyCard";
import React, { useState } from "react";
import {
  useListVaccineLocationsApiV1VaccineLocationsGet,
  VaccineAvailabilityTimeslotRequirementExpandedResponse,
} from "../../apiClient";
import { ExceptionList, Spinner, TextStyle } from "@shopify/polaris";
import { CircleAlertMajor, SearchMajor } from "@shopify/polaris-icons";
import "./PharmacyList.css";
import { EligibilityBanner } from "../../components/EligibilityBanner";
import { useTranslation } from "react-i18next";
import { SearchCard } from "../../components/SearchCard";

import {
  postalCodeIsValid,
  postalCodeToApiFormat,
  postalCodeToHumanFormat,
} from "../../utils";

type PharmacyProps = React.ComponentProps<typeof PharmacyCard>;

interface Props {
  postalCode: string;
}

export function PharmacyList(props: Props) {
  const { t } = useTranslation();

  const {
    data,
    loading,
    error,
  } = useListVaccineLocationsApiV1VaccineLocationsGet({
    queryParams: {
      postal_code: postalCodeToApiFormat(props.postalCode),
    },
  });
  const [shouldShowBanner, setShouldShowBanner] = useState(true);

  if (!postalCodeIsValid(props.postalCode)) {
    return (
      <div className="wrapper">
        <ExceptionList
          items={[
            {
              icon: CircleAlertMajor,
              status: "critical",
              description: (
                <TextStyle variation="negative">
                  <strong>{t("invalidpostal")}</strong>
                </TextStyle>
              ),
            },
          ]}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel={t("loadingpharmacydata")} />
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
                  <strong>{t("couldnotloadpharmacydata")}</strong>
                </TextStyle>
              ),
            },
          ]}
        />
      </div>
    );
  }

  let pharmacyListUnsorted: PharmacyProps[] = [];
  if (data && data.length === 0) {
    return (
      <>
        <SearchCard />
        <div className="wrapper">
          <ExceptionList
            items={[
              {
                icon: SearchMajor,
                description: (
                  <strong>
                    {t("noappointments", {
                      postalCode: postalCodeToHumanFormat(props.postalCode),
                    })}
                  </strong>
                ),
              },
            ]}
          />
        </div>
      </>
    );
  }

  if (data) {
    pharmacyListUnsorted = data.map((pharmacy) => {
      const addressSegments: string[] = [];

      const { address } = pharmacy;
      if (address) {
        if (address.line1) {
          addressSegments.push(address.line1);
        }

        if (address.line2) {
          addressSegments.push(address.line2);
        }

        if (address.city) {
          addressSegments.push(address.city);
        }

        addressSegments.push(address.province);
        addressSegments.push(postalCodeToHumanFormat(address.postcode));
      }

      const vaccineAvailabilitiesWithAvailable: VaccineAvailabilityTimeslotRequirementExpandedResponse[] = pharmacy.vaccineAvailabilities.filter(
        (vaccineAvailability) => {
          return vaccineAvailability.numberAvailable > 0;
        },
      );

      type VaccineAvailabilitiesByDateAndRequirementsInterface = React.ComponentProps<
        typeof PharmacyCard
      >["vaccineAvailabilities"];

      let lastUpdated = pharmacy.createdAt;
      const vaccineAvailabilitiesByDateAndRequirements: VaccineAvailabilitiesByDateAndRequirementsInterface = {};
      vaccineAvailabilitiesWithAvailable.forEach((availability) => {
        if (
          !(availability.date in vaccineAvailabilitiesByDateAndRequirements)
        ) {
          vaccineAvailabilitiesByDateAndRequirements[availability.date] = {
            totalAvailable: 0,
            requirements: [],
            tags: availability.tags || "",
          };
        }
        vaccineAvailabilitiesByDateAndRequirements[
          availability.date
        ].totalAvailable += availability.numberAvailable;
        vaccineAvailabilitiesByDateAndRequirements[
          availability.date
        ].requirements.push({
          ...availability.requirements[0],
          numberAvailable: availability.numberAvailable,
          tags: availability.tags,
        });
        // console.log(vaccineAvailabilitiesByDateAndRequirements);
        lastUpdated =
          availability.createdAt > lastUpdated
            ? availability.createdAt
            : lastUpdated;
      });

      const UNKNOWN_ORGANIZATION_ID = 5;
      return {
        id: pharmacy.id,
        pharmacyName: pharmacy.name,
        booking: vaccineAvailabilitiesWithAvailable.length > 0,
        address: addressSegments.join(" "),
        lastUpdated,
        phone: pharmacy.phone || "",
        website: pharmacy.url || "",
        vaccineAvailabilities: vaccineAvailabilitiesByDateAndRequirements,
        organizationId: pharmacy.organization?.id ?? UNKNOWN_ORGANIZATION_ID,
      };
    });
  }

  const pharmacyList = pharmacyListUnsorted
    .filter((pharmacy) => {
      return pharmacy.booking;
    })
    .concat(
      pharmacyListUnsorted.filter((pharmacy) => {
        return !pharmacy.booking;
      }),
    );

  return (
    <>
      <SearchCard />

      {shouldShowBanner ? (
        <EligibilityBanner onDismiss={() => setShouldShowBanner(false)} />
      ) : null}

      <section aria-label="pharmacy-list" style={{ marginTop: "2rem" }}>
        {pharmacyList
          ? pharmacyList.map((pharmacy) => {
              return (
                <PharmacyCard
                  key={pharmacy.id}
                  id={pharmacy.id}
                  address={pharmacy.address}
                  booking={pharmacy.booking}
                  lastUpdated={pharmacy.lastUpdated}
                  pharmacyName={pharmacy.pharmacyName}
                  phone={pharmacy.phone}
                  website={pharmacy.website}
                  vaccineAvailabilities={pharmacy.vaccineAvailabilities}
                  organizationId={pharmacy.organizationId}
                />
              );
            })
          : null}
      </section>
    </>
  );
}
