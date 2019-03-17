import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardBox from "../../../components/CardBox";
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
  constructor() {
    super();
    this.state = {
      name: "",
      jobId: "",
      phone: "",
      email: "",
      password: "",
      birthDay: "",
      showMessage: false,
      alertMessage: "",
      jobs: [{ id: 1, name: "Prefeito" }, { id: 2, name: "Vereador" }],
      cities: [
        { id: 0, name: "Selecione" },
        { id: 1, name: "ABADIA DOS DOURADOS" },
        { id: 2, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 3, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 4, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 5, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 6, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 7, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 8, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 9, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 14, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 15, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 16, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 17, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 18, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 22, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 23, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 24, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 25, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 26, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 27, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 28, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" },
        { id: 29, name: "SANTO ANTONIO DO MATO DENTRO DE CIMA" }
      ],
      company: "",
      companyType: "P"
    };
  }
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };
  handleChangeUpperCase = name => e => {
    const valueUpper = e.target.value.toUpperCase();
    this.setState({ [name]: valueUpper });
  };
  handleCompany = e => this.setState({ company: e.target.value });
  handlePhone = e => {
    const phone = e.target.value.replace(/[^\d]/g, "");
    this.setState({ phone });
  };
  handleEmail = e => this.setState({ email: e.target.value });
  handleBDay = e => this.setState({ birthDay: e.target.value });
  handleRegistrationValidation = () => {
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
      alertMessage
    } = this.state;
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
      this.setState({
        showMessage: true,
        alertMessage: `Preencha Todos os campos`
      });
    } else if (!isValidPhone(phone)) {
      this.setState({
        showMessage: true,
        alertMessage: `Celular: ${phone} incorreto`
      });
    } else if (!validateEmail.validate(email)) {
      this.setState({
        showMessage: true,
        alertMessage: `Email: com caracteres inválidos`
      });
    }
  };
  render() {
    const {
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
    } = this.state;
    const { cpf } = this.props;
    return (
      <div className="app-wrapper">
        <div className="d-flex justify-content-center">
          <CardBox
            styleName="col-lg-5 col-md-7"
            childrenStyle="d-flex flex-column justify-content-start"
            heading={<IntlMessages id="pages.registration" />}
            headerOutside
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
                <label className="text-light-grey">
                  <IntlMessages id="appModule.birthday" />
                  <TextField
                    type="date"
                    fullWidth
                    required={true}
                    onChange={this.handleBDay}
                    defaultValue={birthDay}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                </label>
                <TextField
                  label={<IntlMessages id="appModule.phone" />}
                  fullWidth
                  type="tel"
                  required={true}
                  onChange={this.handlePhone}
                  value={formatStringByPattern("(99) 99999-9999", phone)}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />
                <TextField
                  label={<IntlMessages id="appModule.email" />}
                  fullWidth
                  required={true}
                  onChange={this.handleChange("email")}
                  defaultValue={email}
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
                    <Select
                      required={true}
                      value={company}
                      onChange={this.handleChangeUpperCase("company")}
                    >
                      {cities.map(city => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  type="password"
                  label={<IntlMessages id="appModule.password" />}
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
const mapStateToProps = ({ auth }) => {
  const { cpf } = auth;
  return { cpf };
};

export default connect(mapStateToProps)(Registration);
