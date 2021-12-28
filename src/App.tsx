import React, { useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import { theme } from "./theme";
import enTranslations from "@shopify/polaris/locales/en.json";
import { RestfulProvider } from "restful-react";
import { AppFrame } from "./AppFrame";
import { BrowserRouter } from "react-router-dom";
import { userService } from "./services/userService";
import { AppContext, AppState } from "./contexts/AppContext";

export function App() {
  const [state, setState] = useState<AppState>({
    user: userService.getUser(),
  });

  const headers: HeadersInit | undefined = state.user?.key
    ? { Authorization: `Bearer ${state.user.key}` || "" }
    : undefined;

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ state, setState }}>
        <AppProvider theme={theme} i18n={enTranslations}>
          <RestfulProvider
            base={process.env.REACT_APP_API_URL ?? ""}
            requestOptions={(url, method, requestBody) => ({
              headers,
            })}
          >
            <AppFrame />
          </RestfulProvider>
        </AppProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
