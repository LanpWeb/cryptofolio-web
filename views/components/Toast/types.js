// @flow

export type Props = {|
  active: boolean,
  text?: string,
  time?: string,
  intent?: 'primary' | 'error' | 'success',
  className?: string,
  closeToast?: () => void,
|}
