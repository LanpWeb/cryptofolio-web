// @flow

import React from 'react'
import type { Props } from '../types'

const Google = ({ className = '' }: Props) => (
  <svg
    width="16"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 8.15c0-.66-.06-1.13-.18-1.63H8.16v2.96h4.5c-.1.73-.58 1.84-1.67 2.58l-.02.1L13.4 14l.17.01A7.7 7.7 0 0016 8.15z"
      fill="#4285F4"
    />
    <path
      d="M8.16 15.95c2.2 0 4.05-.71 5.4-1.94L11 12.07a4.9 4.9 0 01-2.83.8 4.9 4.9 0 01-4.64-3.32h-.1L.9 11.47l-.03.1a8.17 8.17 0 007.29 4.39z"
      fill="#34A853"
    />
    <path
      d="M3.52 9.55A4.8 4.8 0 013.5 6.4v-.11L.94 4.35l-.08.04a7.83 7.83 0 000 7.16l2.65-2z"
      fill="#FBBC05"
    />
    <path
      d="M8.16 3.08c1.53 0 2.56.65 3.15 1.19l2.3-2.2A7.94 7.94 0 008.17 0 8.17 8.17 0 00.87 4.4l2.64 2a4.92 4.92 0 014.65-3.32z"
      fill="#EB4335"
    />
  </svg>
)

export default Google
