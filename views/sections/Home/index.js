// @flow

import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { toggleWatchlist } from "ducks/watchlist/actions";
import { getCryptoList, getWatchlist } from "ducks/cryptoList/actions";
import Header from "components/Header";
import { Eye } from "components/icons/Eye";
import CoinCard from "components/CoinCard";

import Button from "components/Button";
import Footer from "components/Footer";
import type { Props } from "./types";

const Home = ({
  auth,
  watchlist,
  cryptoList,
  cryptoGlobalStats,
  getCryptoList,
  toggleWatchlist,
  getWatchlist
}: Props) => {
  useEffect(() => { getCryptoList(1, cryptoList.limit); }, [getCryptoList, cryptoList.limit]);

  const loadMore = useCallback(() => {
    getCryptoList(cryptoList.start, cryptoList.limit);
  }, [getCryptoList, cryptoList.start, cryptoList.limit]);

  const watchlistButtonClick = useCallback(
    (coinId, action) => () => {
      toggleWatchlist(coinId, action);
    },
    [toggleWatchlist]
  );

  const isInWatchlist = coinId => {
    if (!auth) {
      return (
        <Link href="/sign-in">
          <span className="coin-card__btn"><Eye /></span>
        </Link>
      );
    }

    if (watchlist?.data.includes(coinId)) {
      return (
        <button
          className="pure-btn coin-card__btn"
          onClick={watchlistButtonClick(coinId, "REMOVE")}
          disabled={watchlist?.toggledId === coinId && watchlist?.progress}
        >
          <Eye active />

        </button>

      );
    }

    return (
      <button
        className="pure-btn coin-card__btn"
        onClick={watchlistButtonClick(coinId, "ADD")}
        disabled={watchlist?.toggledId === coinId && watchlist?.progress}
      >
        <Eye />
      </button>
    );
  };

  return (
    <section className="home">
      <Header cryptoList={cryptoList} getWatchlist={getWatchlist} />
      <div className="container">
        <div className="home__inner aic">
          <div className="aic jcsb home__info">
            <div className="home__market-info aic">
              <p className="p4 home__cap">
                <span className="home__text home__text_acent">Market Cap:</span>
                <span className="home__text">
                  $
                  {cryptoGlobalStats.data?.marketCap.toLocaleString()}
                </span>
              </p>
              <p className="p4 home__volume">
                <span className="home__text home__text_acent">24h Vol:</span>
                <span className="home__text">
                  $
                  {cryptoGlobalStats.data?.vol24h.toLocaleString()}
                </span>
              </p>
              <p className="p4 home__dominance">
                <span className="home__text home__text_acent">BTC Dominance:</span>
                <span className="home__text">
                  {cryptoGlobalStats.data?.btcDominance}
                  %
                </span>
              </p>
              {cryptoGlobalStats.error && (
              <span className="error">{cryptoGlobalStats.error}</span>
              )}
            </div>
            <Button size="md" icon={<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4v8M4 8h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Add transaction</Button>
          </div>
          <div className="home__table">
            <div className="home__table-header aic jcsb">
              <div className="table-item table-item_lg">
                <span className="p3 home__text home__text_number fw-medium">#</span>
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
            {cryptoList.data.map(crypto => (
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
                isInWatchlist={isInWatchlist}
              />
            ))}
          </div>
          {!cryptoList.loaded && (
          <Button
            handleClick={loadMore}
            size="sm"
          >
            {cryptoList.progress ? "Loading..." : "Load More"}
          </Button>
          )}
        </div>

      </div>
      <Footer />
    </section>
  );
};

export default connect(
  ({
    auth: {
      jwt: { auth }
    },
    watchlist,
    cryptoList,
    cryptoGlobalStats
  }) => ({
    auth,
    watchlist,
    cryptoList,
    cryptoGlobalStats
  }),
  dispatch => ({
    getCryptoList: (start, limit) => dispatch(getCryptoList({ start, limit })),
    toggleWatchlist: (id, action) => dispatch(toggleWatchlist({ id, action })),
    getWatchlist: () => dispatch(getWatchlist())
  })
)(Home);
