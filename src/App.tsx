import React from "react";
import "@shopify/polaris/styles.css";
import { AppProvider } from "@shopify/polaris";
import { theme } from "./theme";
import enTranslations from "@shopify/polaris/locales/en.json";
import { RestfulProvider } from "restful-react";
import { AppFrame } from "./AppFrame";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { LinkLikeComponentProps } from "@shopify/polaris/types/latest/src/utilities/link";

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

function Link({
  children,
  url = "",
  external,
  ref,
  ...rest
}: LinkLikeComponentProps) {
  // react-router only supports links to pages it can handle itself. It does not
  // support arbirary links, so anything that is not a path-based link should
  // use a reglar old `a` tag
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppProvider theme={theme} i18n={enTranslations} linkComponent={Link}>
        <RestfulProvider base={process.env.REACT_APP_API_URL ?? ""}>
          <AppFrame />
        </RestfulProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
