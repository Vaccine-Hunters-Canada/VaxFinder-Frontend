import { Card } from "@shopify/polaris";
import { DomainsMajor } from "@shopify/polaris-icons";
import React from "react";
import { SearchCard } from "../../components/SearchCard";

export function Home() {
  return (
    <>
      <SearchCard />
      <Card
        title="Are you a pharmacist?"
        primaryFooterAction={{
          content: "Request To Join",
          icon: DomainsMajor,
          external: true,
          url: "https://vaccinehunters.ca/pharmacy",
        }}
      >
        <Card.Section>
          <p>
            You can easily get your pharmacies availabilities posted on this
            website! Easily post availabilities that you have in under a minute,
            and quickly fill up availabilties. Click the &quot;Request To
            Join&quot; button to get access!
          </p>
        </Card.Section>
      </Card>
    </>
  );
}
