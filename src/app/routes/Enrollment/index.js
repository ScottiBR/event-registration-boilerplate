import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  showEnrollmentMessage,
  hideEnrollmentMessage,
  requestApiGetAllAreas,
  requestApiGetLectures,
  requestApiPostSubscribe,
  requestApiPostUnsubscribe
} from "actions";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import CardBox from "components/CardBox";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

import Lectures from "components/Lectures";
import LecturesFilter from "components/LecturesFilter/index";

class Enrollment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textFilter: "",
      dateFilter: "",
      areaFilter: "",
      searchLecturesOption: false
    };
  }
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideEnrollmentMessage();
      }, 100);
    }
  }
  componentDidMount() {
    //this.props.requestApiGetLectures(this.props.registrationID);
    //this.props.requestApiGetAllAreas();
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };
  filterLecturesList = item => {
    const { textFilter, dateFilter, areaFilter } = this.state;
    return (
      item.title.toLowerCase().includes(textFilter.toLowerCase()) &&
      item.area.toLowerCase().includes(textFilter.toLowerCase()) &&
      item.startDate.includes(dateFilter) &&
      item.area.toLowerCase().includes(areaFilter.toLowerCase())
    );
  };
  handleSubscribe = lectureId => {
    this.props.requestApiPostSubscribe(lectureId, this.props.registrationId);
  };
  handleUnsubscribe = lectureId => {
    this.props.requestApiPostUnsubscribe(lectureId, this.props.registrationId);
  };
  searcHlectures = () => {
    this.setState({ searchLecturesOption: true });
  };
  validateEnrollment = () => {
    this.props.showEnrollmentMessage("Comprovante de Inscrição");
  };
  render() {
    const {
      showMessage,
      alertMessage,
      registrationID,
      lecturesList,
      classes,
      areasList
    } = this.props;
    const subscribedLectures = lecturesList.filter(
      value => value.subscribed === true
    );
    return (
      <div className="app-wrapper">
        {this.state.searchLecturesOption ? (
          <div className="d-flex flex-row align-items-start justify-content-center flex-wrap ">
            <CardBox
              styleName="col-lg-12 col-md-12  col-sm-12"
              childrenStyle="d-flex flex-column justify-content-start"
              heading={<IntlMessages id="pages.enrollment.filter" />}
            >
              <LecturesFilter
                handleChange={this.handleChange}
                fields={{ ...this.state, areasList }}
              />
            </CardBox>

            <CardBox
              styleName="col-lg-6 col-md-6  col-sm-12"
              childrenStyle="d-flex flex-column justify-content-start align-items-center"
              heading={<IntlMessages id="pages.enrollment" />}
            >
              {subscribedLectures.length > 0 ? (
                <List component="nav">
                  {subscribedLectures.map(data => (
                    <ListItem divider classes={{ root: classes.root }}>
                      <div>
                        <Lectures
                          key={data.id}
                          data={data}
                          handleSubscribe={this.handleUnsubscribe}
                        />
                      </div>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h2 className="mt-3">Não há palestras selecionadas</h2>
              )}

              <div className=" d-flex flex-column align-items-center justify-content-center">
                <Button
                  onClick={this.validateEnrollment}
                  variant="contained"
                  color="secondary"
                >
                  <IntlMessages id="appModule.end" />
                </Button>
              </div>
            </CardBox>
            <CardBox
              styleName="col-lg-6 col-md-6  col-sm-12"
              heading={<IntlMessages id="pages.enrollment.lecture" />}
            >
              <List component="nav">
                {lecturesList
                  .filter(value => value.subscribed === false)
                  .filter(this.filterLecturesList)
                  .map(data => (
                    <ListItem divider classes={{ root: classes.root }}>
                      <Lectures
                        key={data.id}
                        data={data}
                        handleSubscribe={this.handleSubscribe}
                      />
                    </ListItem>
                  ))}
              </List>
            </CardBox>
            {showMessage && NotificationManager.warning(alertMessage)}
            <NotificationContainer />
          </div>
        ) : (
          <div className="d-flex justify-content-center ">
            <CardBox
              styleName="col-lg-6 col-md-8  col-sm-12"
              childrenStyle="d-flex flex-column justify-content-center"
            >
              <div>
                <h3 className="mb-3">
                  <IntlMessages id="appModule.acessQuestion" />
                </h3>
                <p>
                  O Acesso ao evento inclui Acesso a feira, palestras magnum no
                  palco principal prêmio mineiro de boas práticas
                </p>
                <div className="d-flex flex-row justify-content-between mb-2 ">
                  <Button
                    onClick={this.validateEnrollment}
                    variant="contained"
                    color="secondary"
                  >
                    <IntlMessages id="appModule.accessEvent" />
                  </Button>
                  <Button
                    onClick={this.searcHlectures}
                    variant="contained"
                    color="secondary"
                  >
                    <IntlMessages id="appModule.lectureSubscription" />
                  </Button>
                </div>
                <p>*O acesso ao evento não garante vaga em nenhuma palestra</p>
              </div>
            </CardBox>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ auth, enrollment }) => {
  const { registrationID } = auth;
  const { showMessage, alertMessage, lecturesList, areasList } = enrollment;
  return {
    registrationID,
    showMessage,
    alertMessage,
    lecturesList,
    areasList
  };
};
const styles = {
  root: {
    padding: "0px !important"
  }
};
export default connect(
  mapStateToProps,
  {
    showEnrollmentMessage,
    hideEnrollmentMessage,
    requestApiGetAllAreas,
    requestApiGetLectures,
    requestApiPostSubscribe,
    requestApiPostUnsubscribe
  }
)(withStyles(styles)(Enrollment));
