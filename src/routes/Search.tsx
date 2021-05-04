import React from "react";
import { useParams } from "react-router-dom";
import { PharmacyList } from "../containers/PharmacyList";

interface SearchRouteParam {
  postalCode: string;
}

// eslint-disable-next-line import/no-default-export
export default function SearchRoute() {
  const { postalCode } = useParams<SearchRouteParam>();
  return <PharmacyList postalCode={postalCode} />;
}
