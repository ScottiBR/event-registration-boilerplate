import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  REQUEST_API_GET_ALL_AREAS,
  REQUEST_API_GET_LECTURES,
  REQUEST_API_SUBSCRIBE_LECTURE,
  REQUEST_API_UNSUBSCRIBE_LECTURE,
  REQUEST_API_GET_EVENT_DETAILS,
  REQUEST_API_GET_EVENT_SPEAKER
} from "constants/ActionTypes";
import { BASE_URL } from "constants/Environment";
import {
  hideEnrollmentMessage,
  showEnrollmentMessage,
  recieveApiGetAllAreas,
  recieveApiGetLectures,
  recieveApiPostSubscribe,
  recieveApiPostUnsubscribe,
  recieveApiGetEventSpeaker,
  recieveApiGetEventDetails
} from "actions";

const postUnsubscribeLectureRequest = async ({ lectureId, RegistrationId }) => {
  return { error: null };
};
const postSubscribeLectureRequest = async ({ lectureId, RegistrationId }) => {
  return { error: null };
};
const getAllAreasRequest = async () => {
  return [];
};
const getLecturesRequest = async registrationId => {
  return [];
};
const getEventDetailsRequest = async lectureId => {
  return {};
};
const getEventSpeakerRequest = async lectureId => {
  return {};
};
function* postUnsubscribeLecture({ payload }) {
  try {
    const unsubscribe = yield call(postUnsubscribeLectureRequest, payload);
    if (unsubscribe.error) {
      yield put(showEnrollmentMessage(unsubscribe.error));
    } else {
      yield put(recieveApiPostUnsubscribe(payload.lectureId));
    }
  } catch (err) {
    yield put(showEnrollmentMessage(err));
  }
}

function* postSubscribeLecture({ payload }) {
  try {
    const subscribe = yield call(postSubscribeLectureRequest, payload);
    if (subscribe.error) {
      yield put(showEnrollmentMessage(subscribe.error));
    } else {
      yield put(recieveApiPostSubscribe(payload.lectureId));
    }
  } catch (err) {
    yield put(showEnrollmentMessage(err));
  }
}
function* getLectures({ payload }) {
  try {
    const lecturesList = yield call(getLecturesRequest, payload);
    yield put(recieveApiGetLectures(lecturesList));
  } catch (err) {
    yield put(showEnrollmentMessage(err));
  }
}
function* getAllAreas() {
  try {
    const areas = yield call(getAllAreasRequest);
    yield put(recieveApiGetAllAreas(areas));
  } catch (err) {
    yield put(showEnrollmentMessage(err));
  }
}
function* getEventDetails() {
  try {
    const eventDetails = yield call(getEventDetailsRequest);
    yield put(recieveApiGetEventDetails(eventDetails));
  } catch (err) {
    yield put(showEnrollmentMessage(err));
  }
}
function* getEventSpeaker() {
  try {
    const eventSpeakers = yield call(getEventSpeakerRequest);
    yield put(recieveApiGetEventSpeaker(eventSpeakers));
  } catch (err) {
    yield put(showEnrollmentMessage(err));
  }
}
export function* requestApiGetAllAreas() {
  yield takeEvery(REQUEST_API_GET_ALL_AREAS, getAllAreas);
}
export function* requestApiGetLectures() {
  yield takeEvery(REQUEST_API_GET_LECTURES, getLectures);
}
export function* requestApiPostSubscribeLecture() {
  yield takeEvery(REQUEST_API_SUBSCRIBE_LECTURE, postSubscribeLecture);
}
export function* requestApiPostUnsubscribeLecture() {
  yield takeEvery(REQUEST_API_UNSUBSCRIBE_LECTURE, postUnsubscribeLecture);
}
export function* requestApiGetEventDetails() {
  yield takeEvery(REQUEST_API_GET_EVENT_DETAILS, getEventDetails);
}
export function* requestApiGetEventSpeaker() {
  yield takeEvery(REQUEST_API_GET_EVENT_SPEAKER, getEventSpeaker);
}
export default function* rootSaga() {
  yield all([
    fork(requestApiGetAllAreas),
    fork(requestApiGetLectures),
    fork(requestApiPostSubscribeLecture),
    fork(requestApiPostUnsubscribeLecture),
    fork(requestApiGetEventDetails),
    fork(requestApiGetEventSpeaker)
  ]);
}
