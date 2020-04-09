// @flow


export type Props = {
    order?: number | string,
    id?: number | string,
    slug: string,
    name?: string,
    marketCap?: string,
    price?: string,
    volume?: string,
    circulatingSupply?: string,
    symbol?: string,
    percentChange: string,
    isInWatchlist: (any) => Object
  };
