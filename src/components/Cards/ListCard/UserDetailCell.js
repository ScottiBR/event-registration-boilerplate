import React from "react";
import Avatar from "@material-ui/core/Avatar";
import WhatsAppIcon from "assets/images/wtzp-app-amm.png";
import NumberFormat from "react-number-format";
import FacebookIcon from "assets/images/fb-app-amm.png";
import InstagramIcon from "assets/images/ig-app-amm.png";
import MoreIcon from "assets/images/round-add-button.png";

const UserDetailCell = props => {
  const {
    id,
    name,
    nickName,
    photoFile,
    phone,
    party,
    facebook,
    instagram
  } = props.data;
  const photoURL = photoFile
    ? `http://gestor2.amm-mg.org.br/_lib/file/img/cage/${id}/${photoFile}`
    : "";
  const iconStyle = { height: 24, width: 24, marginRight: 20 };
  return (
    <tr tabIndex={-1} key={id}>
      <td className="border-bottom border-top-0">
        <div className="user-profile d-flex flex-row align-items-center">
          <Avatar alt={name} src={photoURL} className="user-avatar mr-2" />
          <div className="user-detail flex-wrap">
            <h5 className="font-weight-bold text-capitalize mb-0">
              {name.toLowerCase()}
            </h5>
            {nickName && (
              <p className="user-description  text-capitalize">
                ({nickName.toLowerCase()})
              </p>
            )}
            {party && <p className="user-description">{party}</p>}
            {phone && (
              <div className="user-description mb-2">
                <a href={"tel:" + phone}>
                  <NumberFormat
                    value={phone}
                    displayType={"text"}
                    format="(##) #####-####"
                  />
                </a>
              </div>
            )}
            <div className="d-flex flex-row align-items-start justify-content-start">
              {props.more && (
                <img
                  alt="whatsapp"
                  style={iconStyle}
                  src={MoreIcon}
                  onClick={() => props.handleClickRequest(id)}
                />
              )}
              {phone && (
                <a href={"https://wa.me/55" + phone}>
                  <img alt="whatsapp" style={iconStyle} src={WhatsAppIcon} />
                </a>
              )}
              {facebook && (
                <a href={"http://facebook.com/" + facebook}>
                  <img alt="Facebook" style={iconStyle} src={FacebookIcon} />
                </a>
              )}
              {instagram && (
                <a href={"http://instagram.com/_u/" + instagram}>
                  <img alt="Instagram" style={iconStyle} src={InstagramIcon} />
                </a>
              )}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default UserDetailCell;
