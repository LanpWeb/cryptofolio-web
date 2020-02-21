// @flow

export type State = {
  data: Array<number>,
  toggledId: number,
  progress: boolean,
  error: null | string
};

export type ToggleWatchlistPayload = {
  payload: {
    id: number,
    action: "ADD" | "REMOVE"
  }
}
