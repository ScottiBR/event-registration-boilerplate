import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
import Auth from "./Auth";
import Registration from "./Registration";

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    registration: Registration
  });
