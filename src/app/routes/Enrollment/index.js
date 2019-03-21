import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { NavLink, Redirect } from "react-router-dom";
import {
  showEnrollmentMessage,
  hideEnrollmentMessage,
  requestApiGetAllAreas,
  requestApiGetLectures,
  requestApiPostSubscribe,
  requestApiPostUnsubscribe,
  requestApiGetEventDetails,
  requestApiGetEventSpeaker
} from "actions";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import CardBox from "components/CardBox";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Lectures from "components/Enrollment/Lectures";
import LecturesFilter from "components/Enrollment/LecturesFilter/index";
import EventDetails from "components/Enrollment/EventDetails";
import EventSpeakers from "components/Enrollment/EventSpeakers";
import SearchLectureOrAccessEvent from "components/Enrollment/SearchLectureOrAccessEvent";

class Enrollment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSpeakerModal: false,
      textFilter: "",
      dateFilter: "",
      areaFilter: "",
      searchLecturesOption: true
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
      (item.title.toLowerCase().includes(textFilter.toLowerCase()) ||
        item.area.toLowerCase().includes(textFilter.toLowerCase())) &&
      item.startDate.includes(dateFilter) &&
      item.area.toLowerCase().includes(areaFilter.toLowerCase())
    );
  };

  handleSubscribe = (lectureId, chosenDate) => {
    const checkScheduledConflict = this.props.lecturesList.filter(
      lecture => lecture.subscribed === true && lecture.startDate === chosenDate
    );
    if (checkScheduledConflict.length === 0) {
      this.props.requestApiPostSubscribe(lectureId, this.props.registrationId);
    } else {
      this.props.showEnrollmentMessage(
        `Palestra com conflito de horário ${chosenDate}`
      );
    }
  };
  handleUnsubscribe = lectureId => {
    this.props.requestApiPostUnsubscribe(lectureId, this.props.registrationId);
  };
  searcHlectures = () => {
    this.setState({ searchLecturesOption: true });
  };
  validateEnrollment = () => {
    //return <Redirect to={"certificated"} />;
    //this.props.showEnrollmentMessage("Comprovante de Inscrição");
  };
  handleMoreInfo = lectureId => {
    this.props.requestApiGetEventDetails(lectureId);
    this.props.requestApiGetEventSpeaker(lectureId);
    this.setState({ openSpeakerModal: true });
  };
  handleRequestClose = () => this.setState({ openSpeakerModal: false });
  Transition = props => {
    return <Slide direction="left" {...props} />;
  };

  render() {
    const {
      showMessage,
      alertMessage,
      registrationID,
      lecturesList,
      classes,
      areasList,
      eventDetails,
      eventSpeakers
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
                    <ListItem
                      key={data.id}
                      divider
                      classes={{ root: classes.root }}
                    >
                      <Lectures
                        key={data.id}
                        data={data}
                        handleMoreInfo={this.handleMoreInfo}
                        handleSubscribe={this.handleUnsubscribe}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h2 className="mt-3">Não há palestras selecionadas</h2>
              )}

              <div className=" d-flex flex-column align-items-center justify-content-center">
                <NavLink to={`certificated`}>
                  <Button variant="contained" color="secondary">
                    <IntlMessages id="appModule.end" />
                  </Button>
                </NavLink>
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
                    <ListItem
                      divider
                      key={data.id}
                      classes={{ root: classes.root }}
                    >
                      <Lectures
                        key={data.id}
                        data={data}
                        handleMoreInfo={this.handleMoreInfo}
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
          <SearchLectureOrAccessEvent
            searcHlectures={this.searcHlectures}
            validateEnrollment={this.validateEnrollment}
          />
        )}
        <Dialog
          fullScreen
          open={this.state.openSpeakerModal}
          onClose={this.handleRequestClose}
          TransitionComponent={this.Transition}
        >
          <AppBar className="position-relative" color="secondary">
            <Toolbar>
              <IconButton onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h5"
                color="inherit"
                style={{
                  flex: 1
                }}
              >
                <IntlMessages id="pages.moreDetails" />
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="d-flex flex-wrap justify-content-center">
            <EventDetails event={eventDetails} />
            <EventSpeakers speakers={eventSpeakers} />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, enrollment }) => {
  const { registrationID } = auth;
  const {
    showMessage,
    alertMessage,
    lecturesList,
    areasList,
    eventDetails,
    eventSpeakers
  } = enrollment;
  return {
    registrationID,
    showMessage,
    alertMessage,
    lecturesList,
    areasList,
    eventDetails,
    eventSpeakers
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
    requestApiPostUnsubscribe,
    requestApiGetEventDetails,
    requestApiGetEventSpeaker
  }
)(withStyles(styles)(Enrollment));
