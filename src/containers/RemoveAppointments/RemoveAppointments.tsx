import React, { useEffect, useState, useRef } from "react";
import queryString from "query-string";
import { Redirect, useLocation } from "react-router-dom";
import {
  useListVaccineAvailabilityLocationApiV1VaccineAvailabilityLocationGet,
  useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet,
  useUpdateVaccineAvailabilityApiV1VaccineAvailabilityVaccineAvailabilityIdPut,
} from "../../apiClient";
import { Banner, Button, Card, Spinner } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { usePrevious } from "../../hooks/usePrevious";
import { getFormattedZonedDateTime } from "../../utils/getFormattedZonedDateTime";

export function RemoveAppointments() {
  const [avaibilityIdToUpdate, setAvailabilityIdToUpdate] = useState<string>(
    "",
  );
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  const [availabilityIdsToUpdate, setAvailabilityIdsToUpdate] = useState<
    string[]
  >([""]);

  const { t } = useTranslation();
  const { search } = useLocation();
  const params = queryString.parse(search);

  const key = Array.isArray(params.externalKey)
    ? params.externalKey[0]
    : params.externalKey;

  const {
    data: locationData,
    error: locationError,
    loading: locationLoading,
    refetch: locationRefetch,
  } = useRetrieveLocationByExternalKeyApiV1LocationsExternalExternalKeyGet({
    external_key: key || "",
    lazy: true,
  });

  const {
    data: availabilitiesData,
    error: availabilitiesError,
    loading: availabilitiesLoading,
    refetch: availabilitiesRefetch,
  } = useListVaccineAvailabilityLocationApiV1VaccineAvailabilityLocationGet({
    queryParams: {
      locationID: locationData?.id || -1,
    },
    lazy: true,
  });

  const {
    mutate: put,
    loading: updateAvailabilityLoading,
    error: updateAvailabilityError,
  } = useUpdateVaccineAvailabilityApiV1VaccineAvailabilityVaccineAvailabilityIdPut(
    { vaccine_availability_id: avaibilityIdToUpdate },
  );

  // This will trigger on page load and will request location data
  if (!locationLoading && !locationData && !locationError) {
    locationRefetch().catch((err) => console.error(err));
  }

  // This will trigger once location data has ben loaded, and will fetch the
  // availabilities in this location
  const previousLocationData = usePrevious(locationData);
  useEffect(() => {
    if (!previousLocationData && locationData) {
      availabilitiesRefetch().catch((err) => console.error(err));
    }
  }, [availabilitiesRefetch, locationData, previousLocationData]);

  // Check to see if we have transitioned from loading to not loading - with the absence of
  // an error that indicates a PUT requrest succeeded and we should queue up our next
  // availability to be processed if one exists
  const previousUpdateAvailabilitiesLoading = usePrevious(
    updateAvailabilityLoading,
  );
  useEffect(() => {
    if (
      previousUpdateAvailabilitiesLoading &&
      !updateAvailabilityLoading &&
      !updateAvailabilityError
    ) {
      if (availabilityIdsToUpdate.length > 0) {
        const [first, ...rest] = availabilityIdsToUpdate;
        setAvailabilityIdToUpdate(first);
        setAvailabilityIdsToUpdate(rest);
      } else {
        setIsUpdateSuccessful(true);
      }
    }
  }, [
    availabilityIdsToUpdate,
    previousUpdateAvailabilitiesLoading,
    updateAvailabilityError,
    updateAvailabilityLoading,
  ]);

  // If our availability id transitions, a request has just been completed and we can
  // update this new availability
  const previousAvailabiltyIdToUpdate = usePrevious(avaibilityIdToUpdate);
  useEffect(() => {
    if (
      previousAvailabiltyIdToUpdate !== avaibilityIdToUpdate &&
      availabilitiesData
    ) {
      const availaibilityToUpdate = availabilitiesData.find(
        (a) => a.id === avaibilityIdToUpdate,
      )!;

      put({
        ...availaibilityToUpdate,
        date: getFormattedZonedDateTime(new Date(availaibilityToUpdate.date)),
        numberAvailable: 0,
        numberTotal: 0,
      }).catch((err) => console.error(err));
    }
  });

  if (!params.externalKey) {
    // Where should we redirect to??
    return <Redirect to="/" />;
  }

  if (locationLoading || availabilitiesLoading) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel="Loading" />
      </div>
    );
  }

  const handleSubmit = () => {
    const WEB_INPUT_TYPE = 2;
    const availabilityIdsInputByWeb =
      availabilitiesData
        ?.filter((a) => a.inputType === WEB_INPUT_TYPE)
        .map((a) => a.id) || [];
    if (availabilityIdsInputByWeb.length > 0) {
      const [first, ...rest] = availabilityIdsInputByWeb;
      setAvailabilityIdToUpdate(first);
      setAvailabilityIdsToUpdate(rest);
    }
  };

  return (
    <Card>
      {locationError || availabilitiesError || updateAvailabilityError ? (
        <Banner title="Error" status="critical">
          {t("anerrorhasoccurred")}
        </Banner>
      ) : undefined}
      {isUpdateSuccessful ? (
        <Banner title="Success" status="success">
          Success
        </Banner>
      ) : undefined}
      <Card.Section>
        <p>Remove appointments</p>
        <Button
          primary
          submit
          disabled={updateAvailabilityLoading}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card.Section>
    </Card>
  );
}
