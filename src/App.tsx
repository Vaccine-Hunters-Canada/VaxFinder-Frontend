import React from "react";
import "@shopify/polaris/styles.css";
import { AppProvider } from "@shopify/polaris";
import { theme } from "./theme";
import enTranslations from "@shopify/polaris/locales/en.json";
import { RestfulProvider } from "restful-react";
import { AppFrame } from "./AppFrame";
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <AppProvider theme={theme} i18n={enTranslations}>
        <RestfulProvider base={process.env.REACT_APP_API_URL ?? ""}>
          <AppFrame />
        </RestfulProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
