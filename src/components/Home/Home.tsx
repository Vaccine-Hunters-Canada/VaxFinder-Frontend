import { Layout, Page, TextStyle, Banner } from "@shopify/polaris";
import React, { useState } from "react";
import { PharmacyList } from "../PharmacyList";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export function Home() {
  const [showBanner, setShowBanner] = useState(true);

  const handleBannerDismiss = () => {
    setShowBanner(false);
  };
  const dismissableBannerMarkup = showBanner ? (
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
      <br />
      <br />
    </>
  ) : null;
  return (
    <>
      <Layout>
        <Layout.Section>
          <Page>
            <TextStyle variation="subdued">
              Here&apos;s what&apos;s happening with vaccinations in Ottawa
            </TextStyle>
            <br />
            <br />
            {dismissableBannerMarkup}
            <PharmacyList />
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
