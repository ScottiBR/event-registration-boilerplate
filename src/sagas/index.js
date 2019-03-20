import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import registrationSagas from "./Registration";
import enrollment from "./Enrollments";
export default function* rootSaga(getState) {
  yield all([authSagas(), registrationSagas(), enrollment()]);
}
