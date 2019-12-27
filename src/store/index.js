import { combineReducers } from "redux";
import checked from "./checked";
import loading from "./loading";
import wsize from "./wsize";

export default combineReducers({ checked, loading, wsize });
