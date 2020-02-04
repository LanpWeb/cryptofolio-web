import { createAction } from "redux-actions";

import {
  TOKEN_REFRESH_REQUEST,
  SET_SILENT_REFRESH,
  FETCH_JWT_DATA_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
} from "./const";

export const tokenRefresh = createAction(TOKEN_REFRESH_REQUEST);
export const fetchJWTData = createAction(FETCH_JWT_DATA_REQUEST);
export const setSilentRefresh = createAction(SET_SILENT_REFRESH);
export const signOut = createAction(SIGN_OUT_REQUEST);
export const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
