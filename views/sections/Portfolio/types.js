// @flow

import type { State as PortfolioState } from 'ducks/portfolio/types'
import type { State as TransactionsState } from 'ducks/transactions/types'

export type Props = {
  portfolio: PortfolioState,
  transactions: TransactionsState,
  noData?: boolean,
}
