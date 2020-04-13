// @flow

export type Props = {|
  checked?: boolean,
  disabled?: boolean,
  bg?: "white",
  items?:Array<{ text: string}>,
  handleChange?: any => void,
  className?: string
|};
