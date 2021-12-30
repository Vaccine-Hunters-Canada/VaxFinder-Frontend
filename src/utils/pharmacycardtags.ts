import { Badge } from "@shopify/polaris";

type Status = React.ComponentProps<typeof Badge>["status"];

interface BannerTags {
  titlekey: string;
  bodykey: string;
  status: string | undefined;
}

interface BadgeTags {
  resourcekey: string;
  status: Status | undefined;
}

const bannertags: Record<string, BannerTags> = {
  Cancellation: {
    titlekey: "cancellationwarning",
    bodykey: "cancellationwarningmessage",
    status: "warning",
  },
  "Expiring Doses": {
    titlekey: "expiringdose",
    bodykey: "expiringdosemessage",
    status: "warning",
  },
};

const badgetags: Record<string, BadgeTags> = {
  "5-11 Year Olds": {
    resourcekey: "5to11yearold",
    status: "critical",
  },
  "12+ Year Olds": {
    resourcekey: "12plusyearolds",
    status: "critical",
  },
  "Walk In": {
    resourcekey: "walkin",
    status: "info",
  },
  "Call Ahead": {
    resourcekey: "callahead",
    status: "info",
  },
  "Visit Website": {
    resourcekey: "visitwebsite",
    status: "info",
  },
  Email: {
    resourcekey: "email",
    status: "info",
  },
  "1st Dose": {
    resourcekey: "firstdose",
    status: "warning",
  },
  "2nd Dose": {
    resourcekey: "seconddose",
    status: "warning",
  },
  "3rd Dose": {
    resourcekey: "thirddose",
    status: "warning",
  },
  Pfizer: {
    resourcekey: "pfizer",
    status: undefined,
  },
  Moderna: {
    resourcekey: "moderna",
    status: undefined,
  },
  AstraZeneca: {
    resourcekey: "astrazeneca",
    status: undefined,
  },
};

export { bannertags, badgetags };
