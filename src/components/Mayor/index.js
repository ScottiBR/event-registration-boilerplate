import React from "react";
import IntlMessages from "util/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import CallIcon from "assets/images/ligar-app-amm.png";
import WhatsAppIcon from "assets/images/wtzp-app-amm.png";
import FacebookIcon from "assets/images/fb-app-amm.png";
import InstagramIcon from "assets/images/ig-app-amm.png";
import AlbumIcon from "assets/images/album.png";
import NumberFormat from "react-number-format";
import Moment from "moment";
const Mayor = props => {
  const {
    name,
    photoUrl,
    microPresident,
    phone,
    boardDirectorMember,
    facebook,
    instagram,
    nickName,
    email,
    party,
    flickr,
    photoFile,
    birthDate,
    city
  } = props.mayor;
  const iconStyle = { height: 32, width: 32, marginRight: 15 };
  return (
    <div>
      <div className="d-flex flex-row align-items-center justify-content-center">
        {photoFile ? (
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

      <div className="d-flex flex-row align-items-start">
        <div className="user-detail">
          {city && (
            <h5 className="font-weight-bold text-capitalize mb-1">
              {city.toLowerCase()}
            </h5>
          )}
          <h5 className="font-weight-bold text-capitalize mb-1">
            {name.toLowerCase()} {nickName && <small>({nickName})</small>}
          </h5>

          {microPresident && (
            <p className="text-capitalize  mb-1">
              {<IntlMessages id="pages.cityInfo.mayor.president" />}
              {microPresident}
            </p>
          )}
          {boardDirectorMember && (
            <h5 className="font-weight-bold text-capitalize mb-1">
              {<IntlMessages id="pages.cityInfo.mayor.boardDirectorMember" />}
              <small> {boardDirectorMember}</small>
            </h5>
          )}
          <h5 className="font-weight-bold text-capitalize mb-1">
            {<IntlMessages id="pages.cityInfo.mayor.birthDate" />}
            <small> {Moment(birthDate).format("DD/MM/YYYY")}</small>
          </h5>

          <h5 className="font-weight-bold text-capitalize mb-1">
            {<IntlMessages id="pages.cityInfo.mayor.party" />}
            <small> {party}</small>
          </h5>

          <p className="mb-1">
            <a href={"mailto:" + email}>{email}</a>
          </p>
          <span className="text-light">
            <NumberFormat
              value={phone}
              displayType={"text"}
              format="(##) #####-####"
            />
          </span>
        </div>
      </div>
      <div className="user-profile d-flex flex-row align-items-center justify-content-between">
        <a href={"tel:" + phone}>
          <img alt="CallIcon" style={iconStyle} src={CallIcon} />
        </a>
        <a href={"https://wa.me/55" + phone}>
          <img alt="whatsapp" style={iconStyle} src={WhatsAppIcon} />
        </a>
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
        {flickr && (
          <a href={flickr} target="_blank" rel="noopener noreferrer">
            <img alt="fotos" style={iconStyle} src={AlbumIcon} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Mayor;
