// @flow

import React, { useCallback } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import classnames from 'classnames'

import { toggleWatchlist } from 'ducks/watchlist/actions'

import Header from 'components/Header'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from 'components/Button'
import Footer from 'components/Footer'
import { Site } from 'components/icons/Site'
import { File } from 'components/icons/File'
import { DoubleChevron } from 'components/icons/DoubleChevron'
import { Folder } from 'components/icons/Folder'

import type { Props } from './types'

if (typeof Highcharts === 'object') {
  Highcharts.setOptions({
    lang: {
      numericSymbols: [' k', ' M', ' B', ' T', ' P', ' E'],
      rangeSelectorZoom: '',
      rangeSelectorFrom: '',
      rangeSelectorTo: '-',
    },
  })
}

const Coin = ({ cryptoInfo, auth, watchlist, toggleWatchlist }: Props) => {
  const watchlistButtonClick = useCallback(
    (crypto) => () => {
      const action = watchlist?.ids.includes(crypto?.id) ? 'REMOVE' : 'ADD'
      if (crypto) {
        toggleWatchlist(crypto, action)
      }
    },
    [watchlist, toggleWatchlist]
  )

  const isInWatchlist = (crypto) => {
    if (!crypto?.id) return null
    if (!auth) {
      return (
        <Link href="/sign-in">
          <a>Add</a>
        </Link>
      )
    }

    return (
      <button
        onClick={watchlistButtonClick(crypto)}
        disabled={watchlist?.toggledId === crypto?.id && watchlist?.progress}
      >
        {watchlist?.ids.includes(crypto?.id) ? 'Remove' : 'Add'}
      </button>
    )
  }

  const percentClasses = classnames({
    'coin-page__percent-change p2': true,
    'coin-page__percent-change_positive':
      Number(cryptoInfo.data?.quote.USD.percent_change_24h.toFixed(2)) > 0,
    'coin-page__percent-change_negative':
      Number(cryptoInfo.data?.quote.USD.percent_change_24h.toFixed(2)) < 0,
  })

  const highchartsOptions = {
    title: {
      text: `${String(cryptoInfo.data?.name)} chart`,
    },
    credits: {
      text: 'coinmarketcap.com',
      href: 'https://coinmarketcap.com/',
    },
    rangeSelector: {
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '24h',
        },
        {
          type: 'week',
          count: 1,
          text: '7d',
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
        },
        {
          type: 'year',
          count: 1,
          text: '1y',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
    },
    yAxis: [
      {
        title: {
          text: 'Price',
        },
        offset: 50,
      },
      {
        title: {
          text: 'Volume',
        },
        opposite: false,
      },
    ],
    series: cryptoInfo.data?.graph.reduce(
      (acc, item) => {
        acc[0].data.push([
          Date.parse(item.timestamp),
          item.quote.USD.market_cap,
        ])
        acc[1].data.push([
          Date.parse(item.timestamp),
          item.quote.USD.volume_24h,
        ])
        acc[2].data.push([Date.parse(item.timestamp), item.quote.USD.price])
        return acc
      },
      [
        { name: 'Market cap', yAxis: 1, data: [] },
        { name: '24 vol', yAxis: 1, data: [] },
        { name: 'Price', data: [] },
      ]
    ),
    tooltip: {
      shared: true,
      split: false,
      valueDecimals: 2,
      valuePrefix: '$',
      valueSuffix: ' USD',
    },
    legend: {
      enabled: true,
    },
  }

  const coinStatistic = [
    {
      name: `${cryptoInfo.data?.name} ROI`,
      value: `${cryptoInfo.data?.pricePeriods.all_time.quote.USD.percent_change.toLocaleString()}%`,
      gray: true,
    },
    {
      name: 'Market rank',
      value: `#${cryptoInfo.data?.cmc_rank}`,
    },
    {
      name: 'Market cap',
      value: `$${cryptoInfo.data?.quote.USD.market_cap.toLocaleString()} USD`,
      gray: true,
    },
    {
      name: '24h volume',
      value: `$${cryptoInfo.data?.quote.USD.volume_24h.toLocaleString()} USD`,
    },
    {
      name: 'Circulating supply',
      value: `${cryptoInfo.data?.circulating_supply.toLocaleString()} ${
        cryptoInfo.data?.symbol
      }`,
      gray: true,
    },
    {
      name: 'Total supply',
      value: `${cryptoInfo.data?.total_supply.toLocaleString()} ${
        cryptoInfo.data?.symbol
      }`,
      gray: true,
    },
    {
      name: 'Max supply',
      value: `${
        cryptoInfo.data?.max_supply !== null
          ? cryptoInfo.data?.max_supply.toLocaleString()
          : 'No data'
      } ${cryptoInfo.data?.max_supply !== null ? cryptoInfo.data?.symbol : ''}`,
    },
    {
      name: 'All time high',
      value: `$${cryptoInfo.data?.pricePeriods.all_time.quote.USD.high.toLocaleString()} USD`,
      gray: true,
    },
    {
      name: 'All time low',
      value: `$${cryptoInfo.data?.pricePeriods.all_time.quote.USD.low.toLocaleString()} USD`,
    },
    {
      name: 'Yesterday’s Open / Close ',
      value: `No data`,
      gray: true,
    },
  ]

  return (
    <section className="coin-page">
      <Header />

      <div className="container">
        <div className="aic jcsb coin-page__functions">
          <Breadcrumbs
            items={[
              {
                title: 'All coins',
                route: '/',
              },
              {
                title: cryptoInfo.data?.name,
              },
            ]}
          />
          <Button
            size="md"
            icon={
              <svg
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 4v8M4 8h8"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Add transaction
          </Button>
        </div>
        <div className="coin-page__inner">
          <div className="coin-page__header coin-page__delimetr">
            <img
              src={cryptoInfo.data?.logo}
              alt="logo"
              className="coin-page__logo"
            />
            <h1 className="coin-page__title h3">{`${cryptoInfo.data?.name} (${cryptoInfo.data?.symbol})`}</h1>
            <span className="coin-page__price p2">
              {`$${cryptoInfo.data?.quote.USD.price.toLocaleString()}`}
            </span>
            <span className={percentClasses}>
              {cryptoInfo.data?.quote.USD.percent_change_24h.toFixed(2)}%
              <span className="coin-card__triangle centered">
                {Number(
                  cryptoInfo.data?.quote.USD.percent_change_24h.toFixed(2)
                ) > 0 ? (
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
          </div>
          <div className="coin-page__chart">
            <HighchartsReact
              highcharts={Highcharts}
              constructorType="stockChart"
              options={highchartsOptions}
            />
          </div>
          <div className="coin-statistic coin-page__delimetr">
            <h2 className="coin-page__title h2 coin-page__title_mb_20">{`${cryptoInfo.data?.name} statistics`}</h2>
            <div className="coin-statistic__info">
              {coinStatistic.map(({ name, value, gray }) => (
                <div
                  className={`coin-statistic__card ${
                    gray ? 'coin-statistic__card_bg_gray' : ''
                  }`}
                >
                  <p className="coin-statistic__name">{name}</p>
                  <p className="coin-statistic__value">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="coin-page__about coin-page__delimetr">
            <h2 className="coin-page__title h2 coin-page__title_mb_20">
              {`About ${cryptoInfo.data?.name}`}
            </h2>
            <p className="coin-page__text p3">{cryptoInfo.data?.description}</p>
          </div>
          <div className="coin-page__footer">
            <a
              href={cryptoInfo.data?.urls.website[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="coin-page__link p2"
            >
              <Site className="coin-page__footer-icon" />
              Website
            </a>
            <a
              href={cryptoInfo.data?.urls.source_code[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="coin-page__link p2"
            >
              <DoubleChevron
                className="coin-page__footer-icon"
                intent="primary"
              />
              Source Code
            </a>
            <a
              href={cryptoInfo.data?.urls.message_board[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="coin-page__link p2"
            >
              <Folder className="coin-page__footer-icon" intent="primary" />
              Message Board
            </a>
            <a
              href={cryptoInfo.data?.urls.technical_doc[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="coin-page__link p2"
            >
              <File className="coin-page__footer-icon" intent="primary" />
              Documentation
            </a>
          </div>
        </div>

        {cryptoInfo.progress && <p>Loading...</p>}

        {isInWatchlist(cryptoInfo.data)}
      </div>
      <Footer />
    </section>
  )
}

export default connect(
  ({
    auth: {
      jwt: { auth },
    },
    watchlist,
    cryptoInfo,
  }) => ({
    cryptoInfo,
    auth,
    watchlist,
  }),
  (dispatch) => ({
    toggleWatchlist: (crypto, action) =>
      dispatch(toggleWatchlist({ crypto, action })),
  })
)(Coin)
