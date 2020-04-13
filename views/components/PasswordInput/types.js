// @flow

export type Props = {|
  placeholder?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'auto',
  height?: 'xs' | 'sm' | 'md',
  intent?: 'success' | 'warning' | 'error',
  shape?: 'border-none',
  label?: string,
  disabled?: boolean,
  acentLabel?: boolean,
  wrapClassName?: string,
  inputClassName?: string,
  value?: string,
  handleChange?: (value: string) => void,
|}
