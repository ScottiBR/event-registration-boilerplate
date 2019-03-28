import React from "react";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
import CardBox from "components/CardBox";
const EventDetails = props => {
  const { title, description, startDate, endDate, area } = props.event;
  return (
    <CardBox
      styleName="col-sm-12 col-md-8 col-lg-8 mt-5"
      heading={<IntlMessages id="pages.eventDetails" />}
    >
      <div className="d-flex  flex-column justify-content-start">
        <h3 className="mb-3">{title}</h3>

        <p className="mb-2">{description}</p>
        <div className="d-flex flex-row justify-content-between align-items-start flex-wrap">
          <p className="text-grey mb-1">
            {<IntlMessages id="pages.enrollment.filter.area" />}: {area}
          </p>
          <p className="text-grey mb-1">
            <i
              className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`}
            />
            {moment(startDate).format("DD/MM HH:mm")} -{" "}
            {moment(endDate).format("DD/MM HH:mm")}
          </p>
        </div>
      </div>
    </CardBox>
  );
};
export default EventDetails;
