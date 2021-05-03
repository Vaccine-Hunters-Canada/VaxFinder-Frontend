import React from "react";
import { render } from "./testUtils";
import { App } from "./App";

test("mounts app", () => {
  render(<App />);
});
