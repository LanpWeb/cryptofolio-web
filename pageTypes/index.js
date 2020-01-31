// @flow

export type Crypto = {
  id: number,
  slug: string,
  cmc_rank: number,
  name: string,
  symbol: string,
  circulating_supply: number,
  quote: {
    USD: {
      market_cap: number,
      price: number,
      volume_24h: number,
      percent_change_24h: number
    }
  }
}

export type Props = {
  latestCrypto: Array<Crypto>
};
