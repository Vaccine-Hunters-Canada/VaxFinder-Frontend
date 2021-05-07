import React from "react";
import { Banner } from "@shopify/polaris";

interface Props {
  onDismiss: () => void;
}

export function EligibilityBanner(props: Props) {
  return (
    <>
      <Banner title="Eligibility:" onDismiss={props.onDismiss} status="info">
        In order to ensure you are eligible to receive your vaccine, please
        check your appropriate health authority&apos;s vaccination guidelines.
      </Banner>
    </>
  );
}
