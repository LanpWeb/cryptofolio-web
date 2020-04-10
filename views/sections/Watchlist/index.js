// @flow

import React, { useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { toggleWatchlist } from "ducks/watchlist/actions";
import Header from "components/Header";
import Footer from "components/Footer";
import type { Props } from "./types";

const Watchlist = ({
  watchlist,
  toggleWatchlist,
}: Props) => {
  const watchlistButtonClick = useCallback(
    (crypto) => () => {
      const action = watchlist?.ids.includes(crypto.id) ? "REMOVE" : "ADD";
      toggleWatchlist(crypto, action);
    },
    [watchlist, toggleWatchlist]
  );

  return (
    <section className="home">
      <Header />
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
          {watchlist.data.map(crypto => (
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
              <td>
                <button
                  onClick={watchlistButtonClick(crypto)}
                  disabled={watchlist?.toggledId === crypto.id && watchlist?.progress}
                >
                  {watchlist?.ids.includes(crypto.id) ? "Remove" : "Add"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h1>Recommended coins</h1>
      {watchlist.data.length === 0 && (
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
            {watchlist.recommended.map(crypto => (
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
                <td>
                  <button
                    onClick={watchlistButtonClick(crypto)}
                    disabled={watchlist?.toggledId === crypto.id && watchlist?.progress}
                  >
                    {watchlist?.ids.includes(crypto.id) ? "Remove" : "Add"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {watchlist.error && <span className="error">{watchlist.error}</span>}
      {watchlist.progress && "Loading..."}
      <Footer />
    </section>
  );
};

export default connect(
  ({
    watchlist,
  }) => ({
    watchlist,
  }),
  dispatch => ({
    toggleWatchlist: (crypto, action) => dispatch(toggleWatchlist({ crypto, action }))
  })
)(Watchlist);
