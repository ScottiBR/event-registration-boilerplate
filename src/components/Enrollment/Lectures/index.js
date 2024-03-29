import React from "react";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import moment from "moment";
const areaColors = area => {
  switch (area) {
    case "VIII ENCONTRO DE SECRETÁRIOS - MEIO AMBIENTE":
      return "light-green";
    case "SEMINÁRIO DE SAÚDE - TERRITÓRIO REG.":
      return "sepia";
    case " III SEMINÁRIO DE COOPERAÇÃO MUNICIPAL NO TERRITÓRIO REGIONAL DE SAÚDE":
        return "sepia";
    case "I FÓRUM MINEIRO DE CULTURA E TURISMO":
      return "info";
    case " III ENCONTRO DE PREFEITAS, VICES E VEREADORAS":
      return "pink";
    case "V SEMINÁRIO DE ASSISTÊNCIA SOCIAL":
      return "brown";
    case "ASSISTÊNCIA SOCIAL":
      return "brown";
    case "III SEMINÁRIO DE PROCURADORES, CONTROLADORES E OUVIDORES MUNICIPAIS":
      return "dark";
    case "CONGRESSO DE VEREADORES":
      return "deep-orange";
    case "VIII FÓRUM MINEIRO DE EDUCAÇÃO":
      return "indigo";
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

      <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
        <p className="text-grey mb-1">
          <i
            className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`}
          />
          {moment(startDate).format("DD/MM HH:mm")} -{" "}
          {moment(endDate).format("DD/MM HH:mm")}
        </p>
        <Button
          variant="text"
          size="small"
          color="info"
          onClick={() => props.handleMoreInfo(id)}
        >
          <span>Detalhes</span>{" "}
          <i
            className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle`}
          />
        </Button>
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
