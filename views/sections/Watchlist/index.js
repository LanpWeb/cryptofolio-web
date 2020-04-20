// @flow

import React, { useCallback } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { toggleWatchlist } from 'ducks/watchlist/actions'
import Header from 'components/Header'
import MarketInfo from 'components/MarketInfo'
import { Eye } from 'components/icons/Eye'
import CoinCard from 'components/CoinCard'
import Button from 'components/Button'
import Footer from 'components/Footer'
import type { Props } from './types'

const Watchlist = ({
  watchlist,
  cryptoGlobalStats,
  toggleWatchlist,
}: Props) => {
  const watchlistButtonClick = useCallback(
    (crypto) => () => {
      const action = watchlist?.ids.includes(crypto.id) ? 'REMOVE' : 'ADD'
      toggleWatchlist(crypto, action)
    },
    [watchlist, toggleWatchlist]
  )

  return (
    <section className="home">
      <Header />
      <div className="container">
        {watchlist.data.length > 0 ? (
          <div className="home__inner aic">
            <div className="aic jcsb home__info">
              <MarketInfo
                marketCap={cryptoGlobalStats.data?.marketCap.toLocaleString()}
                volume={cryptoGlobalStats.data?.vol24h.toLocaleString()}
                dominance={cryptoGlobalStats.data?.btcDominance}
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
            <div className="home__table">
              <div className="home__table-header aic jcsb">
                <div className="table-item table-item_lg">
                  <span className="p3 home__text home__text_number fw-medium">
                    #
                  </span>
                  <span className="p3 fw-medium home__text">Coin name</span>
                </div>
                <span className="table-item fw-medium p3 home__text">
                  Market cap
                </span>
                <span className="table-item table-item_sm fw-medium p3 home__text">
                  Price
                </span>
                <span className="table-item fw-medium p3 home__text">
                  Volume (24h)
                </span>
                <span className="table-item fw-medium p3 home__text">
                  Circulating supply
                </span>
                <span className="table-item table-item_sm fw-medium p3 home__text">
                  Change (24h)
                </span>
                <span className="table-item fw-medium p3 home__text home__text_ta_center">
                  Price graph (7d)
                </span>
                <span className="home__empty" />
              </div>
              {watchlist.data.map((crypto) => (
                <CoinCard
                  order={crypto.cmc_rank}
                  id={crypto.id}
                  slug={crypto.slug}
                  name={crypto.name}
                  marketCap={crypto.quote.USD.market_cap.toLocaleString()}
                  price={crypto.quote.USD.price.toLocaleString()}
                  volume={crypto.quote.USD.volume_24h.toLocaleString()}
                  circulatingSupply={crypto.circulating_supply.toLocaleString()}
                  symbol={crypto.symbol}
                  percentChange={crypto.quote.USD.percent_change_24h.toFixed(2)}
                  isInWatchlist={
                    <button
                      className="pure-btn coin-card__btn"
                      onClick={watchlistButtonClick(crypto)}
                      disabled={
                        watchlist?.toggledId === crypto.id &&
                        watchlist?.progress
                      }
                    >
                      <Eye active={watchlist?.ids.includes(crypto.id)} />
                    </button>
                  }
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="home__inner aifs">
            <div className="empty-data aic jcsb">
              <div className="empty-data__content">
                <h3 className="h3 empty-data__caption">
                  No currencies here yet
                </h3>
                <span className="p2 empty-data__text">
                  Use the eye icon to start tracking your currency.
                </span>
              </div>
              <Link href="/">
                <span className="btn btn_md">View all coins</span>
              </Link>
            </div>
            <h2 className="h2 home__caption">Recommended coins:</h2>
            <div className="home__table">
              <div className="home__table-header aic jcsb">
                <div className="table-item table-item_lg">
                  <span className="p3 home__text home__text_number fw-medium">
                    #
                  </span>
                  <span className="p3 fw-medium home__text">Coin name</span>
                </div>
                <span className="table-item fw-medium p3 home__text">
                  Market cap
                </span>
                <span className="table-item table-item_sm fw-medium p3 home__text">
                  Price
                </span>
                <span className="table-item fw-medium p3 home__text">
                  Volume (24h)
                </span>
                <span className="table-item fw-medium p3 home__text">
                  Circulating supply
                </span>
                <span className="table-item table-item_sm fw-medium p3 home__text">
                  Change (24h)
                </span>
                <span className="table-item fw-medium p3 home__text home__text_ta_center">
                  Price graph (7d)
                </span>
                <span className="home__empty" />
              </div>
              {watchlist.recommended.map((crypto) => (
                <CoinCard
                  order={crypto.cmc_rank}
                  id={crypto.id}
                  slug={crypto.slug}
                  name={crypto.name}
                  marketCap={crypto.quote.USD.market_cap.toLocaleString()}
                  price={crypto.quote.USD.price.toLocaleString()}
                  volume={crypto.quote.USD.volume_24h.toLocaleString()}
                  circulatingSupply={crypto.circulating_supply.toLocaleString()}
                  symbol={crypto.symbol}
                  percentChange={crypto.quote.USD.percent_change_24h.toFixed(2)}
                  isInWatchlist={
                    <button
                      className="pure-btn coin-card__btn"
                      onClick={watchlistButtonClick(crypto)}
                      disabled={
                        watchlist?.toggledId === crypto.id &&
                        watchlist?.progress
                      }
                    >
                      <Eye active={watchlist?.ids.includes(crypto.id)} />
                    </button>
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  )
}

export default connect(
  ({ watchlist, cryptoGlobalStats }) => ({
    watchlist,
    cryptoGlobalStats,
  }),
  (dispatch) => ({
    toggleWatchlist: (crypto, action) =>
      dispatch(toggleWatchlist({ crypto, action })),
  })
)(Watchlist)
