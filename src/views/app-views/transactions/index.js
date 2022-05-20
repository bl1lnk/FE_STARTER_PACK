import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import RoleBasedRouting from "auth/guard/RoleBasedRouting";
import { ROLE_COMERCIAL, ROLE_MASTER, ROLE_SHOP, ROLE_USER } from "redux/constants/Auth";
import useAuth from "hooks/useAuth";

const TransactionsViews = ({match}) => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${match.url}/list`} component={lazy(() => import(`./listTransactions`))} />
        <RoleBasedRouting
          AuthNeeded={ROLE_COMERCIAL} 
          path={`${match.url}/add`}
          component={lazy(() => import(`./addTransaction`))}
        />
        <RoleBasedRouting
          AuthNeeded={ROLE_SHOP} 
          path={`${match.url}/player`}
          exactAuth={true}
          component={lazy(() => import(`./playerTransactions`))}
        />

        <Redirect from={`${match.url}`} to={`${match.url}/list`} />
      </Switch>
    </Suspense>
  )
}

export default TransactionsViews;