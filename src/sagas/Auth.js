import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { SIGNIN_USER, SIGNOUT_USER } from "constants/ActionTypes";
import { BASE_URL } from "constants/Environment";
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess
} from "actions/Auth";

const signInUserWithLoginPasswordRequest = async userCredentials => {
  return { token: 123, name: "sdsda" };
  const responseFromServer = await fetch(`${BASE_URL}/api/auth/validateLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "amm-mg.org.br"
    },
    body: JSON.stringify(userCredentials)
  });
  return await responseFromServer.json();
};

function* signInUserWithLoginPassword({ payload }) {
  try {
    const user = yield call(signInUserWithLoginPasswordRequest, payload);
    if (user.error) {
      yield put(showAuthMessage(user.error));
    } else {
      //localStorage.setItem("user_id", user.token);
      //localStorage.setItem("user_name", user.name);
      yield put(userSignInSuccess(user));
    }
  } catch (err) {
    yield put(showAuthMessage(err));
  }
}

function* signOut() {
  try {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    yield put(userSignOutSuccess(signOutUser));
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithLoginPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser), fork(signOutUser)]);
}
