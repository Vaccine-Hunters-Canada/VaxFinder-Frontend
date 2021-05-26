import { TwitterTimelineEmbed } from "react-twitter-embed";
import React from "react";
import i18next from "i18next";

export function Twitter() {
  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="VaxHuntersCan"
      options={{ height: 800 }}
      lang={i18next.language}
      key={i18next.language} // Key must be set to force TwitterTimelineEmbed to rerender when language changed
    />
  );
}
