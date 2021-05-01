import React, { useCallback, useState } from "react";
import "@shopify/polaris/styles.css";
import { Frame, TopBar, Navigation, AppProvider } from "@shopify/polaris";
import { HomeMajor } from "@shopify/polaris-icons";
import { Home } from "./components/Home";
import { theme } from "./theme";
import enTranslations from "@shopify/polaris/locales/en.json";
import { RestfulProvider } from "restful-react";

export function App() {
  const [menuState, setMenuState] = useState("home");
  const setPageMarkup = useCallback((value) => setMenuState(value), []);

  /*
  const userMenuMarkup = (
    <TopBar.UserMenu
      initials="EH"
      actions={[]}
      name=""
      onToggle={() => undefined}
      open={false}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      placeholder="Search"
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange={() => {}}
      showFocusBorder
      value=""
    />
  );
  */
  const topBarMarkup = (
    <TopBar
      // theme={topBarTheme}
      showNavigationToggle
      // userMenu={userMenuMarkup}
      // searchField={searchFieldMarkup}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        separator
        items={[
          {
            label: "Home",
            icon: HomeMajor,
            onClick: () => setPageMarkup("home"),
          },
          // {
          //   label: "Ottawa",

          //   onClick: () => setPageMarkup("home"),
          // },
          // {
          //   label: "Toronto",

          //   onClick: () => setPageMarkup("home"),
          // },
        ]}
      />
    </Navigation>
  );

  const getCurrentMarkup = () => {
    switch (menuState) {
      default:
        return <Home />;
    }
  };

  return (
    <AppProvider theme={theme} i18n={enTranslations}>
      <RestfulProvider base={process.env.REACT_APP_API_URL ?? ""}>
        <Frame topBar={topBarMarkup} navigation={navigationMarkup}>
          {getCurrentMarkup()}
        </Frame>
      </RestfulProvider>
    </AppProvider>
  );
}
