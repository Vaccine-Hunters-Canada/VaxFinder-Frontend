/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { DisplayText, FooterHelp, Link } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

interface LocationData {
  url: string;
  resourcekey: string;
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
      resourcekey: "province_ab",
    };
  }
  if (postalDistrict === "V") {
    return {
      url: `${rootUrl}/britishcolumbia`,
      resourcekey: "province_bc",
    };
  }
  if (postalDistrict === "R") {
    return {
      url: `${rootUrl}/manitoba`,
      resourcekey: "province_mb",
    };
  }
  if (postalDistrict === "E") {
    return {
      url: `${rootUrl}/newbrunswick`,
      resourcekey: "province_nb",
    };
  }
  if (postalDistrict === "A") {
    return {
      url: `${rootUrl}/newfoundlandandlabrador`,
      resourcekey: "province_nl",
    };
  }
  if (postalDistrict === "B") {
    return {
      url: `${rootUrl}/novascotia`,
      resourcekey: "province_ns",
    };
  }
  if (["X0A", "X0B", "X0C"].includes(forwardSortationArea)) {
    return {
      url: `${rootUrl}/nunavut`,
      resourcekey: "province_nu",
    };
  }
  if (postalDistrict === "X") {
    return {
      url: `${rootUrl}/northwestterritories`,
      resourcekey: "province_nt",
    };
  }
  if (["K", "L", "M", "N"].includes(postalDistrict)) {
    return {
      url: `${rootUrl}/ontario`,
      resourcekey: "province_on",
    };
  }
  if (postalDistrict === "C") {
    return {
      url: `${rootUrl}/princeedwardisland`,
      resourcekey: "province_pe",
    };
  }
  if (["J", "G", "H"].includes(postalDistrict)) {
    return {
      url: `${rootUrl}/quebec`,
      resourcekey: "province_qc",
    };
  }
  if (postalDistrict === "S") {
    return {
      url: `${rootUrl}/saskatchewan`,
      resourcekey: "province_sk",
    };
  }
  if (postalDistrict === "Y") {
    return {
      url: `${rootUrl}/yukon`,
      resourcekey: "province_yt",
    };
  }
  return {
    url: `${rootUrl}/diy`,
    resourcekey: "",
  };
}

interface Props {
  postalCode?: string;
}

export function Footer({ postalCode }: Props) {
  const { t } = useTranslation();
  const location = getLocation(postalCode);
  let getmoreresourcestext;
  if (location.resourcekey === "") {
    getmoreresourcestext = t("getmoreresources");
  } else {
    getmoreresourcestext = t("getmoreresourceslocation", {
      location: t(location.resourcekey, { context: "le" }),
    });
  }
  return (
    <FooterHelp>
      <DisplayText size="small">
        {getmoreresourcestext}{" "}
        <Link external url={location.url}>
          {t("onourdiypages")}
        </Link>
        .
      </DisplayText>
    </FooterHelp>
  );
}
