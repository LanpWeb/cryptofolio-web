// @flow

export type Props = {
  router: any,
  items?: Array<{title: string, route: string}>,
  auth: boolean,
  email: null | string,
  signOut: () => void,
  loadWatchlist: () => void,
  loadAllCoins:() => void
};
