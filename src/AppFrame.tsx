/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Frame, Layout, Navigation, Page, TopBar } from "@shopify/polaris";
import {
  HomeMajor,
  LockMajor,
  CircleInformationMajor,
  ViewMajor,
  NoteMajor,
} from "@shopify/polaris-icons";
import { Routes } from "./Routes";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ItemProps } from "@shopify/polaris/build/ts/latest/src/components/Navigation/components/Item";
import { Twitter } from "./components/Twitter";
import { userService } from "./services/userService";
import { AppContext } from "./contexts/AppContext";
import { usePageViews } from "./hooks/usePageViews";

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
    langCode: "fa",
    label: "فارسی",
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
    langCode: "vi",
    label: "Tiếng Việt",
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
  const { setState } = useContext(AppContext);
  const { t, i18n } = useTranslation(undefined, { useSuspense: false });
  const location = useLocation();
  const [isMobileNavigationActive, setIsMobileNavigationActive] = useState(
    false,
  );

  const handleMobileNavigationToggle = useCallback(
    () => setIsMobileNavigationActive((isActive) => !isActive),
    [],
  );

  usePageViews();
  const history = useHistory();

  // If logged in, force English
  if (userService.checkIsAuthenticated()) {
    if (i18n.language?.substring(0, 2) !== "en") {
      i18next
        .changeLanguage("en")
        .then(() => {
          // Success
        })
        .catch(() => {
          // Failure
        });
    }
  }

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
            items={[
              {
                url: "/vaccineinfo",
                label: t("vaccineinfo"),
                icon: CircleInformationMajor,
              },
            ]}
          />
          {userService.checkIsAuthenticated() ? (
            <Navigation.Section
              separator
              items={[
                {
                  label: t("manageavailabilities"),
                  url: "/admin/externalKey",
                  icon: NoteMajor,
                },
                {
                  label: t("logout"),
                  onClick: () => {
                    userService.removeUser();
                    setState({
                      user: undefined,
                    });
                    history.push("/login");
                  },
                  icon: LockMajor,
                },
              ]}
            />
          ) : (
            <Navigation.Section
              separator
              items={[
                {
                  url: "/login",
                  label: t("login"),
                  icon: LockMajor,
                },
              ]}
            />
          )}

          <Navigation.Section
            separator
            items={[
              {
                url: "/tos",
                label: t("termsofservice"),
                icon: NoteMajor,
              },
              {
                url: "/privacypolicy",
                label: t("privacypolicy"),
                icon: ViewMajor,
              },
            ]}
          />

          {/* Hide language bar when logged in because admin section is English only */}
          {userService.checkIsAuthenticated() ? (
            ""
          ) : (
            <Navigation.Section
              separator
              title={t("language")}
              items={getLanguageBarItemProps()}
            />
          )}
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
            <Twitter />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
