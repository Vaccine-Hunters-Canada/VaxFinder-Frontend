import React from "react";
import { Banner } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

interface Props {
  onDismiss: () => void;
}

export function EligibilityBanner(props: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Banner
        title={t("eligibility")}
        onDismiss={props.onDismiss}
        status="info"
      >
        {t("eligibilitymessage")}
      </Banner>
    </>
  );
}
