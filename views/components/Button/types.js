// @flow

export type Props = {|
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'auto',
  height?: 'lg',
  shape?: 'outline' | 'social' | 'text',
  icon?: Object,
  children?: Object,
  handleClick?: () => void,
  className?: string,
  disabled?: boolean,
|}
