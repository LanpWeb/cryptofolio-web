// @flow

export type Props = {|
    className?: string,
    day:any,
    selected:any,
    date:any,
    month:any,
    selectHandler:()=>void,
    options?: Array<{ name: string, id: number | string }>
  |};
