// @flow

import React, { useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import { toggleWatchlist } from "ducks/watchlist/actions";
import { getCryptoList, getWatchlist } from "ducks/cryptoList/actions";

import Header from "components/Header";

import type { Props } from "./types";

const Home = ({
  auth,
  watchlist,
  cryptoList,
  cryptoGlobalStats,
  getCryptoList,
  toggleWatchlist,
  getWatchlist,
}: Props) => {
  const loadWatchlist = useCallback(() => {
    if (cryptoList.isWatchlist) {
      getCryptoList(1, cryptoList.limit);
    } else {
      getWatchlist();
    }
  }, [getCryptoList, getWatchlist, cryptoList.limit, cryptoList.isWatchlist]);

  const loadMore = useCallback(() => {
    getCryptoList(cryptoList.start, cryptoList.limit);
  }, [getCryptoList, cryptoList.start, cryptoList.limit]);

  const watchlistButtonClick = useCallback((coinId, action) => () => {
    toggleWatchlist(coinId, action);
  }, [toggleWatchlist]);

  const isInWatchlist = coinId => {
    if (!auth) {
      return (
        <Link href="/sign-in">
          <a>
            Add
          </a>
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
      <Header />
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
        {cryptoGlobalStats.error && <span className="error">{cryptoGlobalStats.error}</span>}
      </div>
      <table>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Name
            </th>
            <th>
              Market Cap
            </th>
            <th>
              Price
            </th>
            <th>
              Volume (24h)
            </th>
            <th>
              Circulating Supply
            </th>
            <th>
              Change (24h)
            </th>
            <th>
              Price Graph (7d)
            </th>
            <th>
              Watchlist
            </th>
          </tr>
        </thead>
        <tbody>
          {cryptoList.data.map(crypto => (
            <tr>
              <td>
                {crypto.cmc_rank}
              </td>
              <td>
                <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${crypto.id}.png`} alt="logo" width="16" height="16" />
                <Link href="/coin/[slug]" as={`/coin/${crypto.slug}`}>
                  <a>
                    {crypto.name}
                  </a>
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
              <td>
                {crypto.quote.USD.percent_change_24h.toFixed(2)}
              </td>
              <td>
                <img src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${crypto.id}.png`} alt="sparkline" width="164" height="48" />
              </td>
              <td>
                {isInWatchlist(crypto.id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cryptoList.error && <span className="error">{cryptoList.error}</span>}
      {!cryptoList.loaded && (
        <button
          className="load-more"
          onClick={loadMore}
          disabled={cryptoList.progress}
        >
          {cryptoList.progress
            ? "Loading..."
            : "Load More"}
        </button>
      )}
    </section>
  );
};

export default connect(
  ({
    auth: { jwt: { auth } },
    watchlist,
    cryptoList,
    cryptoGlobalStats
  }) => ({
    auth,
    watchlist,
    cryptoList,
    cryptoGlobalStats
  }),
  (dispatch) => ({
    getCryptoList: (start, limit) => dispatch(getCryptoList({ start, limit })),
    toggleWatchlist: (id, action) => dispatch(toggleWatchlist({ id, action })),
    getWatchlist: () => dispatch(getWatchlist())
  })
)(Home);
