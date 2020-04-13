// @flow

export type Props = {|
    options?: Array<{ text: string, id: number | string, handler?: () => void }>,
    selected?:number,
    className?:string,
  |};
