import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  SUBMIT_REGISTRATION_FORM,
  POPULATE_JOBS_SELECT_REQUEST,
  POPULATE_CITIES_SELECT_REQUEST
} from "constants/ActionTypes";
import { BASE_URL } from "constants/Environment";
import {
  checkCpfRegistrationRecieve,
  populateCitiesSelectRecieve,
  populateJobsSelectRecieve,
  showRegistrationMessage,
  setInitUrl
} from "actions";

const postRegistrationFormRequest = async form => {
  return 123;
};

const getJobsRequest = async () => {
  return [{ id: 1, name: "PREFEITO(A)" }, { id: 2, name: "VICE-PREFEITO(A)" }];
};
const getCitiesRequest = async () => {
  return [{ id: 0, name: "Selecione" }, { id: 1, name: "ABADIA DOS DOURADOS" }];
};
function* postRegistrationForm({ payload }) {
  try {
    const registrationID = yield call(postRegistrationFormRequest, payload);
    yield put(checkCpfRegistrationRecieve(registrationID));
    yield put(push("/app/enrollment"));
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}
function* getCities({ payload }) {
  try {
    const cities = yield call(getCitiesRequest, payload);
    yield put(populateCitiesSelectRecieve(cities));
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}
function* getJobs({ payload }) {
  try {
    const jobs = yield call(getJobsRequest, payload);
    yield put(populateJobsSelectRecieve(jobs));
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}
export function* populateJobsSelect() {
  yield takeEvery(POPULATE_JOBS_SELECT_REQUEST, getJobs);
}
export function* submitRegistrationForm() {
  yield takeEvery(SUBMIT_REGISTRATION_FORM, postRegistrationForm);
}
export function* populateCitiesSelect() {
  yield takeEvery(POPULATE_CITIES_SELECT_REQUEST, getCities);
}

export default function* rootSaga() {
  yield all([
    fork(populateJobsSelect),
    fork(submitRegistrationForm),
    fork(populateCitiesSelect)
  ]);
}
