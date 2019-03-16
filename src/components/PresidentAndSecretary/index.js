import React from "react";
import Dialog from "@material-ui/core/Dialog";
import CardBox from "components/CardBox/index";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserDetailCell from "components/Cards/ListCard/UserDetailCell";
import MayorDetails from "components/Mayor/index";

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

const PresidentAndSecretary = props => {
  const { state, handleRequestClose, secretary, president } = props;
  return (
    <div>
      <Dialog
        fullScreen
        open={state.open}
        onClose={handleRequestClose}
        TransitionComponent={Transition}
      >
        <AppBar className="position-relative" color="secondary">
          <Toolbar>
            <IconButton onClick={handleRequestClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              style={{
                flex: 1
              }}
            >
              <IntlMessages id="pages.presidentAndSecretary" />
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="d-flex flex-wrap justify-content-center">
          {president.presidentLoader ? (
            <div className="loader-view">
              <CircularProgress />
            </div>
          ) : (
            <CardBox
              styleName="col-sm-6 col-md-6 col-lg-4"
              childrenStyle="d-flex  flex-column justify-content-start"
              heading={
                <IntlMessages id="pages.presidentAndSecretary.president" />
              }
            >
              <MayorDetails mayor={president} />
            </CardBox>
          )}
          {secretary.secretaryLoader ? (
            <div className="loader-view">
              <CircularProgress />
            </div>
          ) : (
            <CardBox
              styleName="col-sm-6 col-md-6 col-lg-4"
              childrenStyle="d-flex  flex-column justify-content-start"
              heading={
                <IntlMessages id="pages.presidentAndSecretary.secretary" />
              }
            >
              <UserDetailCell key={secretary.id} data={secretary} />
            </CardBox>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default PresidentAndSecretary;
