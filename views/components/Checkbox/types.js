// @flow

import * as React from 'react'

export type Props = {|
  checked?: boolean,
  label?: string | React.Node,
  className?: string,
  intent?: 'primary' | 'error' | 'success',
  handleChange: (value: boolean) => void,
|}
