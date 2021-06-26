import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  RangeSlider,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { postalCodeIsValid, postalCodeToBrowserFormat } from "../../utils";

export function SearchCard() {
  const { t } = useTranslation();
  const [shouldShowInvalidPostal, setShouldShowInvalidPostal] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    if (postalCodeIsValid(postalCode)) {
      history.push(`/search/${postalCodeToBrowserFormat(postalCode)}`);
    } else {
      setShouldShowInvalidPostal(true);
    }
  };

  const [rangeValue, setRangeValue] = useState(32);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  const invalidPostalCodeMessage = shouldShowInvalidPostal
    ? t("invalidpostal")
    : undefined;

  return (
    <section aria-label="search" style={{ marginBottom: "2rem" }}>
      <Card>
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={postalCode}
                onChange={setPostalCode}
                label={t("enterpostalcode")}
                helpText={<span>{t("postalcodetext")}</span>}
                error={invalidPostalCodeMessage}
              />
              <RangeSlider
                label="Choose distance"
                value={rangeValue}
                onChange={handleRangeSliderChange}
                output
              />
              <Button primary submit>
                {t("submit")}
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </section>
  );
}
