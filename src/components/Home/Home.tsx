import {
  Layout,
  Page,
  Banner,
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
} from "@shopify/polaris";
import React, { useState } from "react";
import { PharmacyList } from "../PharmacyList";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export function Home() {
  const [shouldShowBanner, setShouldShowBanner] = useState(true);
  const [shouldShowPostalPrompt, setShouldShowPostalPrompt] = useState(true);
  const [shouldShowInvalidPostal, setShouldShowInvalidPostal] = useState(false);
  const [shouldRenderPharmacyList, setShouldRenderPharmacyList] = useState(
    false,
  );
  const [postalCode, setPostalCode] = useState("");

  const handleBannerDismiss = () => {
    setShouldShowBanner(false);
  };
  const dismissableBannerMarkup = shouldShowBanner ? (
    <>
      <Banner
        title="Eligibility:"
        onDismiss={handleBannerDismiss}
        status="info"
      >
        <ul>
          <li>
            You are <strong>40+ years</strong> old
          </li>
          <li>
            You are defined as <strong>high-risk</strong> according to this
            document: url here
          </li>
          <li>Insert other eligbility rules</li>
        </ul>
      </Banner>
    </>
  ) : null;

  const handleSubmit = () => {
    const postalCodeRegex = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    if (postalCodeRegex.test(postalCode)) {
      setShouldRenderPharmacyList(true);
      setShouldShowPostalPrompt(false);
    } else {
      setShouldShowInvalidPostal(true);
    }
  };
  const afterPostalEntryMarkup = shouldRenderPharmacyList ? (
    <>
      <Layout.Section>{dismissableBannerMarkup}</Layout.Section>
      <PharmacyList />
    </>
  ) : null;

  const invalidPostalCodeMessage = shouldShowInvalidPostal
    ? "You have entered an invalid postal code"
    : undefined;

  const promptForPostalMarkup = shouldShowPostalPrompt ? (
    <>
      <Card>
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={postalCode}
                onChange={(postal) => setPostalCode(postal)}
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
  ) : null;

  return (
    <>
      <Layout>
        <Layout.Section>
          <Page>
            {promptForPostalMarkup}
            {afterPostalEntryMarkup}
          </Page>
        </Layout.Section>
        <Layout.Section secondary>
          <Page>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="VaxHuntersCan"
              options={{ height: 800 }}
            />
          </Page>
        </Layout.Section>
      </Layout>
    </>
  );
}
