import React from "react";
import { useLocation } from "react-router-dom";
import { Frame, Layout, Navigation, Page, TopBar } from "@shopify/polaris";
import { HomeMajor } from "@shopify/polaris-icons";
import { Routes } from "./Routes";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export function AppFrame() {
  const location = useLocation();

  return (
    <Frame
      topBar={<TopBar showNavigationToggle />}
      navigation={
        <Navigation location={location.pathname}>
          <Navigation.Section
            separator
            items={[
              {
                url: "/",
                label: "Home",
                icon: HomeMajor,
              },
            ]}
          />
        </Navigation>
      }
    >
      <Layout>
        <Layout.Section>
          <Page>
            <Routes />
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
    </Frame>
  );
}
