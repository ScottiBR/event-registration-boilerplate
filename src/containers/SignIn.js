import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import formatCpf from "@brazilian-utils/format-cpf";
import isValidCpf from "@brazilian-utils/is-valid-cpf";

import moment from "moment";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import IntlMessages from "util/IntlMessages";

import formatStringByPattern from "format-string-by-pattern";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  hideMessage,
  showAuthLoader,
  userSignIn,
  setCPF,
  showAuthMessage,
  checkCpfRegistrationRequest,
  userSignInWithBDay
} from "actions/Auth";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      forgotPassword: false,
      birthDay: ""
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
  handleDateChange = event => {
    this.setState({ birthDay: event.target.value });
  };
  handleCpfValue = event => {
    const cpfValue = event.target.value.replace(/[^\d]+/g, "");
    this.props.setCPF(cpfValue);
  };
  handlePasswordValue = event =>
    this.setState({ password: event.target.value });

  handleForgotPassword = () => this.setState({ forgotPassword: true });

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSignInValidation(event);
    }
  };

  handleSignInValidation = e => {
    const { birthDay, password, forgotPassword } = this.state;
    const mBirthDay = moment(birthDay, "DDMMYYYY");
    const { cpf, registrationID } = this.props;
    if (isValidCpf(cpf)) {
      this.props.showAuthLoader();
      if (registrationID === null) {
        this.props.checkCpfRegistrationRequest({ cpf });
      } else if (!forgotPassword) {
        this.props.userSignIn({ registrationID, password });
      } else {
        if (mBirthDay.year() > 1900 && mBirthDay.year() <= 2015) {
          const strBirthDay = mBirthDay.format("YYYY-MM-DD");
          this.props.userSignInWithBDay({ registrationID, strBirthDay });
        } else {
          this.props.showAuthMessage("Data de Nascimento Incorreta");
        }
      }
    } else {
      this.props.showAuthMessage("CPF INVALIDO");
    }
    e.preventDefault();
  };
  render() {
    const { password, birthDay, forgotPassword } = this.state;
    const {
      showMessage,
      loader,
      alertMessage,
      cpf,
      registrationID
    } = this.props;
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
                    onChange={this.handleCpfValue}
                    value={formatCpf(cpf)}
                    onKeyPress={this.handleKeyPress}
                    margin="normal"
                    disabled={registrationID !== null}
                    autoFocus={!forgotPassword}
                    className="mt-1 my-sm-3"
                  />
                  {registrationID && (
                    <div>
                      {!forgotPassword ? (
                        <TextField
                          type="password"
                          label={<IntlMessages id="appModule.password" />}
                          fullWidth
                          onChange={this.handlePasswordValue}
                          defaultValue={password}
                          onKeyPress={this.handleKeyPress}
                          margin="normal"
                          className="mt-1 my-sm-3"
                          autoFocus={true}
                        />
                      ) : (
                        <TextField
                          label={<IntlMessages id="appModule.birthday" />}
                          fullWidth
                          required={true}
                          onChange={this.handleDateChange}
                          value={formatStringByPattern("99/99/9999", birthDay)}
                          margin="normal"
                          className="mt-1 my-sm-3"
                          autoFocus={true}
                        />
                      )}
                    </div>
                  )}

                  <div className="m-3 d-flex flex-column align-items-center justify-content-center">
                    <Button
                      onClick={this.handleSignInValidation}
                      variant="contained"
                      color="secondary"
                    >
                      <IntlMessages id="appModule.next" />
                    </Button>
                    {registrationID && !forgotPassword && (
                      <div>
                        <p
                          className=" mt-3 text-light-grey"
                          onClick={this.handleForgotPassword}
                        >
                          <IntlMessages id="appModule.forgotPassword" />
                        </p>
                      </div>
                    )}
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
  const {
    loader,
    alertMessage,
    showMessage,
    authUser,
    registrationID,
    cpf
  } = auth;
  return { loader, alertMessage, showMessage, authUser, registrationID, cpf };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    hideMessage,
    showAuthLoader,
    setCPF,
    showAuthMessage,
    checkCpfRegistrationRequest,
    userSignInWithBDay
  }
)(SignIn);
