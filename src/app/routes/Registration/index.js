import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  handleChangeValue,
  showRegistrationMessage,
  hideRegistrationMessage,
  populateCitiesSelect,
  populateJobsSelect,
  submitRegistrationForm,
  getUserData,
  redirectToNextPage
} from "actions/Registration";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CardBox from "components/CardBox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import formatCpf from "@brazilian-utils/format-cpf";
import isValidPhone from "@brazilian-utils/is-valid-phone";
import formatStringByPattern from "format-string-by-pattern";
import * as validateEmail from "email-validator";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import moment from "moment";

class Registration extends React.Component {
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideRegistrationMessage();
      }, 100);
    }
  }
  componentDidMount() {
    const { cpf, registrationID } = this.props;
    if (registrationID !== null) {
      this.props.redirectToNextPage();
    } else {
      this.props.populateCitiesSelect();
      this.props.populateJobsSelect();
      this.props.getUserData({ cpf });
    }
  }
  handleChange = name => e => {
    this.props.handleChangeValue(name, e.target.value);
  };
  handleChangeUpperCase = name => e => {
    const valueUpper = e.target.value.toUpperCase();
    this.props.handleChangeValue(name, valueUpper);
  };
  handleChangeOnlyNumbers = name => e => {
    const numberValue = e.target.value.replace(/[^\d]/g, "");
    this.props.handleChangeValue(name, numberValue);
  };

  handleRegistrationValidation = () => {
    const {
      cpf,
      name,
      jobId,
      company,
      phone,
      email,
      password,
      birthDay,
      companyType,
      privilageUser
    } = this.props;

    const mBirthDay = moment(birthDay, "DDMMYYYY");
    if (
      !name ||
      !jobId ||
      !company ||
      !phone ||
      !email ||
      !password ||
      !birthDay ||
      !companyType
    ) {
      this.props.showRegistrationMessage(`Preencha Todos os campos`);
    } else if (!isValidPhone(phone)) {
      this.props.showRegistrationMessage(`Celular: ${phone} incorreto`);
    } else if (!validateEmail.validate(email)) {
      this.props.showRegistrationMessage(`Email com caracteres inválidos`);
    } else if (mBirthDay.year() < 1900 || mBirthDay.year() > 2015) {
      this.props.showRegistrationMessage("Data de Nascimento Incorreta");
    } else if (!privilageUser && jobId === 96 && companyType !== "O") {
      this.props.showRegistrationMessage(
        "Você selecionou um cargo que não condiz com a sua função =)"
      );
    } else {
      const strBirthDay = mBirthDay.format("YYYY-MM-DD");
      this.props.submitRegistrationForm({
        cpf,
        name,
        jobId,
        company,
        phone,
        email,
        password,
        strBirthDay,
        companyType
      });
    }
  };
  render() {
    const {
      cpf,
      name,
      jobId,
      company,
      phone,
      email,
      password,
      birthDay,
      showMessage,
      alertMessage,
      jobs,
      cities,
      companyType
    } = this.props;
    return (
      <div className="app-wrapper">
        <div className="d-flex justify-content-center">
          <CardBox
            styleName="col-lg-6 col-md-8"
            childrenStyle="d-flex flex-column justify-content-start"
            heading={<IntlMessages id="pages.registration" />}
          >
            <form>
              <fieldset>
                <TextField
                  label={<IntlMessages id="appModule.cpf" />}
                  fullWidth
                  required={true}
                  value={formatCpf(cpf)}
                  margin="normal"
                  disabled={true}
                  className="mt-1 my-sm-3"
                />
                <TextField
                  label={<IntlMessages id="appModule.name" />}
                  fullWidth
                  required={true}
                  onChange={this.handleChangeUpperCase("name")}
                  value={name}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />
                <TextField
                  label={<IntlMessages id="appModule.birthday" />}
                  fullWidth
                  required={true}
                  onChange={this.handleChangeOnlyNumbers("birthDay")}
                  value={formatStringByPattern("99/99/9999", birthDay)}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />
                <TextField
                  label={<IntlMessages id="appModule.phone" />}
                  fullWidth
                  type="tel"
                  required={true}
                  onChange={this.handleChangeOnlyNumbers("phone")}
                  value={formatStringByPattern("(99) 99999-9999", phone)}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />
                <TextField
                  label={<IntlMessages id="appModule.email" />}
                  fullWidth
                  required={true}
                  onChange={this.handleChange("email")}
                  value={email}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />
                <FormControl className="w-100 mb-2">
                  <InputLabel>
                    <IntlMessages id="appModule.job" />
                  </InputLabel>
                  <Select
                    className="mb-3"
                    value={jobId}
                    onChange={this.handleChange("jobId")}
                  >
                    {jobs.map(job => (
                      <MenuItem key={job.id} value={job.id}>
                        {job.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl component="fieldset" required>
                  <FormLabel component="legend">
                    <IntlMessages id="appModule.companyType" />
                  </FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="gender"
                    name="gender"
                    value={companyType}
                    onChange={this.handleChangeUpperCase("companyType")}
                  >
                    <FormControlLabel
                      value="P"
                      control={<Radio color="primary" />}
                      label={<IntlMessages id="appModule.cityHall" />}
                    />
                    <FormControlLabel
                      value="C"
                      control={<Radio color="primary" />}
                      label={<IntlMessages id="appModule.cityCouncil" />}
                    />
                    <FormControlLabel
                      value="O"
                      control={<Radio color="primary" />}
                      label={<IntlMessages id="appModule.other" />}
                    />
                  </RadioGroup>
                </FormControl>

                {companyType === "O" ? (
                  <TextField
                    label={<IntlMessages id="appModule.company" />}
                    fullWidth
                    required={true}
                    onChange={this.handleChangeUpperCase("company")}
                    value={company}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                ) : (
                  <FormControl className="w-100 mb-2">
                    <InputLabel>
                      <IntlMessages id="appModule.city" />
                    </InputLabel>
                    <Select
                      required={true}
                      value={company}
                      onChange={this.handleChangeUpperCase("company")}
                    >
                      {cities.map(city => (
                        <MenuItem key={city.id} value={city.name}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  type="password"
                  label={<IntlMessages id="pages.registration.password" />}
                  fullWidth
                  required={true}
                  onChange={this.handleChange("password")}
                  defaultValue={password}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />
                <div className="m-3 d-flex flex-column align-items-center justify-content-center">
                  <Button
                    onClick={this.handleRegistrationValidation}
                    variant="contained"
                    color="secondary"
                  >
                    <IntlMessages id="appModule.next" />
                  </Button>
                </div>
              </fieldset>
            </form>
          </CardBox>
          {showMessage && NotificationManager.warning(alertMessage)}
          <NotificationContainer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, registration }) => {
  const { cpf, registrationID } = auth;
  const {
    name,
    jobId,
    company,
    phone,
    email,
    password,
    birthDay,
    companyType,
    showMessage,
    alertMessage,
    jobs,
    cities,
    privilageUser
  } = registration;
  return {
    cpf,
    name,
    jobId,
    company,
    phone,
    email,
    password,
    birthDay,
    companyType,
    showMessage,
    alertMessage,
    jobs,
    cities,
    privilageUser,
    registrationID
  };
};

export default connect(
  mapStateToProps,
  {
    getUserData,
    handleChangeValue,
    showRegistrationMessage,
    hideRegistrationMessage,
    populateCitiesSelect,
    populateJobsSelect,
    submitRegistrationForm,
    redirectToNextPage
  }
)(Registration);
