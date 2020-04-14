// @flow

export type Props = {|
  className?: string,
  color?: 'grey',
  disabled?: boolean,
  options?: Array<{ name: string, id: number | string, handler?: () => void }>,
|}
