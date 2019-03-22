import React from "react";
import IntlMessages from "util/IntlMessages";
import Iframe from "react-iframe";
import { connect } from "react-redux";
class Certificated extends React.Component {
  render() {
    return (
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
