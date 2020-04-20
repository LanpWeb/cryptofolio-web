import React from 'react'

const TableHeader = () => (
  <div className="home__table-header aic jcsb">
    <div className="table-item table-item_lg">
      <span className="p3 home__text home__text_number fw-medium">#</span>
      <span className="p3 fw-medium home__text">Coin name</span>
    </div>
    <span className="table-item fw-medium p3 home__text">Market cap</span>
    <span className="table-item table-item_sm fw-medium p3 home__text">
      Price
    </span>
    <span className="table-item fw-medium p3 home__text">Volume (24h)</span>
    <span className="table-item fw-medium p3 home__text">
      Circulating supply
    </span>
    <span className="table-item table-item_sm fw-medium p3 home__text">
      Change (24h)
    </span>
    <span className="table-item fw-medium p3 home__text home__text_ta_center">
      Price graph (7d)
    </span>
    <span className="home__empty" />
  </div>
)

export default TableHeader
