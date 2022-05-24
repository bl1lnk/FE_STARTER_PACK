import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import RoleBasedRouting from "auth/guard/RoleBasedRouting";
import { ROLE_COMERCIAL, ROLE_MASTER, ROLE_SHOP } from "redux/constants/Auth";
import useAuth from "hooks/useAuth";


export const AppViews = () => {
 
  var defaultRoute = "transactions"
  const {userRole} = useAuth([]);

  if(userRole === ROLE_SHOP){
    defaultRoute = "utilite"
  }

  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
       {/*  <Route path={`${APP_PREFIX_PATH}/utilite`} component={lazy(() => import(`./utilite`))} />
        */}


       

        <RoleBasedRouting
          AuthNeeded={ROLE_COMERCIAL}
          path={`${APP_PREFIX_PATH}/users`}
          component={lazy(() => import(`./users`))}
        />

        <Route path={`${APP_PREFIX_PATH}/transactions`} component={lazy(() => import(`./transactions`))} />

        <RoleBasedRouting
          AuthNeeded={ROLE_COMERCIAL} 
          path={`${APP_PREFIX_PATH}/movements/list`}
          component={lazy(() => import(`./movements/listMovements`))}
        />

     


        
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/${defaultRoute}`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);