// @flow

export type GraphItem = {
  timestamp: string,
  quote: {
    USD: {
      market_cap: number,
      price: number,
      volume_24h: number,
      timestamp: string,
    },
  },
}

export type Crypto = {
  id: number,
  name: string,
  slug: string,
  symbol: string,
  logo: string,
  category: string,
  description: string,
  urls: {
    website: Array<string>,
    technical_doc: Array<string>,
    message_board: Array<string>,
    explorer: Array<string>,
    source_code: Array<string>,
  },
  tags: Array<string>,
  cmc_rank: number,
  max_supply: number,
  circulating_supply: number,
  total_supply: number,
  quote: {
    USD: {
      market_cap: number,
      price: number,
      volume_24h: number,
      percent_change_24h: number,
    },
  },
  pricePeriods: {
    all_time: {
      quote: {
        USD: {
          percent_change: number,
          high: number,
          low: number,
        },
      },
    },
  },
  graph: Array<GraphItem>,
}

export type State = {
  data: null | Crypto,
  progress: boolean,
  error: null | string,
}

export type CryptoInfoPayload = {
  payload: {
    slug: string,
  },
}
