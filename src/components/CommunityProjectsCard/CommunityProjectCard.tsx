import React from "react";
import { Card } from "@shopify/polaris";
import styles from "./CommunityProjectsStyles.module.css";

interface CommunityProjectCardProps {
  title: string;
  link: string;
  description: string;
}

export function CommunityProjectCard(props: CommunityProjectCardProps) {
  return (
    <div className={styles.singleCardWrapper}>
      <Card
        title={props.title}
        sectioned
        footerActionAlignment="left"
        primaryFooterAction={{
          content: "View Project",
          external: true,
          url: props.link,
        }}
      >
        <p>{props.description}</p>
      </Card>
    </div>
  );
}
