import React from "react";
import { useLocation } from "react-router-dom";
import { Frame, Layout, Navigation, Page, TopBar } from "@shopify/polaris";
import { HomeMajor, GlobeMajor } from "@shopify/polaris-icons";
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
                exactMatch: true,
                label: "Home",
                icon: HomeMajor,
              },
              {
                url: "/communityProjects",
                label: "Community Projects",
                icon: GlobeMajor,
              },
            ]}
          />
        </Navigation>
      }
    >
      <Layout>
        <Layout.Section>
          <Routes />
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
