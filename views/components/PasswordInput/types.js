// @flow

export type Props = {|
  name?: string,
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
  onChange?: () => void,
|}
