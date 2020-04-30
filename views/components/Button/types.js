// @flow
import type { Node } from 'react'

export type Props = {|
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'auto',
  height?: 'lg',
  type?: 'button' | 'submit' | 'reset',
  shape?: 'outline' | 'social' | 'text',
  icon?: Object,
  children?: Node,
  handleClick?: () => void,
  className?: string,
  disabled?: boolean,
|}
