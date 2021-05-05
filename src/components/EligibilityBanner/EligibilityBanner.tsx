import React from "react";
import { Banner, Layout } from "@shopify/polaris";

interface Props {
  onDismiss: () => void;
}

export function EligibilityBanner(props: Props) {
  return (
    <Layout.Section>
      <>
        <Banner title="Eligibility:" onDismiss={props.onDismiss} status="info">
          In order to ensure you are eligible to recieve your vaccine, please
          check your appropriate health authorities vaccination guidelines.
        </Banner>
      </>
    </Layout.Section>
  );
}
