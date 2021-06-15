import React from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

export const usePageViews = () => {
  const location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
};
