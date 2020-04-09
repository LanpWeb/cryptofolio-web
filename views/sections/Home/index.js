// @flow

import React, { useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { toggleWatchlist } from "ducks/watchlist/actions";
import { getCryptoList, getWatchlist } from "ducks/cryptoList/actions";
import Header from "components/Header";
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
  const loadWatchlist = useCallback(() => {
    getWatchlist();
  }, [getWatchlist]);

  const loadAllCoins = useCallback(() => {
    getCryptoList(1, cryptoList.limit);
  }, [getCryptoList, cryptoList.limit]);
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
          <a>Add</a>
        </Link>
      );
    }

    if (watchlist?.data.includes(coinId)) {
      return (
        <button
          onClick={watchlistButtonClick(coinId, "REMOVE")}
          disabled={watchlist?.toggledId === coinId && watchlist?.progress}
        >
          Remove
        </button>
      );
    }

    return (
      <button
        onClick={watchlistButtonClick(coinId, "ADD")}
        disabled={watchlist?.toggledId === coinId && watchlist?.progress}
      >
        Add
      </button>
    );
  };

  return (
    <section className="home">
      <Header loadWatchlist={loadWatchlist} loadAllCoins={loadAllCoins} cryptoList={cryptoList} getWatchlist={getWatchlist} />
      {auth && (
        <button
          onClick={loadWatchlist}
          style={{ color: cryptoList.isWatchlist ? "red" : "black" }}
          disabled={cryptoList.progress}
        >
          Only watchlist
        </button>
      )}
      <div>
        {cryptoGlobalStats.progress && <p>Loading...</p>}
        <p>
          $
          {cryptoGlobalStats.data?.marketCap.toLocaleString()}
        </p>
        <p>
          $
          {cryptoGlobalStats.data?.vol24h.toLocaleString()}
        </p>
        <p>{cryptoGlobalStats.data?.btcDominance}</p>
        {cryptoGlobalStats.error && (
          <span className="error">{cryptoGlobalStats.error}</span>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>Change (24h)</th>
            <th>Price Graph (7d)</th>
            <th>Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {cryptoList.data.map(crypto => (
            <tr>
              <td>{crypto.cmc_rank}</td>
              <td>
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${crypto.id}.png`}
                  alt="logo"
                  width="16"
                  height="16"
                />
                <Link href="/coin/[slug]" as={`/coin/${crypto.slug}`}>
                  <a>{crypto.name}</a>
                </Link>
              </td>
              <td>
                $
                {crypto.quote.USD.market_cap.toLocaleString()}
              </td>
              <td>
                $
                {crypto.quote.USD.price.toLocaleString()}
              </td>
              <td>
                $
                {crypto.quote.USD.volume_24h.toLocaleString()}
              </td>
              <td>
                {crypto.circulating_supply.toLocaleString()}
                {" "}
                {crypto.symbol}
              </td>
              <td>{crypto.quote.USD.percent_change_24h.toFixed(2)}</td>
              <td>
                <img
                  src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${crypto.id}.png`}
                  alt="sparkline"
                  width="164"
                  height="48"
                />
              </td>
              <td>{isInWatchlist(crypto.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {cryptoList.error && <span className="error">{cryptoList.error}</span>}
      {!cryptoList.loaded && (
        <Button
          handleClick={loadMore}
          shape="text"
          icon={(
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="#BAC6D8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 3C6.49368 3 6.00809 3.21071 5.65007 3.58579C5.29204 3.96086 5.09091 4.46957 5.09091 5C5.09091 5.53043 5.29204 6.03914 5.65007 6.41421C6.00809 6.78929 6.49368 7 7 7C7.50632 7 7.99191 6.78929 8.34993 6.41421C8.70796 6.03914 8.90909 5.53043 8.90909 5C8.90909 4.46957 8.70796 3.96086 8.34993 3.58579C7.99191 3.21071 7.50632 3 7 3ZM7 8.33333C6.15613 8.33333 5.34682 7.98214 4.75011 7.35702C4.15341 6.7319 3.81818 5.88406 3.81818 5C3.81818 4.11595 4.15341 3.2681 4.75011 2.64298C5.34682 2.01786 6.15613 1.66667 7 1.66667C7.84387 1.66667 8.65318 2.01786 9.24988 2.64298C9.84659 3.2681 10.1818 4.11595 10.1818 5C10.1818 5.88406 9.84659 6.7319 9.24988 7.35702C8.65318 7.98214 7.84387 8.33333 7 8.33333ZM7 0C3.81818 0 1.10091 2.07333 0 5C1.10091 7.92667 3.81818 10 7 10C10.1818 10 12.8991 7.92667 14 5C12.8991 2.07333 10.1818 0 7 0Z" />
            </svg>
          )}
        >
          {cryptoList.progress ? "Loading..." : "Load More"}
        </Button>
      )}
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
