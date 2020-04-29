// @flow

export type Props = {|
  name: string,
  disabled?: boolean,
  bg?: 'white',
  items?: Array<{ text: string }>,
  className?: string,
  onChange?: () => void,
|}
