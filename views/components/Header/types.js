// @flow

export type Props = {
  auth: boolean,
  email: null | string,
  signOut: () => void,
  loadWatchlist: () => void,
  loadAllCoins: () => void,
}
