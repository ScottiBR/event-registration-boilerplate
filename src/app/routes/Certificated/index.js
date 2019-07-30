import React from "react";
import IntlMessages from "util/IntlMessages";
import Iframe from "react-iframe";
import { connect } from "react-redux";
class Certificated extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column m-2">
        <div className="d-flex flex-column justify-content-center">
          <h3>
            <IntlMessages id={"pages.certificate.warningText"} />
          </h3>
          <p>
            Caso ocorra problemas para baixar o comprovante, clique no link ao
            lado{" "}
            <a
              href={`http://gestor2.amm-mg.org.br/pdf_comprovante_inscricao_low?ID=${
                this.props.registrationID
              }`}
            >
              PDF
            </a>
          </p>
        </div>
        <div className="app-iframe-view">
          <Iframe
            url={`http://gestor2.amm-mg.org.br/comprovante_inscricao?ID=${
              this.props.registrationID
            }`}
            width="100%"
            height="100%"
            id="certificatedPDF"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, enrollment }) => {
  const { registrationID } = auth;
  return {
    registrationID
  };
};
export default connect(mapStateToProps)(Certificated);
