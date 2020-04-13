// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

const HoldingCard = ({
  order = 1,
  id = 1,
  name = 'Basic Attention Token',
  value = '9 558,552',
  amount = '1.2',
  price = '9 558,552',
  profit = '48.69',
  percentProfit = '0.46',
}: Props) => {
  const profitTextClassName = classNames({
    'holding-card__item p3 holding-card__text aic jcfe': true,
    'holding-card__text_success': Number(percentProfit) > 0,
    'holding-card__text_error': Number(percentProfit) < 0,
  })

  return (
    <div className="holding-card aic jcsb">
      <div className="holding-card__item holding-card__item_lg aic">
        <span className="p3 holding-card__text">{order}</span>
        <div className="holding-card__coin aic">
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${id}.png`}
            alt="coin-logo"
            className="holding-card__logo"
          />
          <span className="p2 fw-medium holding-card__text holding-card__text_acent">
            {name}
          </span>
        </div>
      </div>
      <span className="holding-card__item p3 holding-card__text">${value}</span>
      <span className="holding-card__item p3 holding-card__text">{amount}</span>
      <span className="holding-card__item p3 holding-card__text">${price}</span>
      <span className="holding-card__item p3 holding-card__text">{profit}</span>
      <span className={profitTextClassName}>
        {percentProfit}%
        <span className="holding-card__triangle centered">
          {Number(percentProfit) > 0 ? (
            <svg
              width="8"
              height="7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 1L.536 5.5h6.928L4 1z" fill="#3db052" />
            </svg>
          ) : (
            <svg
              width="8"
              height="7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6l3.464-4.5H.536L4 6z" fill="#EC6E47" />
            </svg>
          )}
        </span>
      </span>
    </div>
  )
}

export default HoldingCard
