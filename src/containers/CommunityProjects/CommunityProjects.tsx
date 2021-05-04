import { Page } from "@shopify/polaris";
import React from "react";
import { projInfo } from "./CommunityProjectsInfo";
import { CommunityProjectCard } from "./CommunityProjectCard";
import "./CommunityProjectsStyles.css";

export function CommunityProjects() {
  return (
    <Page title="Community Projects">
      <p>Explore more COVID-19 projects built by people from across Canada!</p>
      <div className="cardFlexBox">
        {projInfo.map((project) => (
          <CommunityProjectCard
            title={project.title}
            link={project.link}
            description={project.description}
          />
        ))}
      </div>
    </Page>
  );
}
