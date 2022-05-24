import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

import RoleBasedRouting from "auth/guard/RoleBasedRouting";
import { ROLE_COMERCIAL, ROLE_SHOP } from "redux/constants/Auth";


const TransactionsViews = ({match}) => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <RoleBasedRouting AuthNeeded={ROLE_SHOP}  path={`${match.url}/list`} component={lazy(() => import(`./listTransactions`))} />
        <RoleBasedRouting
          AuthNeeded={ROLE_COMERCIAL} 
          path={`${match.url}/add`}
          component={lazy(() => import(`./addTransaction`))}
        />
      

        <Redirect from={`${match.url}`} to={`${match.url}/list`} />
      </Switch>
    </Suspense>
  )
}

export default TransactionsViews;