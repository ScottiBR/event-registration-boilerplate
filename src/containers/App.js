import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import "assets/vendors/style";
import defaultTheme from "./themes/defaultTheme";
import AppLocale from "../lngProvider";

import MainApp from "app/index";
import SignIn from "./SignIn";
import { setInitUrl } from "../actions/Auth";
import RTL from "util/RTL";
import asyncComponent from "util/asyncComponent";
import Registration from "../app/routes/Registration";

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  render() {
    const {
      match,
      location,
      locale,
      authUser,
      initURL,
      isDirectionRTL,
      registrationID
    } = this.props;
    if (location.pathname === "/") {
      if (authUser === null) {
        return <Redirect to={"/signin"} />;
      } else if (registrationID === null) {
        return <Redirect to={"/app/registration"} />;
      } else if (
        initURL === "" ||
        initURL === "/" ||
        initURL === "/signin" ||
        initURL === "/app/registration"
      ) {
        return <Redirect to={"/app/enrollment"} />;
      } else {
        return <Redirect to={initURL} />;
      }
    }

    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
      applyTheme.direction = "ltr";
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <RTL>
              <div className="app-main">
                <Switch>
                  <RestrictedRoute
                    path={`${match.url}app`}
                    authUser={authUser}
                    component={MainApp}
                  />
                  <Route path="/signin" component={SignIn} />
                  <Route
                    component={asyncComponent(() =>
                      import("components/Error404")
                    )}
                  />
                </Switch>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { sideNavColor, locale, isDirectionRTL } = settings;
  const { authUser, initURL, registrationID } = auth;
  return {
    sideNavColor,
    locale,
    isDirectionRTL,
    authUser,
    initURL,
    registrationID
  };
};

export default connect(
  mapStateToProps,
  { setInitUrl }
)(App);
