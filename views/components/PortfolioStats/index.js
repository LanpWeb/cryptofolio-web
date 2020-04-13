/* eslint-disable jsx-a11y/control-has-associated-label */
// @flow


import React from "react";
import classNames from "classnames";
import { Refresh } from "components/icons/Refresh";
import type { Props } from "./types";

const PortfolioStats = ({
  amount = "10,750.02", change = "2462.5", percentChange = "12", dailyChange = "17", weeklyChange = "9", monthlyChange = "-3", refreshHandler = () => {}
}:Props) => {
  const priceChangeClassName = classNames({
    "p2 stats__change aic": true,
    stats__change_increase: Number(percentChange) > 0,
    stats__change_decline: Number(percentChange) < 0,
    stats__change_disabled: amount === "0"
  });

  const dailyChangeClassName = classNames({
    "p2 stats__change aic": true,
    stats__change_increase: Number(dailyChange) > 0,
    stats__change_decline: Number(dailyChange) < 0,
    stats__change_disabled: amount === "0"
  });

  const weeklyChangeClassName = classNames({
    "p2 stats__change aic": true,
    stats__change_increase: Number(weeklyChange) > 0,
    stats__change_decline: Number(weeklyChange) < 0,
    stats__change_disabled: amount === "0"
  });

  const monthlyChangeClassName = classNames({
    "p2 stats__change aic": true,
    stats__change_increase: Number(monthlyChange) > 0,
    stats__change_decline: Number(monthlyChange) < 0,
    stats__change_disabled: amount === "0"
  });
  return (
    <div className="stats aic jcsb">
      <div className="aic">
        <span className="h3 stats__amount">
          $
          {amount}
        </span>
        {amount !== "0" ? (
          <>
            <span className={priceChangeClassName}>
              $
              {change}
              {" "}
              (
              {percentChange}
              %)
              {Number(percentChange) > 0 ? <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0l3.464 4.5H.536L4 0z" fill="#3DB052" /></svg></span> : <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5L7.464.5H.536L4 5z" fill="#EC6E47" /></svg></span>}
            </span>
            <button className="pure-btn stats__btn centered" onClick={refreshHandler}><Refresh /></button>
          </>
        ) : (
          <span className="stats__text">
            (Portfolio cost)
          </span>
        )}
      </div>
      <div className="aic">
        <span className="stats__item aic">
          <span className="c1 fw-medium stats__text stats__text_margin_right">24h:</span>
          {amount !== "0" ? (
            <>
              <span className={dailyChangeClassName}>
                {dailyChange}
                %
              </span>
              {Number(dailyChange) > 0 ? <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0l3.464 4.5H.536L4 0z" fill="#3DB052" /></svg></span> : <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5L7.464.5H.536L4 5z" fill="#EC6E47" /></svg></span>}
            </>
          ) : (
            <span className={dailyChangeClassName}>
              {amount}
              %
            </span>
          )}

        </span>
        <span className="stats__item aic">
          <span className="c1 fw-medium stats__text stats__text_margin_right">7d:</span>
          {amount !== "0" ? (
            <>
              <span className={weeklyChangeClassName}>
                {weeklyChange}
                %
              </span>
              {Number(weeklyChange) > 0 ? <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0l3.464 4.5H.536L4 0z" fill="#3DB052" /></svg></span> : <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5L7.464.5H.536L4 5z" fill="#EC6E47" /></svg></span>}
            </>
          ) : (
            <span className={weeklyChangeClassName}>
              {amount}
              %
            </span>
          )}
        </span>
        <span className="stats__item aic">
          <span className="c1 fw-medium stats__text stats__text_margin_right">30d:</span>
          {amount !== "0" ? (
            <>
              <span className={monthlyChangeClassName}>
                {monthlyChange}
                %
              </span>
              {Number(monthlyChange) > 0 ? <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0l3.464 4.5H.536L4 0z" fill="#3DB052" /></svg></span> : <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5L7.464.5H.536L4 5z" fill="#EC6E47" /></svg></span>}
            </>
          ) : (
            <span className={monthlyChangeClassName}>
              {amount}
              %
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default PortfolioStats;
