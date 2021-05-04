import React from "react";
import { Card } from "@shopify/polaris";

export function CommunityProjectCard({ title, link, description }) {
  return (
    <div className="singleCardWrapper">
      <Card
        title={String(title)}
        sectioned
        footerActionAlignment="left"
        primaryFooterAction={{
          content: "View Project",
          external: true,
          url: String(link),
        }}
      >
        <p>{description}</p>
      </Card>
    </div>
  );
}
