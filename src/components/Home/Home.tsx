import {
  Layout,
  Page,
  TextStyle,
  Banner,
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { PharmacyList } from "../PharmacyList";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [showPostalPrompt, setShowPostalPrompt] = useState(true);
  const [showInvalidPostal, setShowInvalidPostal] = useState(false);
  const [renderCards, setRenderCards] = useState(false);
  const [postalCode, setPostalCode] = useState("");

  const handleBannerDismiss = () => {
    setShowBanner(false);
  };
  const dismissableBannerMarkup = showBanner ? (
    <>
      <Banner title="Eligibility:" onDismiss={handleBannerDismiss}>
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
      <br />
      <br />
    </>
  ) : null;

  const handleSubmit = () => {
    const postalCodeRegex = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    if (postalCodeRegex.test(postalCode)) {
      setRenderCards(true);
      setShowPostalPrompt(false);
    } else {
      setShowInvalidPostal(true);
    }
  };
  const afterPostalEntryMarkup = renderCards ? (
    <>
      <TextStyle variation="subdued">
        Here&apos;s what&apos;s happening with vaccinations in Ottawa
      </TextStyle>
      <br />
      <br />
      {dismissableBannerMarkup}
      <PharmacyList />
    </>
  ) : null;

  const postalLabelMarkup = showInvalidPostal
    ? "You have entered an invalid postal code. Please enter a valid one in this format: K2T 0E5"
    : "Please enter your postal code (Example: K2T 0E5):";
  const promptForPostalMarkup = showPostalPrompt ? (
    <>
      <br />
      <br />
      <Card>
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={postalCode}
                onChange={(postal) => setPostalCode(postal)}
                label={postalLabelMarkup}
                helpText={
                  <span>
                    We’ll use this postal code to find the closest available
                    vaccines.
                  </span>
                }
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
            <br />
            <br />
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
