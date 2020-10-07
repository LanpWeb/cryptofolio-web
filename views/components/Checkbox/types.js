// @flow

import * as React from 'react'

export type Props = {|
  name?: string,
  checked?: boolean,
  label?: string | React.Node,
  className?: string,
  intent?: 'primary' | 'error' | 'success',
  onChange?: (value: boolean) => void,
|}
