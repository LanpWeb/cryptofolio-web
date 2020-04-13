// @flow

import React, { useCallback } from "react";
import { connect } from "react-redux";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { getTransactions } from "ducks/transactions/actions";

import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import DropMenu from "components/DropMenu";

import type { Props } from "./types";
import PortfolioStats from "../../components/PortfolioStats";
import Tabs from "../../components/Tabs";
import DateSelect from "../../components/DateSelect";
import ButtonToogle from "../../components/ButtonToogle";


const Portfolio = ({
  portfolio,
  transactions,
  getTransactions
}: Props) => (
  <div className="portfolio">
    <Header />
    <div className="portfolio__inner">
      <div className="container">
        <div className="aic jcsb">
          <Breadcrumbs items={[
            {
              title: "All coins",
              route: "/"
            },
            {
              title: "Portfolio",
              route: "/portfolio"
            }
          ]}
          />
          <Button size="md" icon={<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4v8M4 8h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Add transaction</Button>
        </div>
        <div className="portfolio__income">
          <PortfolioStats />
          <div className="portfolio__graf-section">
            <div className="aic jcsb">
              <div className="portfolio__filters aic">
                <Tabs className="portfolio__tabs" />
                <DateSelect />
              </div>
              <DropMenu />
            </div>
            <div className="portfolio__graf" />
          </div>
        </div>
        <ButtonToogle bg="white" />
      </div>
    </div>
  </div>
);


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
