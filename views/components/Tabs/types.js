// @flow

export type Props = {|
  options?: Array<{ text: string, id: number | string, handler?: () => void }>,
  disabled?: boolean,
  selected?: number,
  className?: string,
|}
