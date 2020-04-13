// @flow

export type GraphItem = {
  price: number,
  date: number,
}

export type Holding = {
  coinId: number,
  name: string,
  price: number,
  change24h: number,
  totalAmount: number,
  totalCost: number,
  myValue: number,
  profit: number,
}

export type Portfolio = {
  currentValue: number,
  change24h: {
    value: number,
    percent: number,
  },
  totalCost: number,
  totalProfit: number,
  holdings: Array<Holding>,
  graph: Array<GraphItem>,
}

export type State = {
  data: null | Portfolio,
  progress: boolean,
  error: null | string,
}
