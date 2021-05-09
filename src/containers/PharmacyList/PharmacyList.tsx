import { PharmacyCard } from "../../components/PharmacyCard";
import React, { useState } from "react";
import { useListVaccineLocationsApiV1VaccineLocationsGet } from "../../apiClient";
import { ExceptionList, Spinner, TextStyle } from "@shopify/polaris";
import { CircleAlertMajor, SearchMajor } from "@shopify/polaris-icons";
import "./PharmacyList.css";
import { EligibilityBanner } from "../../components/EligibilityBanner";
import { useTranslation } from "react-i18next";

type PharmacyProps = React.ComponentProps<typeof PharmacyCard>;

interface Props {
  postalCode: string;
}

export function PharmacyList(props: Props) {
  const { t } = useTranslation();
  const postalCodeSearch = props.postalCode
    .toLowerCase()
    .replace(" ", "")
    .substr(0, 3);

  const postalCodeHumanReadable = props.postalCode
    .substr(0, 3)
    .concat(" ")
    .concat(props.postalCode.substr(-3))
    .toUpperCase();

  const {
    data,
    loading,
    error,
  } = useListVaccineLocationsApiV1VaccineLocationsGet({
    queryParams: {
      postal_code: postalCodeSearch,
    },
  });
  const [shouldShowBanner, setShouldShowBanner] = useState(true);

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
      <div className="wrapper">
        <ExceptionList
          items={[
            {
              icon: SearchMajor,
              description: (
                <strong>
                  {t("nopharmacies", { postalCode: postalCodeHumanReadable })}
                </strong>
              ),
            },
          ]}
        />
      </div>
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
        addressSegments.push(address.postcode);
      }
      const isBooking = pharmacy.vaccineAvailabilities.length > 0;

      return {
        id: pharmacy.id,
        pharmacyName: pharmacy.name,
        booking: isBooking,
        address: addressSegments.join(" "),
        lastUpdated: pharmacy.createdAt,
        phone: pharmacy.phone || "",
        website: pharmacy.url || "",
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
                />
              );
            })
          : null}
      </section>
    </>
  );
}
