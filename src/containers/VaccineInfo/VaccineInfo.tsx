import {
  DisplayText,
  Layout,
  MediaCard,
  VideoThumbnail,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import React from "react";

export function VaccineInfo() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.substring(0, 2);
  if (lang === "fr") {
    // French
    return (
      <Layout>
        <Layout.Section>
          <DisplayText size="extraLarge">
            Informations sur les vaccins
          </DisplayText>
          <DisplayText size="small">
            Nous avons rassemblé ces ressources pour vous permettre
            d&apos;obtenir plus d&apos;informations sur les vaccins.
          </DisplayText>
        </Layout.Section>
        <Layout.Section>
          <MediaCard
            portrait
            title="COVID-19 : Comment les vaccins sont créés"
            primaryAction={{
              content: "Apprendre plus",
              url: "https://www.youtube.com/watch?v=vFmwE5emlmI",
              external: true,
            }}
            description="Cette vidéo explique le processus de mise au point des vaccins et comment une collaboration active à l’échelle nationale et internationale permet d'accélérer considérablement la création d'un vaccin contre la COVID 19."
          >
            <VideoThumbnail
              videoLength={204}
              thumbnailUrl="https://img.youtube.com/vi/vFmwE5emlmI/0.jpg"
              onClick={() => {
                window.open("https://www.youtube.com/watch?v=vFmwE5emlmI");
              }}
            />
          </MediaCard>
          <MediaCard
            portrait
            title="À Ton Tour Agir"
            primaryAction={{
              content: t("visitwebsite"),
              url: "https://thisisourshot.ca/fr/",
              external: true,
            }}
            description="Fournit un large éventail d'informations sur les vaccins, telles que des informations sur la santé et la sécurité, des informations avant, pendant et après votre vaccination et des assemblées publiques en direct animées par des experts."
          >
            <img
              alt="Logo À Ton Tour Agir"
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                backgroundColor: "black",
              }}
              src="https://thisisourshot.ca/wp-content/uploads/2021/06/ThisIsOurShot_TogetherAgain-Stacked-FR-1.png"
            />
          </MediaCard>
          <MediaCard
            portrait
            title="COVID-19 Resources Canada"
            primaryAction={{
              content: t("visitwebsite"),
              url: "https://covid19resources.ca/?lang=fr",
              external: true,
            }}
            description="Séances virtuelles de questions-réponses et ateliers pour répondre à vos questions sur
            les vaccins contre le COVID-19."
          >
            <img
              alt="Logo COVID19 Resource Canada"
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
  // English or unknown language
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
            external: true,
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
            external: true,
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
            external: true,
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
            external: true,
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
          title="COVID-19 Resources Canada"
          primaryAction={{
            content: t("visitwebsite"),
            url: "https://covid19resources.ca/",
            external: true,
          }}
          description="Virtual Q&amp;A sessions and workshops to answer your questions about
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
