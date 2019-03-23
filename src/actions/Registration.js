import {
  SHOW_REGISTRATION_MESSAGE,
  HANDLE_VALUE_CHANGE,
  HIDE_REGISTRATION_MESSAGE,
  POPULATE_CITIES_SELECT_RECIEVE,
  POPULATE_CITIES_SELECT_REQUEST,
  POPULATE_JOBS_SELECT_RECIEVE,
  POPULATE_JOBS_SELECT_REQUEST,
  SUBMIT_REGISTRATION_FORM,
  REQUEST_API_POST_USER_DATA,
  REQUEST_API_POST_USER_DATA_SUCCESS,
  REDIRECT_TO_NEXT_PAGE
} from "constants/ActionTypes";

export const handleChangeValue = (name, value) => {
  return {
    type: HANDLE_VALUE_CHANGE,
    payload: { name, value }
  };
};
export const showRegistrationMessage = message => {
  return {
    type: SHOW_REGISTRATION_MESSAGE,
    payload: message
  };
};

export const hideRegistrationMessage = () => {
  return {
    type: HIDE_REGISTRATION_MESSAGE
  };
};

export const populateCitiesSelectRecieve = cities => {
  return {
    type: POPULATE_CITIES_SELECT_RECIEVE,
    payload: cities
  };
};

export const populateCitiesSelect = () => {
  return {
    type: POPULATE_CITIES_SELECT_REQUEST
  };
};

export const populateJobsSelectRecieve = jobs => {
  return {
    type: POPULATE_JOBS_SELECT_RECIEVE,
    payload: jobs
  };
};

export const populateJobsSelect = () => {
  return {
    type: POPULATE_JOBS_SELECT_REQUEST
  };
};

export const submitRegistrationForm = form => {
  return {
    type: SUBMIT_REGISTRATION_FORM,
    payload: form
  };
};

export const getUserData = cpf => {
  return {
    type: REQUEST_API_POST_USER_DATA,
    payload: cpf
  };
};
export const getUserDataSuccess = userData => {
  return {
    type: REQUEST_API_POST_USER_DATA_SUCCESS,
    payload: userData
  };
};

export const redirectToNextPage = () => {
  return {
    type: REDIRECT_TO_NEXT_PAGE
  };
};
