import React from "react";
import IntlMessages from "util/IntlMessages";
import Iframe from "react-iframe";
class Certificated extends React.Component {
  render() {
    return (
      <div className="app-iframe-view">
        <Iframe
          url="http://gestor2.amm-mg.org.br/gc_pdf_recibo/gc_pdf_recibo.php?idMensalidade=29456"
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

export default Certificated;
