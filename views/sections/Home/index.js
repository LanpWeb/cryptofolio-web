// @flow

import React, { useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import { getCryptoList } from "ducks/cryptoList/actions";

import Header from "components/Header";

import type { Props } from "./types";

const Home = ({
  getCryptoList,
  data,
  start,
  limit,
  error,
  loaded,
  progress
}: Props) => {
  const loadMore = useCallback(() => {
    getCryptoList(start, limit);
  }, [getCryptoList, start, limit]);

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
            <th>
              Price Graph (7d)
            </th>
          </tr>
        </thead>
        <tbody>
          {data && Array.isArray(data) && data.map(crypto => (
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
                {crypto.quote.USD.percent_change_24h.toFixed(2)}
              </td>
              <td>
                <img src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${crypto.id}.png`} alt="sparkline" width="164" height="48" />
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
    cryptoList: {
      progress, error, loaded, data, limit, start
    }
  }) => ({
    progress, error, loaded, data, limit, start
  }),
  (dispatch) => ({
    getCryptoList: (start, limit) => dispatch(getCryptoList({ start, limit }))
  })
)(Home);
