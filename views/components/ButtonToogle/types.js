// @flow

export type Props = {|
  name?: string,
  checked?: boolean,
  disabled?: boolean,
  bg?: 'white',
  items?: Array<{ text: string }>,
  className?: string,
  onChange?: (value: boolean) => void,
|}
