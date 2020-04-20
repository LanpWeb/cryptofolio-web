// @flow

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { toggleWatchlist } from 'ducks/watchlist/actions'
import { getCryptoList } from 'ducks/cryptoList/actions'
import Header from 'components/Header'
import MarketInfo from 'components/MarketInfo'
import { Eye } from 'components/icons/Eye'
import TableHeader from 'components/TableHeader'
import CoinCard from 'components/CoinCard'
import Button from 'components/Button'
import TransactionModal from 'components/TransactionModal'
import Footer from 'components/Footer'
import type { Props } from './types'

const Home = ({
  auth,
  watchlist,
  cryptoList,
  cryptoGlobalStats,
  getCryptoList,
  toggleWatchlist,
  addTransaction = () => {},
}: Props) => {
  const [isTransactionModalVisible, setIsTransactionModalVisible] = useState(
    false
  )

  const openTransactionModalHandler = useCallback(() => {
    setIsTransactionModalVisible(true)
  }, [setIsTransactionModalVisible])

  const closeTransactionModalHandler = useCallback(() => {
    setIsTransactionModalVisible(false)
  }, [setIsTransactionModalVisible])

  const addTransactionHandler = useCallback(() => {
    setIsTransactionModalVisible(false)
    addTransaction()
  }, [setIsTransactionModalVisible, addTransaction])

  const loadMore = useCallback(() => {
    getCryptoList(cryptoList.start, cryptoList.limit)
  }, [getCryptoList, cryptoList.start, cryptoList.limit])

  const watchlistButtonClick = useCallback(
    (crypto) => () => {
      const action = watchlist?.ids.includes(crypto.id) ? 'REMOVE' : 'ADD'
      toggleWatchlist(crypto, action)
    },
    [watchlist, toggleWatchlist]
  )

  const isInWatchlist = (crypto) => {
    if (!auth) {
      return (
        <Link href="/sign-in">
          <span className="coin-card__btn">
            <Eye />
          </span>
        </Link>
      )
    }

    return (
      <button
        className="pure-btn coin-card__btn"
        onClick={watchlistButtonClick(crypto)}
        disabled={watchlist?.toggledId === crypto.id && watchlist?.progress}
      >
        <Eye active={watchlist?.ids.includes(crypto.id)} />
      </button>
    )
  }

  return (
    <section className="home">
      <Header />
      <TransactionModal
        active={isTransactionModalVisible}
        closeModalHandler={closeTransactionModalHandler}
        submitModalHandler={addTransactionHandler}
      />
      <div className="container">
        <div className="home__inner aic">
          <div className="aic jcsb home__info">
            <MarketInfo
              marketCap={cryptoGlobalStats.data?.marketCap.toLocaleString()}
              volume={cryptoGlobalStats.data?.vol24h.toLocaleString()}
              dominance={cryptoGlobalStats.data?.btcDominance}
            />
            {auth ? (
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
                handleClick={openTransactionModalHandler}
              >
                Add transaction
              </Button>
            ) : (
              <Link href="/sign-in">
                <span className="btn btn_md">
                  <span className="icon-frame btn__icon">
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
                  </span>
                  Add transaction
                </span>
              </Link>
            )}
          </div>
          <div className="home__table">
            <TableHeader />
            {cryptoList.data.map((crypto) => (
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
                isInWatchlist={isInWatchlist(crypto)}
              />
            ))}
          </div>
          {!cryptoList.loaded && (
            <Button handleClick={loadMore} size="sm">
              {cryptoList.progress ? 'Loading...' : 'Load More'}
            </Button>
          )}
        </div>
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
    cryptoList,
    cryptoGlobalStats,
  }) => ({
    auth,
    watchlist,
    cryptoList,
    cryptoGlobalStats,
  }),
  (dispatch) => ({
    getCryptoList: (start, limit) => dispatch(getCryptoList({ start, limit })),
    toggleWatchlist: (crypto, action) =>
      dispatch(toggleWatchlist({ crypto, action })),
  })
)(Home)
