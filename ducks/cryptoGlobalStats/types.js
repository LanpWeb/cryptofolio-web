// @flow

export type GlobalStats = {
  marketCap: number,
  vol24h: number,
  btcDominance: number
}

export type State = {
  data: null | GlobalStats,
  progress: boolean,
  error: null | string,
  loaded: boolean
};
