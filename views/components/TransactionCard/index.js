/* eslint-disable jsx-a11y/control-has-associated-label */
// @flow

import React from 'react'
import classNames from 'classnames'
import { Edit } from 'components/icons/Edit'
import { Delete } from 'components/icons/Delete'
import type { Props } from './types'

const TransactionCard = ({
  order = 1,
  id = 1,
  name = 'BTC',
  type = 'Sell',
  date = '10.01.20',
  time = '22:08',
  price = '9,440.23',
  amount = '0.0021',
  worth = '10,999.92',
  editHandler = () => {},
  deleteHandler = () => {},
}: Props) => {
  const typeClassName = classNames({
    'transaction-card__type': true,
    'transaction-card__type_buy': type === 'Buy',
    'transaction-card__type_sell': type === 'Sell',
  })

  return (
    <div className="transaction-card aic jcsb">
      <div className="transaction-card__item aic">
        <span className="p3 transaction-card__text">{order}</span>
        <div className="transaction-card__coin aic">
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${id}.png`}
            alt="coin-logo"
            className="transaction-card__logo"
          />
          <span className="p2 fw-medium transaction-card__text transaction-card__text_acent">
            {name}
          </span>
        </div>
      </div>
      <span className="transaction-card__item p3  ">
        <span className={typeClassName}>{type}</span>
      </span>
      <span className="transaction-card__item p3 transaction-card__text">
        {date}, {time}
      </span>
      <span className="transaction-card__item p3 transaction-card__text">
        ${price}
      </span>
      <span className="transaction-card__item p3 transaction-card__text">
        {amount}
      </span>
      <span className="transaction-card__item p3 transaction-card__text">
        ${worth}
      </span>
      <div className="transaction-card__item transaction-card__item_sm transaction-card__btn-group aic jcfe">
        <button
          type="button"
          className="pure-btn transaction-card__btn"
          onClick={editHandler}
        >
          <Edit />
        </button>
        <button
          type="button"
          className="pure-btn transaction-card__btn"
          onClick={deleteHandler}
        >
          <Delete />
        </button>
      </div>
    </div>
  )
}

export default TransactionCard
