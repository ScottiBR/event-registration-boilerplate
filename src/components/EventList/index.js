import React from "react";
import Checked from "assets/images/checked-icon.png";
import Cancel from "assets/images/cancel-filled-icon.png";
import Moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";

const EventItem = ({ id, type, name, location, date, presence }) => {
  return (
    <div key={id} className="media jr-task-list-item flex-nowrap ml-10">
      {presence ? (
        <img
          style={{ width: 20, marginRight: 10 }}
          alt="Checked"
          src={Checked}
        />
      ) : (
        <img
          style={{ width: 20, marginRight: 10 }}
          alt="Checked"
          src={Cancel}
        />
      )}
      <div className="media-body jr-task-item-content">
        <div className="user-detail">
          <h5 className="text-truncate jr-task-item-title text-capitalize mb-1">
            {type.toLowerCase()}
          </h5>
          <p className="text-grey jr-fs-sm mb-0">{name}</p>
          <p className="text-grey jr-fs-sm mb-0">
            {location} - {Moment(date).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

const EventList = props => {
  const { externalEventsLoader, externalEvents } = props;
  return (
    <div>
      {externalEventsLoader ? (
        <div className="loader-view">
          <CircularProgress />
        </div>
      ) : (
        <div>
          {externalEvents.length > 0 ? (
            externalEvents.map(EventItem)
          ) : (
            <h3>Sem Eventos Cadastrados</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
