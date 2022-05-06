import React from "react";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
class Certificated extends React.Component {
  render() {
    const gestorUrl = `http://gestor2.amm-mg.org.br/pdf_comprovante_inscricao_low?ID=${
      this.props.registrationID
    }`
    return (
      <div className="d-flex flex-column m-2">
        <div className="d-flex flex-column justify-content-center">
          <h3>
            <IntlMessages id={"pages.certificate.warningText"} />
          </h3>
          <div className="d-flex justify-content-center align-items-center m-4">
            <Button
              href={gestorUrl}
              variant="contained"
              color="secondary"
              size="large"
            >
              GERAR COMPROVANTE
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, enrollment }) => {
  const { registrationID } = auth;
  return {
    registrationID,
  };
};
export default connect(mapStateToProps)(Certificated);
