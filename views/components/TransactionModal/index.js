// @flow

import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Close } from 'components/icons/Close'
import Button from 'components/Button'
import ButtonToogle from 'components/ButtonToogle'
import SearchBar from 'components/SearchBar'
import Input from 'components/Input'

import type { FormData, Props } from './types'

const TransactionModal = ({
  open = false,
  caption = 'Add transaction',
  textBtn = 'Add',
  className,
  closeModalHandler,
}: Props) => {
  const { register, handleSubmit, control } = useForm<FormData>()
  const onSubmit = useCallback(() => {
    // args - data: FormData
    // make api request with data here
    closeModalHandler?.()
  }, [closeModalHandler])

  const modalClassName = classNames('modal transaction-modal', className)

  const content = open && (
    <div className={modalClassName}>
      <div className="modal__container transaction-modal__container">
        <span className="modal__close" onClick={closeModalHandler}>
          <Close />
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="h4 transaction-modal__caption">{caption}</h4>
          <ButtonToogle ref={register} name="sale" />
          <label className="input-wrap input-wrap_auto transaction-modal__field">
            <span className="p4 input__label">Coin name</span>
            <div className="input-wrap__inner">
              <Controller
                as={<SearchBar shape="bordered" selectable />}
                name="coinId"
                control={control}
                defaultValue={null}
              />
            </div>
          </label>
          <Input
            ref={register}
            name="amount"
            size="auto"
            height="md"
            placeholder="Enter amount"
            label="Amount"
            wrapClassName="transaction-modal__field"
          />
          <Input
            ref={register}
            name="price"
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
                ref={register}
                name="date"
                type="date"
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
            <Button type="submit" size="sm" className="transaction-modal__btn">
              {textBtn}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  if (typeof window !== 'undefined' && document.body) {
    return createPortal(content, document.body)
  }

  return null
}

export default TransactionModal
