import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";

import {
  SIGNIN_USER,
  SIGNIN_CHECK_CPF_REGISTRATION_REQUEST,
  SIGNIN_USER_WITH_BDAY
} from "constants/ActionTypes";
import { BASE_URL } from "constants/Environment";
import {
  showAuthMessage,
  userSignInSuccess,
  checkCpfRegistrationRecieve,
  setInitUrl
} from "actions/Auth";

const signInUserWithLoginPasswordRequest = async userCredentials => {
  const responseFromServer = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "amm-mg.org.br"
    },
    body: JSON.stringify(userCredentials)
  });
  return await responseFromServer.json();
};

const signInUserWithBirthDayRequest = async userCredentials => {
  const responseFromServer = await fetch(
    `${BASE_URL}/api/auth/signinWithBDay`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "amm-mg.org.br"
      },
      body: JSON.stringify(userCredentials)
    }
  );
  return await responseFromServer.json();
};
const checkCpfAlreadyRegistredRequest = async cpf => {
  const responseFromServer = await fetch(
    `${BASE_URL}/api/auth/checkCpfAlreadyRegistred`,
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
function* signInUserWithLoginPassword({ payload }) {
  try {
    const user = yield call(signInUserWithLoginPasswordRequest, payload);
    console.log(user);
    if (user.error) {
      yield put(showAuthMessage(user.error));
    } else {
      yield put(userSignInSuccess(user.CPF));
    }
  } catch (err) {
    yield put(showAuthMessage(err));
  }
}
function* signInUserWithBirthDay({ payload }) {
  try {
    const user = yield call(signInUserWithBirthDayRequest, payload);
    console.log(user);
    if (user.error) {
      yield put(showAuthMessage(user.error));
    } else {
      yield put(userSignInSuccess(user.CPF));
    }
  } catch (err) {
    yield put(showAuthMessage(err));
  }
}
function* checkCpfAlreadyRegistred({ payload }) {
  try {
    const registrationID = yield call(checkCpfAlreadyRegistredRequest, payload);
    if (registrationID === null) {
      yield put(userSignInSuccess(payload.cpf));
      //yield put(push("/app/registration"));
    } else {
      yield put(checkCpfRegistrationRecieve(registrationID));
    }
  } catch (err) {
    yield put(showAuthMessage(err));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithLoginPassword);
}
export function* signInUserWithBDay() {
  yield takeEvery(SIGNIN_USER_WITH_BDAY, signInUserWithBirthDay);
}
export function* checkCpfRegistration() {
  yield takeEvery(
    SIGNIN_CHECK_CPF_REGISTRATION_REQUEST,
    checkCpfAlreadyRegistred
  );
}
export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(signInUserWithBDay),
    fork(checkCpfRegistration)
  ]);
}
