import React from "react";
import { Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const Home = React.lazy(() => import("./routes/Home"));
const Search = React.lazy(() => import("./routes/Search"));
const Login = React.lazy(() => import("./routes/Login"));
const Admin = React.lazy(() => import("./routes/Admin"));

export function Routes() {
  return (
    <React.Suspense fallback={null}>
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:postalCode" component={Search} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/admin" component={Admin} />
    </React.Suspense>
  );
}
