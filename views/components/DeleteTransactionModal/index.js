// @flow

import React from "react";
import classNames from "classnames";
import { Close } from "components/icons/Close";
import Button from "components/Button";
import type { Props } from "./types";

const DeleteTransactionMofal = ({
  caption = "Are you sure you want to delete this transaction?", text = "You cannot undo this action",
  active = false, className, closeModalHandler = () => {}, submitModalHandler = () => {}
}:Props) => {
  const modalClassName = classNames({
    "modal delete-tr-modal": true,
    modal_active: active
  }, className);
  return (
    <div className={modalClassName}>
      <div className="centered modal__container delete-tr-modal__container">
        <span className="modal__close" onClick={closeModalHandler}>
          <Close />
        </span>
        <h4 className="h4 delete-tr-modal__caption">{caption}</h4>
        <p className="p2 delete-tr-modal__text">{text}</p>
        <div className="delete-tr-modal__btn-group aic">
          <Button shape="text" className="delete-tr-modal__btn" handleClick={closeModalHandler}>Cancel</Button>
          <Button size="sm" className="delete-tr-modal__btn" handleClick={submitModalHandler}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransactionMofal;
