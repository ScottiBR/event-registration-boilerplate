import React from "react";
import IntlMessages from "util/IntlMessages";
import CardBox from "components/CardBox";
import Button from "@material-ui/core/Button";

import { NavLink } from "react-router-dom";
const SearchLectureOrAccessEvent = props => {
  return (
    <div className="d-flex justify-content-center ">
      <CardBox
        styleName="col-lg-6 col-md-8  col-sm-12"
        childrenStyle="d-flex flex-column justify-content-center"
      >
        <div>
          <h3 className="mb-3">
            <IntlMessages id="appModule.acessQuestion" />
          </h3>
          <p className="text-warning">
            <IntlMessages id="appModule.acessQuestionDescription" />
          </p>
          <div className="d-flex flex-row justify-content-between mb-2 ">
            <NavLink to={`certificated`}>
              <Button variant="contained" color="secondary">
                <IntlMessages id="appModule.accessEvent" />
              </Button>
            </NavLink>
            <Button
              onClick={props.searcHlectures}
              variant="contained"
              color="secondary"
            >
              <IntlMessages id="appModule.lectureSubscription" />
            </Button>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default SearchLectureOrAccessEvent;
