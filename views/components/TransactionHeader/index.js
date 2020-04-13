import React from 'react'

const TransactionHeader = () => (
  <div className="transaction-header aic jcsb">
    <div className="p4 fw-medium transaction-header__item aic">
      <span className="transaction-header__text transaction-header__order">
        #
      </span>
      <span className="transaction-header__text">Coin name</span>
    </div>
    <span className="transaction-header__item p3 transaction-header__text">
      Type
    </span>
    <span className="transaction-header__item p3 transaction-header__text">
      Date
    </span>
    <span className="transaction-header__item p3 transaction-header__text">
      Price
    </span>
    <span className="transaction-header__item p3 transaction-header__text">
      Amount
    </span>
    <span className="transaction-header__item p3 transaction-header__text">
      Total worth
    </span>
    <span className="transaction-header__item transaction-header__item_sm" />
  </div>
)

export default TransactionHeader
