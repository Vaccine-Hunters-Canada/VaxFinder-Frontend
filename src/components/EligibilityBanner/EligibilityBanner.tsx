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
          <ul>
            <li>
              You are <strong>40+ years</strong> old
            </li>
            <li>
              You are defined as <strong>high-risk</strong> according to this
              document: url here
            </li>
            <li>Insert other eligbility rules</li>
          </ul>
        </Banner>
      </>
    </Layout.Section>
  );
}
