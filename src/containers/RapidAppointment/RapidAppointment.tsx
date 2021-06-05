import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

export function RapidAppointment() {
  const { search } = useLocation();
  const params = queryString.parse(search);
  return <div>{params.externalKey}</div>;
}
