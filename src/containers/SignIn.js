import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DatePicker } from "material-ui-pickers";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from "actions/Auth";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      selectedDate: "2017-05-24"
    };
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }
  handleDateChange = event =>
    this.setState({ selectedDate: event.target.value });
  handleLoginValue = event => this.setState({ login: event.target.value });
  handlePasswordValue = event =>
    this.setState({ password: event.target.value });

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSignIn();
    }
  };

  handleSignIn = () => {
    const { login, password } = this.state;
    this.props.showAuthLoader();
    this.props.userSignIn({ login, password });
  };

  render() {
    const { login, password, selectedDate } = this.state;
    const { showMessage, loader, alertMessage } = this.props;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="AMM">
              <img
                src={require("assets/images/logo-white.png")}
                alt="AMM"
                title="AMM"
              />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1>
                <IntlMessages id="signIn" />
              </h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={<IntlMessages id="appModule.cpf" />}
                    fullWidth
                    onChange={this.handleLoginValue}
                    defaultValue={login}
                    onKeyPress={this.handleKeyPress}
                    margin="normal"
                    autoFocus={true}
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    onChange={this.handlePasswordValue}
                    defaultValue={password}
                    onKeyPress={this.handleKeyPress}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    label={<IntlMessages id="appModule.birthday" />}
                    type="date"
                    fullWidth
                    onChange={this.handleDateChange}
                    defaultValue={selectedDate}
                    onKeyPress={this.handleKeyPress}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-center">
                    <Button
                      onClick={this.handleSignIn}
                      variant="contained"
                      color="secondary"
                    >
                      <IntlMessages id="appModule.signin" />
                    </Button>
                    <div>
                      <Link
                        to="/app/app-module/forgot-password-1"
                        title="Reset Password"
                      >
                        <IntlMessages id="appModule.forgotPassword" />
                      </Link>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        {loader && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    hideMessage,
    showAuthLoader,
    userFacebookSignIn,
    userGoogleSignIn,
    userGithubSignIn,
    userTwitterSignIn
  }
)(SignIn);
