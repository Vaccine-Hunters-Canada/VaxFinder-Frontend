import { Form, FormLayout, TextField, Button, Card } from "@shopify/polaris";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export function Home() {
  const [shouldShowInvalidPostal, setShouldShowInvalidPostal] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    const postalCodeRegex = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    if (postalCodeRegex.test(postalCode)) {
      history.push(`/search/${postalCode}`);
    } else {
      setShouldShowInvalidPostal(true);
    }
  };

  const invalidPostalCodeMessage = shouldShowInvalidPostal
    ? "You have entered an invalid postal code"
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
                label="Please enter your postal code (Example: K2T 0E5):"
                helpText={
                  <span>
                    We’ll use this postal code to find the closest available
                    vaccines.
                  </span>
                }
                error={invalidPostalCodeMessage}
              />
              <Button primary submit>
                Submit
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </>
  );
}
