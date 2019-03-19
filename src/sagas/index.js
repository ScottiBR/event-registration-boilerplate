import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import registrationSagas from "./Registration";
export default function* rootSaga(getState) {
  yield all([authSagas(), registrationSagas()]);
}
