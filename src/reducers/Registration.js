import {
  SHOW_REGISTRATION_MESSAGE,
  HANDLE_VALUE_CHANGE,
  HIDE_REGISTRATION_MESSAGE,
  POPULATE_JOBS_SELECT_RECIEVE,
  POPULATE_CITIES_SELECT_RECIEVE
} from "constants/ActionTypes";

const INIT_STATE = {
  name: "",
  jobId: "",
  phone: "",
  email: "",
  password: "",
  birthDay: "",
  company: "",
  companyType: "P",
  jobs: [],
  cities: [],
  showMessage: false,
  alertMessage: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_REGISTRATION_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    case HANDLE_VALUE_CHANGE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    }
    case HIDE_REGISTRATION_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false
      };
    }

    case POPULATE_JOBS_SELECT_RECIEVE: {
      return {
        ...state,
        jobs: action.payload
      };
    }
    case POPULATE_CITIES_SELECT_RECIEVE: {
      return {
        ...state,
        cities: action.payload
      };
    }

    default:
      return state;
  }
};
