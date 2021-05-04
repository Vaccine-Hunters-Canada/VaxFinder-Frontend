import { Page, Card } from "@shopify/polaris";
import React from "react";
import { projInfo } from "./CommunityProjectsInfo";
import "./CommunityProjectsStyles.css";

export function CommunityProjects() {
  const infoCards: JSX.Element[] = [];
  projInfo.forEach((element) => {
    const card = (
      <div className="singleCardWrapper">
        <Card
          title={element.title}
          sectioned
          footerActionAlignment="left"
          primaryFooterAction={{
            content: "View Project",
            external: true,
            url: String(element.link),
          }}
        >
          <p>{element.description}</p>
        </Card>
      </div>
    );
    infoCards.push(card);
  });

  return (
    <Page title="Community Projects">
      <p>Explore more COVID-19 projects built by people from across Canada!</p>
      <div className="cardFlexBox">{infoCards}</div>
    </Page>
  );
}
