// @flow

import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { Props } from './types'

const Chart = ({ data }: Props) => {
  return (
    <div className="chart">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c65d9" stopOpacity={0.15} />
              <stop offset="85%" stopColor="#fff" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#F2F7FD" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#438AF1"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#areaFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
