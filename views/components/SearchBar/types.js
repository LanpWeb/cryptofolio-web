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
  loaded: boolean,
  shape?: 'bordered',
  getMapCrypto: () => void,
  onChange?: (value: number | null) => void,
}
