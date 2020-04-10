// @flow

export type Props = {
  auth: boolean,
  email: null | string,
  router: any,
  items?: Array<{title: string, route: string}>,
  signOut: () => void,
};
