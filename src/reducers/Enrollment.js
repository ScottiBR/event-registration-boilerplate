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
      id: 2,
      area: "TECNOLOGIA",
      title: "Tech guilherme tech",
      startDate: "15/05 09:00",
      endDate: "15/05 10:00",
      subscribed: false
    },
    {
      id: 3,
      area: "EDUCAÇÃO",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      startDate: "15/05 14:00",
      endDate: "15/05 15:00",
      subscribed: false
    },
    {
      id: 4,
      area: "SAÚDE",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      startDate: "15/05 16:00",
      endDate: "15/05 17:00",
      subscribed: false
    }
  ],
  areasList: [{ id: 1, name: "SAÚDE" }, { id: 1, name: "MEIO AMBIENTE" }],
  eventDetails: {
    id: 1,
    area: "MEIO AMBIENTE",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    startDate: "15/05 09:00",
    endDate: "15/05 10:00",
    subscribed: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
  },
  eventSpeakers: [
    {
      name: "Breno Henrique Leite Cota",
      job: "Gestor De Projetos",
      company: "WETLANDS CONSTRUÍDOS",
      jobHistory:
        "Gestor de Projetos na Empresa Wetlands Construídos. Graduado em Arquitetura/Urbanismo (UFMG) e Pós-graduado em Gestão Ambiental de Resíduos Sólidos (PUC/MG)",
      photoUrl: ""
    }
  ]
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
    case RECIEVE_API_EVENT_DETAILS: {
      return {
        ...state,
        eventDetails: action.payload
      };
    }
    case RECIEVE_API_EVENT_SPEAKER: {
      return {
        ...state,
        eventSpeakers: [action.payload]
      };
    }
    default:
      return state;
  }
};
