// @flow

export type Props = {|
  checked?: boolean,
  disabled?: boolean,
  bg?: 'white',
  items?:Array<{ text: string}>,
  className?: string,
    
  handleChange?: (any) => void,
|}
