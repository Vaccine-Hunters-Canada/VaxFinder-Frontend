import { Card } from "@shopify/polaris";
import { DomainsMajor } from "@shopify/polaris-icons";
import React from "react";
import { SearchCard } from "../../components/SearchCard";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();
  return (
    <>
      <SearchCard />
      <Card
        title={t("areyouapharmacist")}
        primaryFooterAction={{
          content: t("requesttojoin"),
          icon: DomainsMajor,
          external: true,
          url: "https://vaccinehunters.ca/pharmacy",
        }}
      >
        <Card.Section>
          <p>{t("pharmacydescription")}</p>
        </Card.Section>
      </Card>
    </>
  );
}
