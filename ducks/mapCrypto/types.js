// @flow

export type Crypto = {
  id: number,
  slug: string,
  name: string,
  symbol: string
}

export type State = {
  data: Array<Crypto>,
  progress: boolean,
  error: null | string,
  loaded: boolean
};
