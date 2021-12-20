/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FooterHelp, Link } from "@shopify/polaris";

interface LocationData {
  url: string;
  name: string;
}

/** Given a postal code, fetch the appropriate location in Canada
 * First letter typically gives the province or territory
 * Nunavut and Northwest Territories are a notable exception, both starting with 'X'
 * See: https://en.wikipedia.org/wiki/Postal_codes_in_Canada#Components_of_a_postal_code
 */
function getLocation(postalCode: string | undefined): LocationData {
  const rootUrl = "https://vaccinehunters.ca";
  const postalDistrict = postalCode?.charAt(0).toUpperCase() ?? "";
  const forwardSortationArea = postalCode?.slice(0, 3).toUpperCase() ?? "";

  if (postalDistrict === "T") {
    return {
      url: `${rootUrl}/alberta`,
      name: "Alberta",
    };
  }
  if (postalDistrict === "V") {
    return {
      url: `${rootUrl}/britishcolumbia`,
      name: "British Columbia",
    };
  }
  if (postalDistrict === "R") {
    return {
      url: `${rootUrl}/manitoba`,
      name: "Manitoba",
    };
  }
  if (postalDistrict === "E") {
    return {
      url: `${rootUrl}/newbrunswick`,
      name: "New Brunswick",
    };
  }
  if (postalDistrict === "A") {
    return {
      url: `${rootUrl}/newfoundlandandlabrador`,
      name: "Newfoundland and Labrador",
    };
  }
  if (postalDistrict === "B") {
    return {
      url: `${rootUrl}/novascotia`,
      name: "Nova Scotia",
    };
  }
  if (["X0A", "X0B", "X0C"].includes(forwardSortationArea)) {
    return {
      url: `${rootUrl}/nunavut`,
      name: "Nunavut",
    };
  }
  if (postalDistrict === "X") {
    return {
      url: `${rootUrl}/northwestterritories`,
      name: "Northwest Territories",
    };
  }
  if (["K", "L", "M", "N"].includes(postalDistrict)) {
    return {
      url: `${rootUrl}/ontario`,
      name: "Ontario",
    };
  }
  if (postalDistrict === "C") {
    return {
      url: `${rootUrl}/princeedwardisland`,
      name: "Prince Edward Island",
    };
  }
  if (["J", "G", "H"].includes(postalDistrict)) {
    return {
      url: `${rootUrl}/quebec`,
      name: "Quebec",
    };
  }
  if (postalDistrict === "S") {
    return {
      url: `${rootUrl}/saskatchewan`,
      name: "Saskatchewan",
    };
  }
  if (postalDistrict === "Y") {
    return {
      url: `${rootUrl}/yukon`,
      name: "Yukon",
    };
  }
  return {
    url: `${rootUrl}/diy`,
    name: "",
  };
}

interface Props {
  postalCode?: string;
}

export function Footer({ postalCode }: Props) {
  const location = getLocation(postalCode);
  return (
    <FooterHelp>
      Get more {location.name} resources{" "}
      <Link external url={location.url}>
        on our DIY pages
      </Link>
      .
    </FooterHelp>
  );
}
