import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import "./i18n";
import ReactGA from "react-ga";

// GA-related code could be managed via env vars if we want to go that route
if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("G-R5MC35JKT7");
}

let promise: Promise<void> = Promise.resolve();

/**
 * The following starts our mock api server based on an env var
 */
if (process.env.REACT_APP_MOCK_API === "true") {
  promise = import("./mocks/browser").then(async ({ worker }) => {
    await worker.start();
  });
}

// Using a promise structure to defer rendering until mock api kicks in as
// top-level awaits are too modern
promise
  .then(() => {
    ReactDOM.render(<App />, document.getElementById("root"));
  })
  // We'll add proper logging eventually...
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));
