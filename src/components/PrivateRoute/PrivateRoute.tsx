import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { userService } from "../../services/userService";

export const PrivateRoute = ({ render, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userService.checkIsAuthenticated() ? (
          render && render(props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
