import React from "react";
import { Home } from "../containers/Home";
import { Footer } from "../components/Footer";

// eslint-disable-next-line import/no-default-export
export default function HomeRoute() {
  return (
    <>
      <Home />
      <Footer />
    </>
  );
}
