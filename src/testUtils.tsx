/* eslint-disable no-restricted-imports */
import React, { ReactElement, Suspense } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AppProvider, Spinner } from "@shopify/polaris";
import { theme } from "./theme";
import enTranslations from "@shopify/polaris/locales/en.json";
import { RestfulProvider } from "restful-react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import i18n from "./i18nfortests";
import { I18nextProvider } from "react-i18next";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => {
  const history = createMemoryHistory();
  const AllTheProviders: React.FC = ({ children }) => {
    return (
      <Router history={history}>
        <AppProvider theme={theme} i18n={enTranslations}>
          <RestfulProvider base={process.env.REACT_APP_API_URL ?? ""}>
            <Suspense fallback={<Spinner />}>
              <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
            </Suspense>
          </RestfulProvider>
        </AppProvider>
      </Router>
    );
  };
  return {
    ...render(ui, { wrapper: AllTheProviders, ...options }),
    history,
  };
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
