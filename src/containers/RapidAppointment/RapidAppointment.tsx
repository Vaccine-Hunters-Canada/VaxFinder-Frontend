import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Redirect, useLocation } from "react-router-dom";
import { useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet } from "../../apiClient";
import { Spinner } from "@shopify/polaris";
import { usePrevious } from "../../hooks/usePrevious";

export function RapidAppointment() {
  const { search } = useLocation();
  const params = queryString.parse(search);

  const key = Array.isArray(params.externalKey)
    ? params.externalKey[0]
    : params.externalKey;

  const {
    data,
    error,
    loading,
    refetch,
  } = useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet({
    external_key: key || "",
    lazy: true,
  });

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");

  const previousData = usePrevious(data);
  useEffect(() => {
    if (!previousData && data) {
      setName(data.name);
      setAddress(data.address?.line1 || "");
      setCity(data.address?.city || "");
      setProvince(data.address?.province || "");
      setPostalCode(data.address?.postcode || "");
      setPhoneNumber(data.phone || "");
      setWebsite(data.url || "");
    }
  }, [data, previousData]);

  if (!params.externalKey) {
    return <Redirect to="/admin/externalKey" />;
  }

  if (loading) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel="Loading" />
      </div>
    );
  }

  if (!loading && !data && !error) {
    refetch().catch((err) => console.error(err));
  }

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
}
