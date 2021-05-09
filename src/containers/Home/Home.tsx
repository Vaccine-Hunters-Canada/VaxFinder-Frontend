import { Form, FormLayout, TextField, Button, Card } from "@shopify/polaris";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();
  const [shouldShowInvalidPostal, setShouldShowInvalidPostal] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    const postalCodeRegex = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    if (postalCodeRegex.test(postalCode)) {
      history.push(`/search/${postalCode.toLowerCase().replace(" ", "")}`);
    } else {
      setShouldShowInvalidPostal(true);
    }
  };

  const invalidPostalCodeMessage = shouldShowInvalidPostal
    ? t("invalidpostal")
    : undefined;

  return (
    <>
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
              <Button primary submit>
                {t("submit")}
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </>
  );
}
