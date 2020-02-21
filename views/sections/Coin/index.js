// @flow

import React from "react";
import { connect } from "react-redux";

import Header from "components/Header";

import type { Props } from "./types";

const Coin = ({ cryptoInfo }: Props) => (
  <section className="coin">
    <Header />
    {cryptoInfo.progress && <p>Loading...</p>}
    <img src={cryptoInfo.data?.logo} alt="logo" width="32" height="32" />
    <p>
      {cryptoInfo.data?.name}
      (
      {cryptoInfo.data?.symbol}
      )
    </p>
    <p>
      Rank #
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.cmc_rank}
    </p>
    <p>
      $
      {cryptoInfo.data?.quote.USD.price.toLocaleString()}
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.quote.USD.percent_change_24h.toFixed(2)}
    </p>
    <br />
    {/* eslint-disable-next-line camelcase */}
    {cryptoInfo.data?.quote.USD.market_cap && (
      <div>
        <p>Market Cap</p>
        <p>
          {/* eslint-disable-next-line camelcase */}
          {cryptoInfo.data?.quote.USD.market_cap.toLocaleString()}
        </p>
      </div>
    )}
    {/* eslint-disable-next-line camelcase */}
    {cryptoInfo.data?.circulating_supply && (
      <p>
        {/* eslint-disable-next-line camelcase */}
        {cryptoInfo.data?.circulating_supply.toLocaleString()}
        {cryptoInfo.data?.symbol}
      </p>
    )}
    <br />
    <p>Volume (24h)</p>
    <p>
      $
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.quote.USD.volume_24h.toLocaleString()}
    </p>
    <p>
      {cryptoInfo.data && (cryptoInfo.data.quote.USD.volume_24h / cryptoInfo.data.quote.USD.price).toLocaleString()}
      {cryptoInfo.data?.symbol}
    </p>
    <br />
    {/* eslint-disable-next-line camelcase */}
    {cryptoInfo.data?.circulating_supply && (
      <div>
        <p>Circulating Supply</p>
        {/* eslint-disable-next-line camelcase */}
        {cryptoInfo.data?.circulating_supply.toLocaleString()}
        {cryptoInfo.data?.symbol}
      </div>
    )}
    <br />
    {/* eslint-disable-next-line camelcase */}
    {cryptoInfo.data?.max_supply && (
      <div>
        <p>Max Supply</p>
        {/* eslint-disable-next-line camelcase */}
        {cryptoInfo.data?.max_supply.toLocaleString()}
        {cryptoInfo.data?.symbol}
      </div>
    )}
    {cryptoInfo.data && <img src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${cryptoInfo.data.id}.png`} alt="sparkline" width="164" height="48" />}
    <br />
    <p>Links:</p>
    <p>Website:</p>
    <ul>
      {cryptoInfo.data?.urls.website.map(url => <li key={url}><a href={url}>{url}</a></li>)}
    </ul>
    <p>Explorer:</p>
    <ul>
      {cryptoInfo.data?.urls.explorer.map(url => <li key={url}><a href={url}>{url}</a></li>)}
    </ul>
    <p>Message board:</p>
    <ul>
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.urls.message_board.map(url => <li key={url}><a href={url}>{url}</a></li>)}
    </ul>
    <p>Source code:</p>
    <ul>
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.urls.source_code.map(url => <li key={url}><a href={url}>{url}</a></li>)}
    </ul>
    <p>Documentation:</p>
    <ul>
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.urls.technical_doc.map(url => <li key={url}><a href={url}>{url}</a></li>)}
    </ul>
    <br />
    <p>
      Category:
      {cryptoInfo.data?.category}
      {cryptoInfo.data?.tags.map(tag => <span key={tag}>{tag}</span>)}
    </p>
    <br />
    <p>
      About
      {cryptoInfo.data?.name}
    </p>
    <p>
      {cryptoInfo.data?.description}
    </p>
    <br />
    <p>
      {cryptoInfo.data?.name}
      statistics
    </p>
    <p>
      {cryptoInfo.data?.name}
      price $
      {cryptoInfo.data?.quote.USD.price.toLocaleString()}
    </p>
    <p>
      {cryptoInfo.data?.name}
      ROI
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.pricePeriods.all_time.quote.USD.percent_change.toLocaleString()}
      %
    </p>
    <p>
      Market rank #
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.cmc_rank}
    </p>
    {/* eslint-disable-next-line camelcase */}
    {cryptoInfo.data?.quote.USD.market_cap && (
      <p>
        Market cap $
        {/* eslint-disable-next-line camelcase */}
        {cryptoInfo.data?.quote.USD.market_cap.toLocaleString()}
      </p>
    )}
    <p>
      24 volume $
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.quote.USD.volume_24h.toLocaleString()}
    </p>
    {/* eslint-disable-next-line camelcase */}
    {cryptoInfo.data?.circulating_supply && (
      <p>
        Circulating supply
        {/* eslint-disable-next-line camelcase */}
        {cryptoInfo.data?.circulating_supply.toLocaleString()}
        {cryptoInfo.data?.symbol}
      </p>
    )}
    <p>
      Total supply
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.total_supply.toLocaleString()}
      {cryptoInfo.data?.symbol}
    </p>
    {/* eslint-disable-next-line camelcase */}
    {cryptoInfo.data?.max_supply && (
      <p>
        Max supply
        {/* eslint-disable-next-line camelcase */}
        {cryptoInfo.data?.max_supply.toLocaleString()}
        {cryptoInfo.data?.symbol}
      </p>
    )}
    <p>
      All time high $
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.pricePeriods.all_time.quote.USD.high}
    </p>
    <p>
      All time low $
      {/* eslint-disable-next-line camelcase */}
      {cryptoInfo.data?.pricePeriods.all_time.quote.USD.low}
    </p>

    {cryptoInfo.error && <span className="error">{cryptoInfo.error}</span>}
  </section>
);

export default connect(
  ({
    cryptoInfo
  }) => ({
    cryptoInfo
  }),
  null
)(Coin);
