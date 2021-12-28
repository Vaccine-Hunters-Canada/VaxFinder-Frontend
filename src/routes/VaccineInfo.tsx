import React from "react";
import { Footer } from "../components/Footer";
import { VaccineInfo } from "../containers/VaccineInfo";

// eslint-disable-next-line import/no-default-export
export default function VaccineInfoRoute() {
  return (
    <>
      <VaccineInfo />
      <Footer />
    </>
  );
}
