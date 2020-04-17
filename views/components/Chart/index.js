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
import Popover from 'components/Popover'

import type { Props } from './types'

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="popover popover_active popover_left">
        <div className="popover__triangle" />
        sssddssd
      </div>
    )
  }

  return null
}
const Chart = ({ data }: Props) => {
import { DateTime } from 'luxon'

import type { Props } from './types'

const Chart = ({ data, dateFormat = 'd LLL' }: Props) => {
  return (
    <div className="chart">
      <ResponsiveContainer>
        <AreaChart
          data={data.map((el) => ({
            ...el,
            date: DateTime.fromISO(el.date).toFormat(dateFormat),
          }))}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c65d9" stopOpacity={0.15} />
              <stop offset="85%" stopColor="#fff" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#F2F7FD" />

          <YAxis
            orientation="right"
            tickSize={0}
            tickMargin={15}
            stroke="#A6AEBD"
            height={0}
            strokeWidth={0}
          />
          <XAxis
            dataKey="date"
            tickSize={7}
            interval={7}
            tickCount={7}
            tickMargin={25}
            stroke="#A6AEBD"
          />
          <Tooltip
            cursor={{ stroke: '#B8C8E8', strokeDasharray: '2 10' }}
            content={<CustomTooltip />}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#438AF1"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#areaFill)"
            activeDot={{
              r: 4,
              stroke: '#438AF1',
              strokeWidth: 11,
              strokeOpacity: '.15',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
