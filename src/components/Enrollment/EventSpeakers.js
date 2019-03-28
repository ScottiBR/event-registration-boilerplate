import React from "react";
import IntlMessages from "util/IntlMessages";
import CardBox from "components/CardBox";
import Avatar from "@material-ui/core/Avatar";

const SpeakerCard = ({ name, job, company, jobHistory, photoFile }) => {
  const photoUrl = `http://gestor2.amm-mg.org.br/_lib/file/img/palestrantes/${photoFile}`;
  return (
    <div className="mb-2">
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
  );
};

const EventSpeakers = props => {
  return (
    <CardBox
      styleName="col-sm-12 col-md-8 col-lg-6"
      heading={<IntlMessages id="pages.speakers" />}
    >
      <div className="d-flex  flex-column justify-content-start">
        {props.speakers.map(speaker => SpeakerCard(speaker))}
      </div>
    </CardBox>
  );
};
export default EventSpeakers;
