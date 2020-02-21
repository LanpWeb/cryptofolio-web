import { createAction } from "redux-actions";

import {
  FETCH_USER_INFO_REQUEST,
  TOKEN_REFRESH_REQUEST,
  SET_SILENT_REFRESH,
  FETCH_JWT_DATA_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
} from "ducks/auth/const";

export const fetchUserInfo = createAction(FETCH_USER_INFO_REQUEST);
export const tokenRefresh = createAction(TOKEN_REFRESH_REQUEST);
export const fetchJWTData = createAction(FETCH_JWT_DATA_REQUEST);
export const setSilentRefresh = createAction(SET_SILENT_REFRESH);
export const signOut = createAction(SIGN_OUT_REQUEST);
export const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
