import {
  SHOW_ENROLLMENT_MESSAGE,
  HIDE_ENROLLMENT_MESSAGE,
  RECIEVE_API_GET_ALL_AREAS,
  RECIEVE_API_GET_LECTURES,
  RECIEVE_API_SUBSCRIBE_LECTURE,
  RECIEVE_API_UNSUBSCRIBE_LECTURE
} from "constants/ActionTypes";

const INIT_STATE = {
  showMessage: false,
  alertMessage: "",
  lecturesList: [
    {
      id: 1,
      area: "MEIO AMBIENTE",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      startDate: "15/05 09:00",
      endDate: "15/05 10:00",
      subscribed: false
    },
    {
      id: 1,
      area: "TECNOLOGIA",
      title: "Tech guilherme tech",
      startDate: "15/05 09:00",
      endDate: "15/05 10:00",
      subscribed: false
    },
    {
      id: 1,
      area: "EDUCAÇÃO",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      startDate: "15/05 09:00",
      endDate: "15/05 10:00",
      subscribed: false
    },
    {
      id: 1,
      area: "SAÚDE",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      startDate: "15/05 09:00",
      endDate: "15/05 10:00",
      subscribed: true
    }
  ],
  areasList: [{ id: 1, name: "SAÚDE" }, { id: 1, name: "MEIO AMBIENTE" }]
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
        areasList: [action.payload]
      };
    }
    case RECIEVE_API_GET_LECTURES: {
      return {
        ...state,
        lecturesList: [action.payload]
      };
    }
    case RECIEVE_API_SUBSCRIBE_LECTURE: {
      return {
        ...state,
        lecturesList: state.lecturesList.map(lecture => {
          if (lecture.id === action.payload) {
            return { ...lecture, subscribed: true };
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
            return { ...lecture, subscribed: false };
          } else {
            return lecture;
          }
        })
      };
    }
    default:
      return state;
  }
};
