import { combineReducers } from "redux";
import checked from "./checked";
import loading from "./loading";

export default combineReducers({ checked, loading });
