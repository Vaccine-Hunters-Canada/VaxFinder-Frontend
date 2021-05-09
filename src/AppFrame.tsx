/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { Frame, Layout, Navigation, Page, TopBar } from "@shopify/polaris";
import { HomeMajor } from "@shopify/polaris-icons";
import { Routes } from "./Routes";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export function AppFrame() {
  const { t, i18n } = useTranslation(undefined, { useSuspense: false });
  const location = useLocation();
  const [isMobileNavigationActive, setIsMobileNavigationActive] = useState(
    false,
  );
  function languageToggle() {
    // Display link to toggle to whichever language isn't set right now
    // Get language code excluding country
    // Initially language code set by browser so it is something like en-CA or en-US
    if (i18n.language !== undefined && i18n.language.substring(0, 2) === "fr") {
      return "English";
    }
    return "Français";
  }

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
                label: t("home"),
                icon: HomeMajor,
              },
              {
                label: languageToggle(),
                onClick: () => {
                  if (
                    i18n.language !== undefined &&
                    i18n.language.substring(0, 2) === "fr"
                  ) {
                    i18next.changeLanguage("en-CA");
                  } else {
                    i18next.changeLanguage("fr-CA");
                  }
                },
              },
            ]}
          />
        </Navigation>
      }
      showMobileNavigation={isMobileNavigationActive}
      onNavigationDismiss={handleMobileNavigationToggle}
    >
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <Routes />
          </Layout.Section>
          <Layout.Section secondary>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="VaxHuntersCan"
              options={{ height: 800 }}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
