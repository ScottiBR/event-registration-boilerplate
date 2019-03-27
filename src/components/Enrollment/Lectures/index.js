import React from "react";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import moment from "moment";
const areaColors = area => {
  switch (area) {
    case "ENCONTRO DE SECRETÁRIOS DE MEIO AMBIENTE":
      return "success";
    case "SEMINÁRIO DE ASSISTÊNCIA SOCIAL":
      return "sepia";
    case "SEMINÁRIO DE TECNOLOGIA E INOVAÇÃO PUBLICA":
      return "info";
    case "ENCONTRO DE PREFEITAS, VICES E VEREADORAS":
      return "lightpink";
    case "FÓRUM MINEIRO DE EDUCAÇÃO":
      return "lightyellow";
    case "FÓRUM MINEIRO DE EDUCAÇÃO":
      return "dark";
    case "SEMINÁRIO DE SAÚDE":
      return "geekblue";
    default:
      return "";
  }
};

const Lectures = props => {
  const { id, area, title, startDate, endDate, subscribed, full } = props.data;

  return (
    <div className="d-flex flex-column list-full-width">
      <div className="jr-featured-content-left mt-2">
        <span
          className={`jr-tag text-uppercase bg-${areaColors(
            area
          )} d-inline-block`}
          color="#06BB8A"
        >
          {area}
        </span>
      </div>
      <h4 className="mb-1">{title}</h4>

      <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
        <p className="text-grey mb-1">
          <i
            className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`}
          />
          {moment(startDate).format("DD/MM HH:mm")} -{" "}
          {moment(endDate).format("DD/MM HH:mm")}
        </p>
        <a
          className="text-primary ml-auto mb-0 pointer"
          onClick={() => props.handleMoreInfo(id)}
        >
          <span>Detalhes</span>{" "}
          <i
            className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle`}
          />
        </a>
      </div>
      <div className="mb-3 mt-1 d-flex flex-column align-items-center justify-content-center">
        {subscribed ? (
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => props.handleUnsubscribe(id)}
          >
            <IntlMessages id="appModule.unSubscribe" />
          </Button>
        ) : (
          <div>
            {full ? (
              <Button
                variant="contained"
                size="small"
                disabled
                color="primary"
                onClick={() => props.handleSubscribe(id, startDate, endDate)}
              >
                <IntlMessages id="appModule.full" />
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => props.handleSubscribe(id, startDate, endDate)}
              >
                <IntlMessages id="appModule.subscribe" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lectures;
