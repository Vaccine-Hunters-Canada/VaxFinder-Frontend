import {
  DisplayText,
  Layout,
  MediaCard,
  VideoThumbnail,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import React from "react";

export function VaccineInfo() {
  const { t } = useTranslation();
  return (
    <Layout>
      <Layout.Section>
        <DisplayText size="extraLarge">Vaccine Information</DisplayText>
        <DisplayText size="small">
          We have collected these resources for you to get more information on
          vaccines.
        </DisplayText>
      </Layout.Section>
      <Layout.Section>
        <MediaCard
          portrait
          title="COVID-19: How vaccines are developed"
          primaryAction={{
            content: "Learn more",
            url: "https://www.youtube.com/watch?v=Y51ZgZCS8J0",
          }}
          description="This video explains the vaccine development process and how it is possible to achieve a COVID-19 vaccine, with significant domestic and international collaboration, in a much shorter period of time."
        >
          <VideoThumbnail
            videoLength={204}
            thumbnailUrl="https://img.youtube.com/vi/Y51ZgZCS8J0/0.jpg"
            onClick={() => {
              window.open("https://www.youtube.com/watch?v=Y51ZgZCS8J0");
            }}
          />
        </MediaCard>
        <MediaCard
          portrait
          title="How mRNA Vaccines Work - Simply Explained"
          primaryAction={{
            content: "Learn more",
            url: "https://www.youtube.com/watch?v=WOvvyqJ-vwo",
          }}
          description="mRNA vaccines have to potential to end the COVID19 pandemic. How do they work? Are they safe? And how could they've been developed so quickly?"
        >
          <VideoThumbnail
            videoLength={265}
            thumbnailUrl="https://img.youtube.com/vi/WOvvyqJ-vwo/0.jpg"
            onClick={() => {
              window.open("https://www.youtube.com/watch?v=WOvvyqJ-vwo");
            }}
          />
        </MediaCard>
        <MediaCard
          portrait
          title="This Is Our Shot"
          primaryAction={{
            content: t("visitwebsite"),
            url: "https://thisisourshot.ca/",
          }}
          description="Provides a broad array of vaccine information like information on
            health and saftey, information for before, during and after your
            vaccination, and live town halls by experts."
        >
          <img
            alt="This Is Our Shot Logo"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            src="https://thisisourshot.ca/wp-content/uploads/2021/04/thisisourshot-logo-large.jpg"
          />
        </MediaCard>
        <MediaCard
          portrait
          title="missInformed"
          primaryAction={{
            content: t("visitwebsite"),
            url:
              "https://www.missinformed.ca/covid-19vaccine-common-questions-misconceptions",
          }}
          description="missInformed is a very well trusted non-profit designed to provide
            health education and to promote informed advocacy through
            evidence-based teachings."
        >
          <img
            alt="missInformed Logo"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            src="https://static.wixstatic.com/media/841985_56386b6bdff74ba0b4f175154a2e14b6~mv2.png/v1/crop/x_83,y_92,w_1155,h_340/fill/w_342,h_94,al_c,q_85,usm_1.20_1.00_0.01/missINFORMED-webicon.jpg"
          />
        </MediaCard>
        <MediaCard
          portrait
          title="COVID-19 Resource Canada"
          primaryAction={{
            content: t("visitwebsite"),
            url: "https://covid19resources.ca/",
          }}
          description="Virtual Q&A sessions and workshops to answer your questions about
            COVID-19 vaccines."
        >
          <img
            alt="COVID19 Resource Canada Logo"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            src="https://scienceupfirst.com/wp-content/uploads/2021/06/1_COVIDResourcesLogo.png"
          />
        </MediaCard>
      </Layout.Section>
    </Layout>
  );
}
