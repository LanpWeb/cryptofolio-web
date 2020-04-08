// @flow

export type Props = {|
  className?: string,
  active: boolean,
  options?: Array<{ name: string, id: number | string, handler: () => void, route?: string }>
|};
