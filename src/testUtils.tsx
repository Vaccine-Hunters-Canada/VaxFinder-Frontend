/* eslint-disable no-restricted-imports */
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AppProvider } from "@shopify/polaris";
import { theme } from "./theme";
import enTranslations from "@shopify/polaris/locales/en.json";
import { RestfulProvider } from "restful-react";

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <AppProvider theme={theme} i18n={enTranslations}>
      <RestfulProvider base={process.env.REACT_APP_API_URL ?? ""}>
        {children}
      </RestfulProvider>
    </AppProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
