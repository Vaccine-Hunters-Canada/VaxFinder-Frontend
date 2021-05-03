import { PharmacyCard } from "../PharmacyCard";
import React from "react";
import { useListVaccineAvailabilityApiV1VaccineAvailabilityGet } from "../../apiClient";
import { ExceptionList, Spinner, TextStyle } from "@shopify/polaris";
import { CircleAlertMajor } from "@shopify/polaris-icons";
import "./PharmacyList.css";

type PharmacyProps = React.ComponentProps<typeof PharmacyCard>;

export function PharmacyList() {
  const {
    data,
    loading,
    error,
  } = useListVaccineAvailabilityApiV1VaccineAvailabilityGet({
    queryParams: {
      postalCode: "A1B 2G6",
    },
  });

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

  let pharmacyList: PharmacyProps[] = [];

  if (data) {
    pharmacyList = data.map((pharmacy) => {
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

  return (
    <section>
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
  );
}
