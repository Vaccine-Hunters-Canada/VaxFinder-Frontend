import React from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

export const usePageViews = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
};
