import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { userService } from "../../services/userService";

export function PrivateRoute(props: RouteProps) {
  if (!userService.checkIsAuthenticated()) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
  return <Route {...props} />;
}
