import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { Frame, Layout, Navigation, Page, TopBar } from "@shopify/polaris";
import { HomeMajor } from "@shopify/polaris-icons";
import { Routes } from "./Routes";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ItemProps } from "@shopify/polaris/types/latest/src/components/Navigation/components";
import { Twitter } from "./components/Twitter";

const languages = [
  {
    langCode: "en",
    label: "English",
  },
  {
    langCode: "fr",
    label: "Français",
  },
  {
    langCode: "ar",
    label: "العربية",
  },
  {
    langCode: "bn",
    label: "বাংলা",
  },
  {
    langCode: "de",
    label: "Deutsch",
  },
  {
    langCode: "es",
    label: "Español",
  },
  {
    langCode: "hr",
    label: "Hrvatski",
  },
  {
    langCode: "it",
    label: "Italiano",
  },
  {
    langCode: "he",
    label: "עברית",
  },
  {
    langCode: "hu",
    label: "Magyar",
  },
  {
    langCode: "ja",
    label: "日本語",
  },
  {
    langCode: "pl",
    label: "Polski",
  },
  {
    langCode: "pt",
    label: "Português",
  },
  {
    langCode: "ro",
    label: "Română",
  },
  {
    langCode: "ru",
    label: "Русский",
  },
  {
    langCode: "sr",
    label: "Srpski",
  },
  {
    langCode: "ta",
    label: "தமிழ்",
  },
  {
    langCode: "tl",
    label: "Tagalog",
  },
  {
    langCode: "tr",
    label: "Türkçe",
  },
  {
    langCode: "zh-CN",
    label: "简体中文",
  },
  {
    langCode: "zh-TW",
    label: "繁體中文",
  },
];

function getLanguageBarItemProps(): ItemProps[] {
  const output: ItemProps[] = languages.map((language) => {
    const selected =
      i18next.language === language.langCode ||
      i18next.language?.substring(0, 2) === language.langCode;
    return {
      url: "/",
      label: language.label,
      onClick: () => {
        i18next
          .changeLanguage(language.langCode)
          .then(() => {
            // Success
          })
          .catch(() => {
            // Failure
          });
      },
      selected: selected,
    };
  });
  return output;
}

export function AppFrame() {
  const { t } = useTranslation(undefined, { useSuspense: false });
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
                label: t("home"),
                icon: HomeMajor,
              },
            ]}
          />
          <Navigation.Section
            separator
            title={t("language")}
            items={getLanguageBarItemProps()}
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
            <iframe
              title="Discord Link"
              src="https://discord.com/widget?id=822486436837326908&theme=dark"
              width="100%"
              height="400"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
            <Twitter />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
