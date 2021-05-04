import React from "react";
import { Route } from "react-router-dom";

const Home = React.lazy(() => import("./routes/Home"));
const Search = React.lazy(() => import("./routes/Search"));
const CommunityProjects = React.lazy(
  () => import("./routes/CommunityProjects"),
);

export function Routes() {
  return (
    <React.Suspense fallback={null}>
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:postalCode" component={Search} />
      <Route exact path="/communityProjects" component={CommunityProjects} />
    </React.Suspense>
  );
}
