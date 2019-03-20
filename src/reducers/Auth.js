import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNIN_SET_CPF,
  SIGNIN_CHECK_CPF_REGISTRATION_RECIEVE
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  authUser: 123,
  cpf: "12042796670",
  registrationID: 123
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN_SET_CPF: {
      return {
        ...state,
        cpf: action.payload
      };
    }
    case SIGNIN_CHECK_CPF_REGISTRATION_RECIEVE: {
      return {
        ...state,
        loader: false,
        registrationID: action.payload
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      };
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false
      };
    }

    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      };
    }
    default:
      return state;
  }
};
