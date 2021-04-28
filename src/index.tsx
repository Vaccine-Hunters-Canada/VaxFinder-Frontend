import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

const theme = {
  colors: {
    topBar: {
      background: "#1C2260",
    },
  },
};

ReactDOM.render(
  <AppProvider theme={theme} i18n={enTranslations}>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
