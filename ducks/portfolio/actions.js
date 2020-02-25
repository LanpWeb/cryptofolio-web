import { createAction } from "redux-actions";

import {
  FETCH_PORTFOLIO_REQUEST
} from "./const";

export const getPortfolio = createAction(FETCH_PORTFOLIO_REQUEST);
