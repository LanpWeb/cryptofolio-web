// @flow

import React, { useState } from "react";
import classnames from "classnames";
import { CloseEye } from "../icons/CloseEye";
import { Eye } from "../icons/Eye";
import type { Props } from "./types";

const PasswordInput = ({
  placeholder = "Password",
  label,
  inputClassName,
  wrapClassName,
  size,
  value,
  inputSize,
  style,
  acentLabel,
  disabled,
  handleChange = () => {}
}: Props) => {
  const [inputType, changeInputType] = useState("password");

  const inputTypeHandleChange = () => {
    changeInputType(inputType === "password" ? "text" : "password");
  };

  const wrapClass = classnames(
    {
      "input-wrap": true,
      "input-wrap_sm": size === "sm",
      "input-wrap_md": size === "md",
      "input-wrap_auto": size === "auto"
    },
    wrapClassName
  );
  const inputClass = classnames(
    {
      "input input_password": true,
      input_sm: inputSize === "sm",
      input_md: inputSize === "md",
      input_border_none: style === "border-none"
    },
    inputClassName
  );
  const labelClass = classnames({
    "p4 input__label": true,
    input__label_acent: acentLabel === true
  });
  return (
    <label className={wrapClass}>
      {label && <span className={labelClass}>{label}</span>}
      <div className="input-wrap__inner">
        <input
          value={value}
          type={inputType}
          className={inputClass}
          placeholder={placeholder}
          disabled={disabled}
          onChange={e => handleChange(e.target.value)}
        />
        {!disabled && (
          <button
            className="pure-btn input__password-btn"
            onClick={(e) => {
              e.preventDefault();
              inputTypeHandleChange();
            }}
            disabled={disabled}
          >
            {inputType === "password" ? <CloseEye /> : <Eye />}
          </button>
        )}
      </div>
    </label>
  );
};

export default PasswordInput;
