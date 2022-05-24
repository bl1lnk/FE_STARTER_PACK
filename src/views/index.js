import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import { ROLE_SHOP } from "redux/constants/Auth";
import RoleBasedRouting from "auth/guard/RoleBasedRouting";

export const Views = (props) => {
  const { locale, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RoleBasedRouting path={APP_PREFIX_PATH} AuthNeeded={ROLE_SHOP}>
            <AppLayout direction={direction} location={location} />
          </RoleBasedRouting>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } =  theme;
  const { token } = auth;
  return { locale, token, direction }
};

export default withRouter(connect(mapStateToProps)(Views));