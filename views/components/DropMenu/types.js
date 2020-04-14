// @flow

export type Option = {|
  name: string,
  id: number | string,
  handler?: () => void,
|}

export type Props = {|
  className?: string,
  color?: 'grey',
  disabled?: boolean,
  options?: Option[],
|}
