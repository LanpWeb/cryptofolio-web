// @flow

import React, { useState } from 'react'
import classNames from 'classnames'
import { Close } from 'components/icons/Close'
import Button from 'components/Button'
import ButtonToogle from 'components/ButtonToogle'
import SearchBar from 'components/SearchBar'
import Input from 'components/Input'

import type { Props } from './types'

const TransactionModal = ({
  caption = 'Add transaction',
  active = false,
  textBtn = 'Add',
  edit = false,
  className,
  closeModalHandler = () => {},
  submitModalHandler = () => {},
}: Props) => {
  const date = new Date()
  const [isSelling, setSelling] = useState(false)
  const setSellingHandler = () => {
    setSelling(!isSelling)
  }
  const modalClassName = classNames(
    {
      'modal transaction-modal': true,
      modal_active: active,
    },
    className
  )
  return (
    <div className={modalClassName}>
      <div className="modal__container transaction-modal__container">
        <span className="modal__close" onClick={closeModalHandler}>
          <Close />
        </span>
        <h4 className="h4 transaction-modal__caption">{caption}</h4>
        <ButtonToogle handleChange={setSellingHandler} checked={isSelling} />
        <label className="input-wrap input-wrap_auto transaction-modal__field">
          <span className="p4 input__label">Coin name</span>
          <div className="input-wrap__inner">
            <SearchBar shape="bordered" selectable />
          </div>
        </label>
        <Input
          size="auto"
          height="md"
          placeholder="Enter amount"
          label="Amount"
          wrapClassName="transaction-modal__field"
        />
        <Input
          size="auto"
          height="md"
          placeholder="Enter price"
          label="Price"
          wrapClassName="transaction-modal__field"
        />
        <label className="input-wrap input-wrap_auto transaction-modal__field">
          <span className="p4 input__label">Transaction date</span>
          <div className="input-wrap__inner">
            <input
              type="text"
              value={edit ? null : date.toLocaleString()}
              className="input input_height_md"
              placeholder="Enter transaction date"
            />
          </div>
        </label>
        <div className="transaction-modal__btn-group jcfe">
          <Button
            shape="text"
            className="transaction-modal__btn"
            handleClick={closeModalHandler}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="transaction-modal__btn"
            handleClick={submitModalHandler}
          >
            {textBtn}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
