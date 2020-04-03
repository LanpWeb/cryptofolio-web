// @flow

export type Props = {|
    active:boolean,
    text?:string,
    time?:any,
    intent?: "primary" | "error" | "success",
    className?:string,
    closeToast?: () => void,
  |};
