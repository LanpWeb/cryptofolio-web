// @flow

import { createPortal } from 'react-dom'

import type { Props } from './types'

const Modal = ({ isOpen = false, children }: Props) => {
  const content = isOpen && children

  if (typeof window !== 'undefined' && document.body) {
    return createPortal(content, document.body)
  }

  return null
}

export default Modal
