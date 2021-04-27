import React, { useCallback, useState } from "react";
import "@shopify/polaris/styles.css";
import { Frame, TopBar, Navigation } from "@shopify/polaris";
import {
  HomeMajorMonotone,
} from "@shopify/polaris-icons";
import Home from "./components/Home";

function App() {
  const [menuState, setMenuState] = useState("home");
  const setPageMarkup = useCallback((value) => setMenuState(value), []);

  const userMenuMarkup = (
    <TopBar.UserMenu initials="EH" />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      placeholder="Search"
      onChange={() => {}}
      showFocusBorder
    />
  );


  const topBarMarkup = (
    <TopBar
      //theme={topBarTheme}
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchField={searchFieldMarkup}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        separator
        items={[
          {
            label: "Home",
            icon: HomeMajorMonotone,
            onClick: () => setPageMarkup("home")
          },
          {
            label: "Ottawa",
            
            onClick: () => setPageMarkup("home")
          },
          {
            label: "Toronto",
           
            onClick: () => setPageMarkup("home")
          }
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
    <Frame topBar={topBarMarkup} navigation={navigationMarkup}>
      {getCurrentMarkup()}
    </Frame>
  );
}

export default App;
