// @flow

import React from "react";
import { connect } from "react-redux";

import Header from "components/Header";

import type { Props } from "./types";

const Coin = ({
  data,
  // error,
  // progress
}: Props) => {
  const {
    id,
    logo,
    name,
    symbol,
    category,
    description,
    urls,
    tags,
    cmc_rank: rank,
    max_supply: maxSupply,
    circulating_supply: circulatingSupply,
    total_supply: totalSupply,
    quote,
    pricePeriods
  } = data;

  return (
    <section className="coin">
      <Header />
      <img src={logo} alt="logo" width="32" height="32" />
      <p>{`${name} (${symbol})`}</p>
      <p>{`Rank #${rank}`}</p>
      <p>{`$${quote.USD.price.toLocaleString()} ${quote.USD.percent_change_24h.toFixed(2)}`}</p>
      <br />
      <p>Market Cap</p>
      {quote.USD.market_cap && (
        <p>{`$${quote.USD.market_cap.toLocaleString()}`}</p>
      )}
      {circulatingSupply && (
        <p>{`${circulatingSupply.toLocaleString()} ${symbol}`}</p>
      )}
      <br />
      <p>Volume (24h)</p>
      <p>{`$${quote.USD.volume_24h.toLocaleString()}`}</p>
      <p>{`${(quote.USD.volume_24h / quote.USD.price).toLocaleString()} ${symbol}`}</p>
      <br />
      {circulatingSupply && (
        <>
          <p>Circulating Supply</p>
          <p>{`${circulatingSupply.toLocaleString()} ${symbol}`}</p>
        </>
      )}
      <br />
      {maxSupply && (
        <div>
          <p>Max Supply</p>
          <p>{`${maxSupply.toLocaleString()} ${symbol}`}</p>
        </div>
      )}
      <img src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${id}.png`} alt="sparkline" width="164" height="48" />
      <br />
      <p>Links:</p>
      <p>Website:</p>
      {urls.website && urls.website.map(url => (
        <React.Fragment key={url}>
          <a href={url}>{url}</a>
          <br />
        </React.Fragment>
      ))}
      <p>Explorer:</p>
      {urls.explorer && urls.explorer.map(url => (
        <React.Fragment key={url}>
          <a href={url}>{url}</a>
          <br />
        </React.Fragment>
      ))}
      <p>Message board:</p>
      {urls.message_board && urls.message_board.map(url => (
        <React.Fragment key={url}>
          <a href={url}>{url}</a>
          <br />
        </React.Fragment>
      ))}
      <p>Source code:</p>
      {urls.source_code && urls.source_code.map(url => (
        <React.Fragment key={url}>
          <a href={url}>{url}</a>
          <br />
        </React.Fragment>
      ))}
      <p>Documentation:</p>
      {urls.technical_doc && urls.technical_doc.map(url => (
        <React.Fragment key={url}>
          <a href={url}>{url}</a>
          <br />
        </React.Fragment>
      ))}
      <br />
      <p>
        {`Category: ${category} `}
        {tags && tags.map(tag => <span key={tag}>{tag}</span>)}
      </p>
      <br />
      <p>{`About ${name}`}</p>
      <p>{description}</p>
      <br />
      <p>{`${name} statistics`}</p>
      <p>{`${name} price $${quote.USD.price.toLocaleString()}`}</p>
      <p>{`${name} ROI ${pricePeriods.all_time.quote.USD.percent_change.toLocaleString()}%`}</p>
      <p>{`Market rank #${rank}`}</p>
      {quote.USD.market_cap && (
        <p>{`Market cap $${quote.USD.market_cap.toLocaleString()}`}</p>
      )}
      <p>{`24 volume $${quote.USD.volume_24h.toLocaleString()}`}</p>
      {circulatingSupply && (
        <p>{`Circulating supply ${circulatingSupply.toLocaleString()} ${symbol}`}</p>
      )}
      <p>{`Total supply ${totalSupply.toLocaleString()} ${symbol}`}</p>
      {maxSupply && (
        <p>{`Max supply ${maxSupply.toLocaleString()} ${symbol}`}</p>
      )}
      <p>{`All time high $${pricePeriods.all_time.quote.USD.high}`}</p>
      <p>{`All time low $${pricePeriods.all_time.quote.USD.low}`}</p>
    </section>
  );
};

export default connect(
  ({
    cryptoInfo: {
      progress, error, data
    }
  }) => ({
    progress, error, data
  }),
  null
)(Coin);
