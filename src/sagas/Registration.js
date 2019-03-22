import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  SUBMIT_REGISTRATION_FORM,
  POPULATE_JOBS_SELECT_REQUEST,
  POPULATE_CITIES_SELECT_REQUEST,
  REQUEST_API_POST_USER_DATA
} from "constants/ActionTypes";
import { BASE_URL } from "constants/Environment";
import {
  checkCpfRegistrationRecieve,
  populateCitiesSelectRecieve,
  populateJobsSelectRecieve,
  showRegistrationMessage,
  getUserDataSuccess,
  setInitUrl
} from "actions";

const postRegistrationFormRequest = async form => {
  const responseFromServer = await fetch(
    `${BASE_URL}/api/registration/postRegistrationFormRequest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "amm-mg.org.br"
      },
      body: JSON.stringify(form)
    }
  );
  return await responseFromServer.json();
};
const getUserRequest = async cpf => {
  const responseFromServer = await fetch(
    `${BASE_URL}/api/registration/postGetUserRequest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "amm-mg.org.br"
      },
      body: JSON.stringify(cpf)
    }
  );
  return await responseFromServer.json();
};

const getJobsRequest = async () => {
  const responseFromServer = await fetch(
    `${BASE_URL}/api/registration/getJobsRequest`
  );
  return await responseFromServer.json();
};
const getCitiesRequest = async () => {
  const responseFromServer = await fetch(
    `${BASE_URL}/api/registration/getCitiesRequest`
  );
  return await responseFromServer.json();
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
function* getCities() {
  try {
    const cities = yield call(getCitiesRequest);
    yield put(populateCitiesSelectRecieve(cities));
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}
function* getJobs() {
  try {
    const jobs = yield call(getJobsRequest);
    yield put(populateJobsSelectRecieve(jobs));
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}

function* getUser({ payload }) {
  try {
    const userData = yield call(getUserRequest, payload);
    if (userData !== null) {
      yield put(getUserDataSuccess(userData));
    }
  } catch (err) {
    yield put(showRegistrationMessage(err));
  }
}
export function* populateJobsSelect() {
  yield takeEvery(POPULATE_JOBS_SELECT_REQUEST, getJobs);
}
export function* submitRegistrationForm() {
  yield takeLatest(SUBMIT_REGISTRATION_FORM, postRegistrationForm);
}
export function* populateCitiesSelect() {
  yield takeEvery(POPULATE_CITIES_SELECT_REQUEST, getCities);
}
export function* getUserDetails() {
  yield takeEvery(REQUEST_API_POST_USER_DATA, getUser);
}

export default function* rootSaga() {
  yield all([
    fork(populateJobsSelect),
    fork(submitRegistrationForm),
    fork(populateCitiesSelect),
    fork(getUserDetails)
  ]);
}
