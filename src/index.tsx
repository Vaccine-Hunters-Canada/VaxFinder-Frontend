import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

/**
 * The following sarts our mock api server based on an env var
 */
if (process.env.REACT_APP_MOCK_API === "true") {
  import("./mocks/browser")
    .then(({ worker }) => worker.start())
    // Useless finally required as floating promises must be handled appropriately
    .finally(() => undefined);
}

ReactDOM.render(<App />, document.getElementById("root"));
