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

export type State = {
  data: Array<Crypto>,
  start: number,
  limit: number,
  loaded: boolean,
  progress: boolean,
  error: null | string
};

export type CryptoListPayload = {
  payload: {
    start: number,
    limit: number
  }
};
