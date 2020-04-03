// @flow

import React from "react";
import classnames from "classnames";
import type { Props } from "./types";

const InputField = ({
  placeholder = "Email",
  label,
  size,
  inputSize,
  wrapClassName,
  inputClassName,
  value,
  acentLabel,
  style,
  disabled,
  handleChange = () => {}
}: Props) => {
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
      input: true,
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
      <input
        value={value}
        type="text"
        disabled={disabled}
        className={inputClass}
        placeholder={placeholder}
        onChange={e => handleChange(e.target.value)}
      />
    </label>
  );
};

export default InputField;
