import React from "react";
import IntlMessages from "util/IntlMessages";
import CardBox from "components/CardBox";
import Avatar from "@material-ui/core/Avatar";

const EventDetails = props => {
  const { name, job, company, jobHistory, photoUrl } = props.speakers[0];
  return (
    <CardBox
      styleName="col-sm-12 col-md-8 col-lg-6  mt-5"
      heading={<IntlMessages id="pages.speakers" />}
    >
      <div className="d-flex  flex-column justify-content-start">
        <div className="user-profile d-flex flex-row justify-content-center">
          {photoUrl ? (
            <Avatar
              alt={name}
              src={photoUrl}
              className="user-avatar size-90 mb-3"
            />
          ) : (
            <Avatar
              src={require("assets/images/placeholder.jpg")}
              className="user-avatar size-90 mb-3"
            />
          )}
        </div>
        <h3 className="mb-2">{name}</h3>
        <div className="d-flex flex-row justify-content-start align-items-start flex-wrap">
          <p className="text-grey mb-1 mr-3">{job}</p>
          <p className="text-grey mb-1">{company}</p>
        </div>

        <p className="mb-2">{jobHistory}</p>
      </div>
    </CardBox>
  );
};
export default EventDetails;
