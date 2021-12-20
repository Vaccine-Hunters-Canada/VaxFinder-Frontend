/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FooterHelp, Link } from "@shopify/polaris";

interface LocationData {
  url: string;
  name: string;
}

function getLocation(postalCode: string | undefined): LocationData {
  const rootUrl = "https://vaccinehunters.ca";
  switch (postalCode?.charAt(0).toUpperCase() ?? "") {
    case "T":
      return {
        url: `${rootUrl}/alberta`,
        name: "Alberta",
      };
    case "V":
      return {
        url: `${rootUrl}/britishcolumbia`,
        name: "British Columbia",
      };
    case "R":
      return {
        url: `${rootUrl}/manitoba`,
        name: "Manitoba",
      };
    case "E":
      return {
        url: `${rootUrl}/newbrunswick`,
        name: "New Brunswick",
      };
    case "A":
      return {
        url: `${rootUrl}/newfoundlandandlabrador`,
        name: "Newfoundland and Labrador",
      };
    case "B":
      return {
        url: `${rootUrl}/novascotia`,
        name: "Nova Scotia",
      };
    case "X":
      return {
        url: `${rootUrl}/nunavut`,
        name: "Nunavut",
      };
    case "K":
    case "L":
    case "M":
    case "N":
    case "P":
      return {
        url: `${rootUrl}/ontario`,
        name: "Ontario",
      };
    case "C":
      return {
        url: `${rootUrl}/princeedwardisland`,
        name: "Prince Edward Island",
      };
    case "J":
    case "G":
    case "H":
      return {
        url: `${rootUrl}/quebec`,
        name: "Quebec",
      };
    case "S":
      return {
        url: `${rootUrl}/saskatchewan`,
        name: "Saskatchewan",
      };
    case "Y":
      return {
        url: `${rootUrl}/yukon`,
        name: "Yukon",
      };
    default:
      return {
        url: `${rootUrl}/diy`,
        name: "",
      };
  }
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
