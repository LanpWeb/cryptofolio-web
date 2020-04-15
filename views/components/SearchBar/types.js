// @flow

export type Crypto = {
  id: number,
  slug: string,
  name: string,
  symbol: string,
}

export type Props = {
  data: Array<Crypto>,
  progress: boolean,
  selectable?: boolean,
  error: null | string,
  loaded: boolean,
  getMapCrypto: () => void,
  shape: ?'bordered',
}
