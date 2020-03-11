import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_SET_CPF,
  SIGNIN_USER_WITH_BDAY,
  SIGNIN_CHECK_CPF_REGISTRATION_REQUEST,
  SIGNIN_CHECK_CPF_REGISTRATION_RECIEVE,
  GET_EVENT_CONFIG,
  GET_EVENT_CONFIG_SUCCESS
} from "constants/ActionTypes";

export const getEventConfig = () => ({
  type: GET_EVENT_CONFIG
});

export const getEventConfigSuccess = eventConfig => {
  return {
    type: GET_EVENT_CONFIG_SUCCESS,
    payload: eventConfig
  };
};

export const setCPF = cpf => {
  return {
    type: SIGNIN_SET_CPF,
    payload: cpf
  };
};
export const userSignInWithBDay = user => {
  return {
    type: SIGNIN_USER_WITH_BDAY,
    payload: user
  };
};
export const checkCpfRegistrationRequest = cpf => {
  return {
    type: SIGNIN_CHECK_CPF_REGISTRATION_REQUEST,
    payload: cpf
  };
};
export const checkCpfRegistrationRecieve = registrationID => {
  return {
    type: SIGNIN_CHECK_CPF_REGISTRATION_RECIEVE,
    payload: registrationID
  };
};
export const userSignIn = user => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignInSuccess = authUser => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  };
};

export const showAuthMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER
  };
};

export const setInitUrl = url => {
  return {
    type: INIT_URL,
    payload: url
  };
};
