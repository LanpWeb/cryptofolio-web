// @flow

export type Transaction = {
  id: string,
  coin: {
    id: number,
    name: string
  },
  type: string,
  amount: number,
  price: number,
  date: number
};

export type State = {
  data: Array<Transaction>,
  start: number,
  limit: number,
  loaded: boolean,
  progress: boolean,
  error: null | string
};

export type TransactionsPayload = {
  payload: {
    start: number,
    limit: number
  }
};

export type AddTransactionPayload = {
  payload: {
    coin: {
      id: number,
      name: string
    },
    type: string,
    amount: number,
    price: number,
    date: number
  }
};

export type EditTransactionPayload = AddTransactionPayload & {
  payload: {
    id: string
  }
};

export type DeleteTransactionPayload = {
  payload: {
    id: string
  }
};
