import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "hooks/useAuth";

export const RoleBasedRouting = (props) => {
  const { exactAuth, AuthNeeded, ...rest } = props;

  const { isAuth, exact } = useAuth([AuthNeeded]);
  if (exactAuth) {
    if (exact) {
      return <Route {...rest}>{props.children}</Route>;
    } else {
      return (
        <Route>
          <Redirect to={"/auth/login"}  />
        </Route>
      );
    }
  } else {
    if (isAuth) {
      return <Route {...rest}>{props.children}</Route>;
    } else {
      return (
        <Route>
          <Redirect to={"/auth/login"} />
        </Route>
      );
    }
  }
};

export default RoleBasedRouting;
