// @flow

export type ChartPoint = {
  date: string,
  value: number,
}

export type Props = {
  data: ChartPoint[],
  dateFormat?: string,
}

export type TickProps = {
  x?: number,
  y?: number,
  payload?: {
    value: string,
  },
}

export type TooltipProps = {
  active?: boolean,
  payload?: Object,
  label?: string,
}
