import {
  SHOW_ENROLLMENT_MESSAGE,
  HIDE_ENROLLMENT_MESSAGE,
  RECIEVE_API_GET_ALL_AREAS,
  RECIEVE_API_GET_LECTURES,
  RECIEVE_API_SUBSCRIBE_LECTURE,
  RECIEVE_API_UNSUBSCRIBE_LECTURE,
  RECIEVE_API_EVENT_DETAILS,
  RECIEVE_API_EVENT_SPEAKER
} from "constants/ActionTypes";

const INIT_STATE = {
  showMessage: false,
  alertMessage: "",
  lecturesList: [],
  areasList: [],
  eventDetails: {},
  eventSpeakers: [],
  showLoader: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_ENROLLMENT_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    case HIDE_ENROLLMENT_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false
      };
    }

    case RECIEVE_API_GET_ALL_AREAS: {
      return {
        ...state,
        areasList: action.payload
      };
    }
    case RECIEVE_API_GET_LECTURES: {
      return {
        ...state,
        lecturesList: action.payload
      };
    }
    case RECIEVE_API_SUBSCRIBE_LECTURE: {
      return {
        ...state,
        lecturesList: state.lecturesList.map(lecture => {
          if (lecture.id === action.payload) {
            return { ...lecture, subscribed: 1 };
          } else {
            return lecture;
          }
        })
      };
    }
    case RECIEVE_API_UNSUBSCRIBE_LECTURE: {
      return {
        ...state,
        lecturesList: state.lecturesList.map(lecture => {
          if (lecture.id === action.payload) {
            return { ...lecture, subscribed: 0 };
          } else {
            return lecture;
          }
        })
      };
    }
    case RECIEVE_API_EVENT_DETAILS: {
      return {
        ...state,
        eventDetails: action.payload
      };
    }
    case RECIEVE_API_EVENT_SPEAKER: {
      return {
        ...state,
        eventSpeakers: action.payload
      };
    }
    default:
      return state;
  }
};
