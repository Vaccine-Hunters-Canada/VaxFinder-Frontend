import { PharmacyContainer } from "../PharmacyContainer";
import React from "react";
import { useListVaccineAvailabilityApiV1VaccineAvailabilityGet } from "../../apiClient";

interface Pharmacy {
  id: string;
  pharmacyName: string;
  booking: boolean;
  address: string;
  phone: string;
  website: string;
  lastUpdated: string;
}

export function PharmacyList() {
  const { data } = useListVaccineAvailabilityApiV1VaccineAvailabilityGet({
    queryParams: {
      postalCode: "A1B 2G6",
    },
  });

  const pharmacyList: Pharmacy[] = [
    {
      id: "1",
      pharmacyName: "Stittsville IDA",
      booking: true,
      address: "250 Stittsville Main St. Stittsville, ON K2S 1S9",
      phone: "613-835-3881",
      website: "https://idapharmacy.com/",
      lastUpdated: "N/a",
    },
    {
      id: "2",
      pharmacyName: "Costco Kanata",
      booking: false,
      address: "770 Silver Seven Road Ottawa, ON K2V 0A1",
      phone: " 613-270-5500",
      website: " https://www.costcopharmacy.ca/appointment",
      lastUpdated: "N/a",
    },
    {
      id: "3",
      pharmacyName: "Example Pharmacy 1",
      booking: false,
      address: "123 Road Ottawa, ON K2V 0A1",
      phone: " 613-111-1111",
      website: " https://www.website.ca/appointment",
      lastUpdated: "N/a",
    },
    {
      id: "4",
      pharmacyName: "Example Pharmacy 2",
      booking: false,
      address: "123 Road Ottawa, ON K2V 0A1",
      phone: " 613-111-1111",
      website: " https://www.website.ca/appointment",
      lastUpdated: "N/a",
    },
  ];

  return (
    <section>
      {pharmacyList
        ? pharmacyList.map((pharmacy: Pharmacy) => {
            return <PharmacyContainer key={pharmacy.id} pharmacy={pharmacy} />;
          })
        : null}

      {data ? <div>{data}</div> : undefined}
    </section>
  );
}
