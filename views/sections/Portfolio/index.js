// @flow

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from 'ducks/transactions/actions'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from 'components/Button'
import DropMenu from 'components/DropMenu'
import PortfolioStats from 'components/PortfolioStats'
import Tabs from 'components/Tabs'
import DateSelect from 'components/DateSelect'
import ButtonToogle from 'components/ButtonToogle'
import HoldingHeader from 'components/HoldingHeader'
import TransactionHeader from 'components/TransactionHeader'
import HoldingCard from 'components/HoldingCard'
import TransactionCard from 'components/TransactionCard'
import type { Props } from './types'

const Portfolio = ({ portfolio, transactions, noData = false }: Props) => {
  const [isTransactions, setTransactions] = useState(false)
  const toogleHandler = () => {
    setTransactions(!isTransactions)
  }

  return (
    <section className="portfolio">
      <Header />
      <div className="portfolio__inner">
        <div className="container">
          <div className="aic jcsb">
            <Breadcrumbs
              items={[
                {
                  title: 'All coins',
                  route: '/',
                },
                {
                  title: 'Portfolio',
                  route: '/portfolio',
                },
              ]}
            />
            <Button
              size="md"
              icon={
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4v8M4 8h8"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              Add transaction
            </Button>
          </div>
          <div className="portfolio__income">
            <PortfolioStats
              amount={
                !noData ? portfolio.data?.currentValue.toLocaleString() : '0'
              }
            />
            <div className="portfolio__graf-section">
              <div className="aic jcsb">
                <div className="portfolio__filters aic">
                  <Tabs className="portfolio__tabs" disabled={noData} />
                  <DateSelect disabled={noData} />
                </div>
                <DropMenu disabled={noData} />
              </div>
              <div className="portfolio__graf centered">
                {noData && (
                  <span className="c2 fw-medium portfolio__text">
                    No data yet
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="aic jcsb">
            <ButtonToogle
              bg="white"
              items={[{ text: 'Holdings' }, { text: 'Transactions' }]}
              onChange={toogleHandler}
              disabled={noData}
            />
            <DropMenu
              color="grey"
              options={
                isTransactions
                  ? [
                      {
                        name: 'All types',
                        id: 1,
                        handler: () => {},
                      },
                      {
                        name: 'Buy',
                        id: 2,
                        handler: () => {},
                      },
                      {
                        name: 'Sell',
                        id: 3,
                        handler: () => {},
                      },
                    ]
                  : [
                      {
                        name: '24h change',
                        id: 1,
                        handler: () => {},
                      },
                      {
                        name: '7d change',
                        id: 2,
                        handler: () => {},
                      },
                      {
                        name: '1m change',
                        id: 3,
                        handler: () => {},
                      },
                      {
                        name: '3m change',
                        id: 4,
                        handler: () => {},
                      },
                      {
                        name: '1y change',
                        id: 5,
                        handler: () => {},
                      },
                    ]
              }
              disabled={noData}
            />
          </div>
          {!isTransactions ? (
            <div className="portfolio__holdings">
              <HoldingHeader />
              {!noData ? (
                portfolio.data?.holdings.map((holding, index) => (
                  <HoldingCard
                    order={index + 1}
                    id={holding.coinId}
                    name={holding.name}
                    value={holding.myValue.toLocaleString()}
                    amount={holding.totalAmount.toLocaleString()}
                    price={holding.price.toLocaleString()}
                    profit={holding.profit.toFixed(2)}
                    percentProfit={holding.change24h.toFixed(2)}
                  />
                ))
              ) : (
                <div className="holding-card centered">
                  <span className="c2 fw-medium portfolio__text">
                    No data yet
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="portfolio__transactions">
              <TransactionHeader />
              {transactions.data.map((transaction, index) => (
                <TransactionCard
                  order={index + 1}
                  id={transaction.coin.id}
                  name={transaction.coin.name}
                  price={transaction.price.toLocaleString()}
                  amount={transaction.amount.toLocaleString()}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default connect(
  ({ portfolio, transactions }) => ({
    portfolio,
    transactions,
  }),
  (dispatch) => ({
    getTransactions: (start, limit) =>
      dispatch(getTransactions({ start, limit })),
  })
)(Portfolio)
