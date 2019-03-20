import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  REQUEST_API_GET_ALL_AREAS,
  REQUEST_API_GET_LECTURES,
  REQUEST_API_SUBSCRIBE_LECTURE,
  REQUEST_API_UNSUBSCRIBE_LECTURE
} from "constants/ActionTypes";
import { BASE_URL } from "constants/Environment";
import {
  hideEnrollmentMessage,
  recieveApiGetAllAreas,
  recieveApiGetLectures,
  recieveApiPostSubscribe,
  recieveApiPostUnsubscribe
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

function* postUnsubscribeLecture({ payload }) {
  try {
    const unsubscribe = yield call(postUnsubscribeLectureRequest, payload);
    if (unsubscribe.error) {
      yield put(showRegistrationMessage(semVagas));
    } else {
      yield put(recieveApiPostUnsubscribe(payload.lectureId));
    }
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}

function* postSubscribeLecture({ payload }) {
  try {
    const subscribe = yield call(postSubscribeLectureRequest, payload);
    if (subscribe.error) {
      yield put(showRegistrationMessage(semVagas));
    } else {
      yield put(recieveApiPostSubscribe(payload.lectureId));
    }
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}
function* getLectures({ payload }) {
  try {
    const lecturesList = yield call(getLecturesRequest, payload);
    yield put(recieveApiGetLectures(lecturesList));
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}
function* getAllAreas() {
  try {
    const areas = yield call(getAllAreasRequest, payload);
    yield put(recieveApiGetAllAreas(areas));
  } catch (err) {
    yield put(showRegistrationMessage(err));
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

export default function* rootSaga() {
  yield all([
    fork(requestApiGetAllAreas),
    fork(requestApiGetLectures),
    fork(requestApiPostSubscribeLecture),
    fork(requestApiPostUnsubscribeLecture)
  ]);
}
