import {
  Layout,
  Page,
  Banner,
  Form,
  FormLayout,
  TextField,
  Button,
  Badge,
  Card,
} from "@shopify/polaris";
import React, { useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "./CommunityProjectsStyles.css";

export function CommunityProjects() {
  return (
    <Page title="Community Projects">
      <p>
        Explore more COVID-19 projects built by people from across Canada!
      </p>
      <div className="cardFlexBox">
        <div className="singleCardWrapper">
          <Card title="ontariocovid-19.com" sectioned>
            <p>
              A mobile friendly dashboard for daily Ontario COVID-19
              updates.
            </p>
          </Card>
        </div>
        <div className="singleCardWrapper">
          <Card title="ontariocovid-19.com" sectioned>
            <p>
              A mobile friendly dashboard for daily Ontario COVID-19
              updates.
            </p>
          </Card>
        </div>
        <div className="singleCardWrapper">
          <Card title="ontariocovid-19.com" sectioned>
            <p>
              A mobile friendly dashboard for daily Ontario COVID-19
              updates.
            </p>
          </Card>
        </div>
        <div className="singleCardWrapper">
          <Card title="ontariocovid-19.com" sectioned>
            <p>
              A mobile friendly dashboard for daily Ontario COVID-19
              updates.
            </p>
          </Card>
        </div>
        <div className="singleCardWrapper">
          <Card title="ontariocovid-19.com" sectioned>
            <p>
              A mobile friendly dashboard for daily Ontario COVID-19
              updates.
            </p>
          </Card>
        </div>
      </div>
    </Page>
  );
}
