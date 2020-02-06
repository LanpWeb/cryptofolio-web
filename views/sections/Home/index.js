// @flow

import React, { useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import { getLatestCrypto } from "ducks/latestCrypto/actions";

import Header from "components/Header";

import type { Props } from "./types";

const Home = ({
  getLatestCrypto,
  latestCrypto,
  start,
  limit,
  error,
  loaded,
  progress
}: Props) => {
  const loadMore = useCallback(() => {
    getLatestCrypto(start, limit);
  }, [start, limit]);

  return (
    <section className="home">
      <Header />
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
          </tr>
        </thead>
        <tbody>
          {latestCrypto && Array.isArray(latestCrypto) && latestCrypto.map(crypto => (
            <tr>
              <td>
                {crypto.cmc_rank}
              </td>
              <td>
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
                {crypto.quote.USD.percent_change_24h}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <span className="error">{error}</span>}
      {!loaded && (
        <button
          className="load-more"
          onClick={loadMore}
          disabled={progress}
        >
          {progress ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
};

export default connect(
  ({
    latestCrypto: {
      progress, error, loaded, latestCrypto, limit, start
    }
  }) => ({
    progress, error, loaded, latestCrypto, limit, start
  }),
  (dispatch) => ({
    getLatestCrypto: (start, limit) => dispatch(getLatestCrypto({ start, limit }))
  })
)(Home);
