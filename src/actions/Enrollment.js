import {
  SHOW_ENROLLMENT_MESSAGE,
  HIDE_ENROLLMENT_MESSAGE,
  REQUEST_API_GET_ALL_AREAS,
  RECIEVE_API_GET_ALL_AREAS,
  REQUEST_API_GET_LECTURES,
  RECIEVE_API_GET_LECTURES,
  REQUEST_API_SUBSCRIBE_LECTURE,
  RECIEVE_API_SUBSCRIBE_LECTURE,
  REQUEST_API_UNSUBSCRIBE_LECTURE,
  RECIEVE_API_UNSUBSCRIBE_LECTURE
} from "constants/ActionTypes";

export const showEnrollmentMessage = message => {
  return {
    type: SHOW_ENROLLMENT_MESSAGE,
    payload: message
  };
};

export const hideEnrollmentMessage = () => {
  return {
    type: HIDE_ENROLLMENT_MESSAGE
  };
};
export const requestApiGetAllAreas = () => {
  return {
    type: REQUEST_API_GET_ALL_AREAS
  };
};
export const recieveApiGetAllAreas = areasList => {
  return {
    type: RECIEVE_API_GET_ALL_AREAS,
    payload: areasList
  };
};
export const requestApiGetLectures = registrationId => {
  return {
    type: REQUEST_API_GET_LECTURES,
    payload: registrationId
  };
};
export const recieveApiGetLectures = lecturesList => {
  return {
    type: RECIEVE_API_GET_LECTURES,
    payload: lecturesList
  };
};
export const requestApiPostSubscribe = (lectureId, RegistrationId) => {
  return {
    type: REQUEST_API_SUBSCRIBE_LECTURE,
    payload: { lectureId, RegistrationId }
  };
};
export const recieveApiPostSubscribe = lectureId => {
  return {
    type: RECIEVE_API_SUBSCRIBE_LECTURE,
    payload: lectureId
  };
};
export const requestApiPostUnsubscribe = (lectureId, RegistrationId) => {
  return {
    type: REQUEST_API_UNSUBSCRIBE_LECTURE,
    payload: { lectureId, RegistrationId }
  };
};
export const recieveApiPostUnsubscribe = lectureId => {
  return {
    type: RECIEVE_API_UNSUBSCRIBE_LECTURE,
    payload: lectureId
  };
};
