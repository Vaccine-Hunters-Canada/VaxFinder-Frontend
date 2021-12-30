import { Badge } from "@shopify/polaris";
import React from "react";
import { useTranslation } from "react-i18next";
import { badgetags } from "../../utils/pharmacycardtags";

interface Props {
  tags: string;
}

export function PharmacyBadge(props: Props) {
  const { t } = useTranslation();
  let returnTags: JSX.Element[] = [];
  const tags: string[] = props.tags.split(",");
  tags.forEach((tag) => {
    returnTags = [];
    if (tag in badgetags) {
      returnTags.push(
        <Badge key={tag} status={badgetags[tag].status}>
          {t(badgetags[tag].resourcekey)}
        </Badge>,
      );
    }
  });
  return <>{returnTags}</>;
}
