// @flow

import React from "react";

import Header from "components/Header";

import type { Props } from "pageTypes/coin";

const Coin = ({ cryptoInfo }: Props) => (
  <section className="coin">
    <Header />
    <h1>{cryptoInfo.name}</h1>
    <p>{cryptoInfo.description}</p>
  </section>
);

export default Coin;
