// @flow

export type FormData = {
  sale: boolean,
  coinId: number | null,
  amount: string,
  price: string,
  date: string,
}

export type Props = {
  caption?: string,
  textBtn?: string,
  className?: string,
  open?: boolean,
  closeModalHandler?: () => void,
}
