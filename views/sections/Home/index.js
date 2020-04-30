// @flow

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { toggleWatchlist } from 'ducks/watchlist/actions'
import { getCryptoList } from 'ducks/cryptoList/actions'
import Header from 'components/Header'
import MarketInfo from 'components/MarketInfo'
import { Eye } from 'components/icons/Eye'
import { Plus } from 'components/icons/Plus'
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
}: Props) => {
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false)

  const toggleTransactionModal = useCallback(() => {
    setTransactionModalOpen((state) => !state)
  }, [setTransactionModalOpen])

  const handleLoadMore = useCallback(() => {
    getCryptoList(cryptoList.start, cryptoList.limit)
  }, [getCryptoList, cryptoList.start, cryptoList.limit])

  const handleWatchlistButtonClick = useCallback(
    (crypto) => () => {
      const action = watchlist?.ids.includes(crypto.id) ? 'REMOVE' : 'ADD'
      toggleWatchlist(crypto, action)
    },
    [watchlist, toggleWatchlist]
  )

  const renderedTransactionButton = () => {
    if (!auth) {
      return (
        <Link href="/signIn" as="/sign-in">
          <span className="btn btn_md">
            <span className="icon-frame btn__icon">
              <Plus />
            </span>
            Add transaction
          </span>
        </Link>
      )
    }

    return (
      <Button size="md" icon={<Plus />} handleClick={toggleTransactionModal}>
        Add transaction
      </Button>
    )
  }

  const renderedWatchlistButton = (crypto) => {
    if (!auth) {
      return (
        <Link href="/signIn" as="/sign-in">
          <span className="coin-card__btn">
            <Eye />
          </span>
        </Link>
      )
    }

    return (
      <button
        className="pure-btn coin-card__btn"
        onClick={handleWatchlistButtonClick(crypto)}
        disabled={watchlist?.toggledId === crypto.id && watchlist?.progress}
      >
        <Eye active={watchlist?.ids.includes(crypto.id)} />
      </button>
    )
  }

  const renderedCoinList =
    cryptoList.data.length > 0 &&
    cryptoList.data.map((crypto) => (
      <CoinCard
        rank={crypto.cmc_rank}
        id={crypto.id}
        slug={crypto.slug}
        name={crypto.name}
        marketCap={crypto.quote.USD.market_cap.toLocaleString()}
        price={crypto.quote.USD.price.toLocaleString()}
        volume={crypto.quote.USD.volume_24h.toLocaleString()}
        circulatingSupply={crypto.circulating_supply.toLocaleString()}
        symbol={crypto.symbol}
        percentChange={crypto.quote.USD.percent_change_24h.toFixed(2)}
        watchlistButton={renderedWatchlistButton(crypto)}
      />
    ))

  const renderedMoreButton = !cryptoList.loaded && (
    <Button handleClick={handleLoadMore} size="sm">
      {cryptoList.progress ? 'Loading...' : 'Load More'}
    </Button>
  )

  return (
    <section className="home">
      <Header />
      <div className="container">
        <div className="home__inner aic">
          <div className="aic jcsb home__info">
            <MarketInfo
              marketCap={cryptoGlobalStats.data?.marketCap.toLocaleString()}
              volume={cryptoGlobalStats.data?.vol24h.toLocaleString()}
              dominance={cryptoGlobalStats.data?.btcDominance}
            />
            {renderedTransactionButton()}
          </div>
          <div className="home__table">
            <TableHeader />
            {renderedCoinList}
          </div>
          {renderedMoreButton}
        </div>
      </div>
      <Footer />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        closeModalHandler={toggleTransactionModal}
      />
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
