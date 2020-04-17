// @flow

import type { ChartPoint } from 'ducks/portfolio/types'

export type Props = {
  data: ChartPoint[],
  dateFormat?: string,
}

export type TooltipProps = {
  active?: boolean,
  payload?: Object,
  label?: string,
}
