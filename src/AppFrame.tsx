import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { Frame, Layout, Navigation, Page, TopBar } from "@shopify/polaris";
import { HomeMajor, QuestionMarkMajor } from "@shopify/polaris-icons";
import { Routes } from "./Routes";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export function AppFrame() {
  const location = useLocation();
  const [isMobileNavigationActive, setIsMobileNavigationActive] = useState(
    false,
  );

  const handleMobileNavigationToggle = useCallback(
    () => setIsMobileNavigationActive((isActive) => !isActive),
    [],
  );

  return (
    <Frame
      topBar={
        <TopBar
          showNavigationToggle
          onNavigationToggle={handleMobileNavigationToggle}
        />
      }
      navigation={
        <Navigation location={location.pathname}>
          <Navigation.Section
            separator
            items={[
              {
                url: "/",
                label: "Home",
                icon: HomeMajor,
                selected: location.pathname.trim() === "/",
              },
              {
                url: "/faq",
                label: "FAQ",
                icon: QuestionMarkMajor,
                selected: location.pathname.trim() === "/faq",
              },
            ]}
          />
        </Navigation>
      }
      showMobileNavigation={isMobileNavigationActive}
      onNavigationDismiss={handleMobileNavigationToggle}
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
