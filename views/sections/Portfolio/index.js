// @flow

import React, { useCallback } from "react";
import { connect } from "react-redux";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { getTransactions } from "ducks/transactions/actions";

import Header from "components/Header";

import type { Props } from "./types";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      numericSymbols: [" k", " M", " B", " T", " P", " E"]
    },
  });
}

const Portfolio = ({
  portfolio,
  transactions,
  getTransactions
}: Props) => {
  const highstockOptions = {
    title: {
      text: ""
    },
    credits: {
      enabled: false
    },
    rangeSelector: {
      inputEnabled: false,
      buttons: [{
        type: "day",
        count: 1,
        text: "24h"
      }, {
        type: "week",
        count: 1,
        text: "7d"
      }, {
        type: "month",
        count: 1,
        text: "1m"
      }, {
        type: "year",
        count: 1,
        text: "1y"
      }, {
        type: "all",
        text: "All"
      }]
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    yAxis: [{
      labels: {
        enabled: false,
      }
    }],
    series: portfolio.data?.graph.reduce((acc, item) => {
      acc[0].data.push([item.date, item.price]);
      return acc;
    }, [
      { name: "Balance", type: "area", data: [] }
    ]),
    tooltip: {
      valueDecimals: 2,
      valuePrefix: "$",
    }
  };

  const highchartsOptions = {
    chart: {
      type: "pie"
    },
    plotOptions: {
      pie: {
        innerSize: "80%",
        showInLegend: true
      }
    },
    title: {
      text: `$${String(portfolio.data?.currentValue.toLocaleString())}`,
      verticalAlign: "middle",
      floating: true
    },
    credits: {
      enabled: false
    },
    series: portfolio.data?.holdings.reduce((acc, item) => {
      acc[0].data.push({
        name: item.name,
        y: (item.myValue * 100) / Number(portfolio.data?.currentValue)
      });
      return acc;
    }, [{
      name: "Holdings",
      data: [],
      tooltip: {
        valueDecimals: 2,
        valueSuffix: "%",
      }
    }])
  };

  const loadMore = useCallback(() => {
    getTransactions(transactions.start, transactions.limit);
  }, [getTransactions, transactions.start, transactions.limit]);

  return (
    <section className="portfolio">
      <Header />
      <h1>Portfolio</h1>
      <p>
        Cur. value: $
        {portfolio.data?.currentValue.toLocaleString()}
      </p>
      <p>
        24hr Change
        {portfolio.data?.change24h.percent.toFixed(2)}
        %
      </p>
      <p>
        Total Cost $
        {portfolio.data?.totalCost.toLocaleString()}
      </p>
      <p>
        Total Profit
        {portfolio.data?.totalProfit.toLocaleString()}
      </p>
      <br />
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={highstockOptions}
      />
      <br />
      <HighchartsReact
        highcharts={Highcharts}
        options={highchartsOptions}
      />
      <br />
      <p>Holdings</p>
      <table>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Coin name
            </th>
            <th>
              Current value
            </th>
            <th>
              Amount
            </th>
            <th>
              Price
            </th>
            <th>
              Change (24h)
            </th>
            <th>
              Total cost
            </th>
            <th>
              Profit
            </th>
          </tr>
        </thead>
        <tbody>
          {portfolio.data?.holdings.map((holding, index) => (
            <tr>
              <td>
                {index + 1}
              </td>
              <td>
                <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${holding.coinId}.png`} alt="logo" width="16" height="16" />
                {holding.name}
              </td>
              <td>
                $
                {holding.myValue.toLocaleString()}
              </td>
              <td>
                {holding.totalAmount}
              </td>
              <td>
                $
                {holding.price.toLocaleString()}
              </td>
              <td>
                {holding.change24h.toFixed(2)}
                %
              </td>
              <td>
                $
                {holding.totalCost.toLocaleString()}
              </td>
              <td>
                {holding.profit.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <p>Transactions</p>
      <button>
        Add
      </button>
      <table>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Coin name
            </th>
            <th>
              Date
            </th>
            <th>
              Price
            </th>
            <th>
              Amount
            </th>
            <th>
              Type
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.data.map((transaction, index) => (
            <tr>
              <td>
                {index + 1}
              </td>
              <td>
                <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${transaction.coin.id}.png`} alt="logo" width="16" height="16" />
                {transaction.coin.name}
              </td>
              <td>
                {transaction.date}
              </td>
              <td>
                $
                {transaction.price.toLocaleString()}
              </td>
              <td>
                {transaction.amount}
              </td>
              <td>
                {transaction.type}
              </td>
              <td>
                <button>
                  Edit
                </button>
                <button>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!transactions.loaded && (
        <button
          className="load-more"
          onClick={loadMore}
          disabled={transactions.progress}
        >
          {transactions.progress
            ? "Loading..."
            : "Load More"}
        </button>
      )}
    </section>
  );
};


export default connect(
  ({
    portfolio,
    transactions
  }) => ({
    portfolio,
    transactions
  }),
  (dispatch) => ({
    getTransactions: (start, limit) => dispatch(getTransactions({ start, limit }))
  })
)(Portfolio);
