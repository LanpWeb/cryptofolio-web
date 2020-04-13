// @flow


import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

const CoinStats = ({
  id = 1, name = "Bitcoin", symbol = "BTC", price = "8,842.17", percentChange = "11.03"
}:Props) => {
  const priceChangeClassName = classNames({
    "p2 stats__change aic": true,
    stats__change_increase: Number(percentChange) > 0,
    stats__change_decline: Number(percentChange) < 0,
  });
  return (
    <div className="stats aic">
      <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${id}.png`} alt="coin-logo" className="stats__logo" />
      <span className="h3 stats__name">
        {name}
        {" "}
        (
        {symbol}
        )
      </span>
      <span className="p2 stats__price">
        $
        {price}
      </span>
      <span className={priceChangeClassName}>
        {percentChange}
        %
        {Number(percentChange) > 0 ? <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0l3.464 4.5H.536L4 0z" fill="#3DB052" /></svg></span> : <span className="stats__triangle centered"><svg width="8" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5L7.464.5H.536L4 5z" fill="#EC6E47" /></svg></span>}
      </span>
    </div>
  );
};

export default CoinStats;
