// @flow

export type Crypto = {
  id: string,
  name: string,
  symbol: string,
  logo: string,
  category: string,
  description: string,
  urls: {
    website: Array<string>,
    technical_doc: Array<string>,
    message_board: Array<string>,
    explorer: Array<string>,
    source_code: Array<string>
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
      percent_change_24h: number
    }
  },
  pricePeriods: {
    all_time: {
      quote: {
        USD: {
          percent_change: number,
          high: number,
          low: number
        }
      }
    }
  }
};

export type State = {
  data: null | Crypto,
  progress: boolean,
  error: null | string
};

export type CryptoInfoPayload = {
  payload: {
    slug: string
  }
};
