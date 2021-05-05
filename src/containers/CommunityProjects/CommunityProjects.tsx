import { Page, TextContainer } from "@shopify/polaris";
import React from "react";
import { projInfo } from "./CommunityProjectsInfo";
import { CommunityProjectCard } from "../../components/CommunityProjectsCard/CommunityProjectCard";
import styles from "./CommunityProjectsStyles.module.css";

export function CommunityProjects() {
  return (
    <div className={styles.communityProjectsPage}>
      <Page title="Community Projects">
        <TextContainer>
          <p>
            Explore more COVID-19 projects built by people from across Canada!
          </p>
        </TextContainer>
        <div className={styles.cardFlexBox}>
          {projInfo.map((project) => (
            <CommunityProjectCard
              title={project.title}
              link={project.link}
              description={project.description}
            />
          ))}
        </div>
      </Page>
    </div>
  );
}
