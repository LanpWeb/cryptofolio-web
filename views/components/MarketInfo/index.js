// @flow

import React from 'react'
import type { Props } from './types'

const MarketInfo = ({
  marketCap = '',
  volume = '',
  dominance = null,
}: Props) => {
  return (
    <div className="home__market-info aic">
      <p className="p4 home__cap">
        <span className="home__text home__text_acent">Market Cap:</span>
        <span className="home__text">${marketCap}</span>
      </p>
      <p className="p4 home__volume">
        <span className="home__text home__text_acent">24h Vol:</span>
        <span className="home__text">${volume}</span>
      </p>
      <p className="p4 home__dominance">
        <span className="home__text home__text_acent">BTC Dominance:</span>
        <span className="home__text">{dominance}%</span>
      </p>
    </div>
  )
}

export default MarketInfo
