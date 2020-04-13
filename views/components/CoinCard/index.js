/* eslint-disable jsx-a11y/control-has-associated-label */
// @flow

import React from 'react'
import Link from 'next/link'
import { Eye } from '../icons/Eye'
import type { Props } from './types'

const CoinCard = ({
  order = 1,
  id = '1',
  slug,
  name = 'Basic Attention Token',
  marketCap = '171 155 540 318,86',
  price = '9 558,552',
  volume = '15 955 380 784,348',
  circulatingSupply = '19 639 376 092,582',
  symbol = 'USD',
  percentChange = '3.5',
  isInWatchlist = () => (
    <span className="coin-card__btn">
      <Eye />
    </span>
  ),
}: Props) => (
  <div className="coin-card aic jcsb">
    <div className="table-item table-item_lg aic">
      {console.log(percentChange)}

      <span className="p3 coin-card__text">{order}</span>
      <div className="coin-card__coin aic">
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${id}.png`}
          alt="coin-logo"
          className="coin-card__logo"
        />
        <Link href="/coin/[slug]" as={`/coin/${slug}`}>
          <span className="p2 fw-medium coin-card__link">{name}</span>
        </Link>
      </div>
    </div>
    <span className="table-item p3 coin-card__text">${marketCap}</span>
    <span className="table-item table-item_sm p3 coin-card__text">
      ${price}
    </span>
    <span className="table-item p3 coin-card__text">${volume}</span>
    <span className="table-item p3 coin-card__text">
      {circulatingSupply} {symbol}
    </span>
    <span className="table-item table-item_sm p3 coin-card__text centered">
      {percentChange}%
      <span className="coin-card__triangle centered">
        {Number(percentChange) > 0 ? (
          <svg
            width="8"
            height="7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 1L.536 5.5h6.928L4 1z" fill="#4FC971" />
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
    <span className="table-item p3 coin-card__graf">
      <img
        src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${id}.png`}
        alt="sparkline"
        className="coin-card__img"
      />
    </span>
    {isInWatchlist(id)}
  </div>
)

export default CoinCard
