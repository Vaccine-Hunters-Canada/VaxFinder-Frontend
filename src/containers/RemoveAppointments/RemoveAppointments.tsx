import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Redirect, useLocation, useHistory } from "react-router-dom";
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
  // A collection of ids for availabilities to be updated one at a time
  const [availabilityIdsToUpdate, setAvailabilityIdsToUpdate] = useState<
    string[]
  >([""]);
  // The id of the availability currently being updated
  const [avaibilityIdToUpdate, setAvailabilityIdToUpdate] = useState<string>(
    "",
  );
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  const { t } = useTranslation();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const key = Array.isArray(params.externalKey)
    ? params.externalKey[0]
    : params.externalKey;

  const organizationId = Array.isArray(params.organizationId)
    ? params.organizationId[0]
    : params.organizationId;

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

  // Check to see if we have transitioned from loading to not loading of an availability update request
  // - with the absence of an error - that indicates a PUT request succeeded and we should queue up our next
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

  // If our current availability id transitions, a request has just been completed and we can
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
  }, [
    avaibilityIdToUpdate,
    availabilitiesData,
    previousAvailabiltyIdToUpdate,
    put,
  ]);

  useEffect(() => {
    if (isUpdateSuccessful) {
      const queryParams = new URLSearchParams();
      queryParams.append("externalKey", key!);
      queryParams.append("organizationId", organizationId!);
      queryParams.append("saveSuccess", "true");
      history.push(`/admin/pharmacistLanding?${queryParams.toString()}`);
    }
  }, [history, isUpdateSuccessful, key, organizationId, search]);

  if (!params.externalKey) {
    // Where should we redirect to??
    return <Redirect to="/" />;
  }

  if (locationError?.status === 404) {
    return (
      <Card>
        <Banner title="Error" status="critical">
          Could not find the location specified.
        </Banner>
      </Card>
    );
  }

  if (locationError || availabilitiesError || updateAvailabilityError) {
    return (
      <Card>
        <Banner title="Error" status="critical">
          {t("anerrorhasoccurred")}
        </Banner>
      </Card>
    );
  }

  // I need to check for availabilities data, not just the loading prop
  // In the course of my tests, it seemed like after the request was made, there
  // was a render where loading was false AND data was still null
  if (locationLoading || availabilitiesLoading || !availabilitiesData) {
    return (
      <div className="wrapper">
        <Spinner accessibilityLabel="Loading" />
      </div>
    );
  }

  const discordWebhook = () => {
    // Ensure we don't invoke this during test runs and development
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      "https://discord.com/api/webhooks/835390954763714571/1b6alfBpNDbvHnsNAxPSf5jzJDUZ0cCSsv5iu2JIDzMWoygMgxD_QADALJy49j87A3lb",
    );
    request.setRequestHeader("Content-type", "application/json");

    if (locationData) {
      const tagsCommaSeparatedString: string[] = [];

      if (locationData.address?.line1) {
        tagsCommaSeparatedString.push(locationData.address?.line1);
      }
      if (locationData.address?.city) {
        tagsCommaSeparatedString.push(locationData.address?.city);
      }
      if (locationData.address?.province) {
        tagsCommaSeparatedString.push(locationData.address?.province);
      }
      if (locationData.address?.postcode) {
        tagsCommaSeparatedString.push(locationData.address?.postcode);
      }
      const discordParams = {
        username: "Pharmacy Updates",
        avatar_url: "https://vaccinehunters.ca/favicon.ico",
        content: "<@&835240707241148428>",
        embeds: [
          {
            title: `No doses left for ${
              locationData.name
            } at ${tagsCommaSeparatedString.filter((val) => !!val).join(", ")}`,
            description:
              "This pharmacy has reported that they no longer have any doses",
          },
        ],
      };
      request.send(JSON.stringify(discordParams));
    }
  };

  const handleSubmit = () => {
    discordWebhook();
    const WEB_INPUT_TYPE = 2;
    const availabilityIdsInputByWeb =
      availabilitiesData
        ?.filter((a) => a.inputType === WEB_INPUT_TYPE)
        .map((a) => a.id) || [];

    if (availabilityIdsInputByWeb.length > 0) {
      const [first, ...rest] = availabilityIdsInputByWeb;
      setAvailabilityIdToUpdate(first);
      setAvailabilityIdsToUpdate(rest);
    } else {
      setIsUpdateSuccessful(true);
    }
  };

  return (
    <Card>
      <Card.Section>
        <p>Remove appointments</p>

        <Button
          primary
          onClick={handleSubmit}
          disabled={updateAvailabilityLoading}
        >
          Remove
        </Button>
      </Card.Section>
    </Card>
  );
}
