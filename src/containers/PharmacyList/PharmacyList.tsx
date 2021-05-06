import { PharmacyCard } from "../../components/PharmacyCard";
import React, { useState } from "react";
import { useListVaccineAvailabilityApiV1VaccineAvailabilityGet } from "../../apiClient";
import { ExceptionList, Spinner, TextStyle } from "@shopify/polaris";
import { CircleAlertMajor } from "@shopify/polaris-icons";
import "./PharmacyList.css";
import { EligibilityBanner } from "../../components/EligibilityBanner";

type PharmacyProps = React.ComponentProps<typeof PharmacyCard>;

interface Props {
  postalCode: string;
}

export function PharmacyList(props: Props) {
  const {
    data,
    loading,
    error,
  } = useListVaccineAvailabilityApiV1VaccineAvailabilityGet({
    queryParams: {
      postalCode: props.postalCode,
    },
  });
  const [shouldShowBanner, setShouldShowBanner] = useState(true);

  if (loading) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel="Loading pharmacy data" />
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
                  <strong>
                    Could not load pharmacy data, please try again later
                  </strong>
                </TextStyle>
              ),
            },
          ]}
        />
      </div>
    );
  }

  let pharmacyListUnsorted: PharmacyProps[] = [];

  if (data) {
    pharmacyListUnsorted = data.map((pharmacy) => {
      const addressSegments: string[] = [];

      const { address } = pharmacy.location;
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
      const isBooking = pharmacy.numberAvailable > 0;

      return {
        id: pharmacy.id,
        pharmacyName: pharmacy.location.name,
        booking: isBooking,
        address: addressSegments.join("  "),
        lastUpdated: pharmacy.created_at,
        phone: pharmacy.location.phone || "",
        website: pharmacy.location.url || "",
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
