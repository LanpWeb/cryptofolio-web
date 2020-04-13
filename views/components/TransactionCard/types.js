// @flow

export type Props = {
  order?: number | string,
  id?: number | string,
  name?: string,
  type?: string,
  date?: string,
  time?: string,
  amount?: string,
  price?: string,
  worth?: string,
  editHandler?: () => void,
  deleteHandler?: () => void,
}
