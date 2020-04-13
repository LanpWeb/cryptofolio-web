import React from "react";

const HoldingHeader = () => (
  <div className="holding-header aic jcsb">
    <div className="p4 fw-medium holding-header__item holding-header__item_lg aic">
      <span className="holding-header__text holding-header__order">#</span>
      <span className="holding-header__text">Coin name</span>
    </div>
    <span className="holding-header__item p4 fw-medium holding-header__text">
      Current value
    </span>
    <span className="holding-header__item p4 fw-medium holding-header__text">
      Amount
    </span>
    <span className="holding-header__item p4 fw-medium holding-header__text">
      Price
    </span>
    <span className="holding-header__item p4 fw-medium holding-header__text">
      Profit
    </span>
    <span className="holding-header__item p4 fw-medium holding-header__text">
      % Profit
    </span>
  </div>
);


export default HoldingHeader;
