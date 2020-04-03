// @flow

import React from "react";
import classnames from "classnames";
import type { Props } from "./types";
import { RoundCheck } from "../icons/RoundCheck";
import { TriangleInfo } from "../icons/TriangleInfo";
import { SquareInfo } from "../icons/SquareInfo";

const Input = ({
  placeholder = "Email",
  label,
  size,
  height,
  wrapClassName,
  inputClassName,
  value,
  acentLabel,
  shape,
  intent,
  disabled,
  handleChange = () => {}
}: Props) => {
  const wrapClass = classnames(
    {
      "input-wrap": true,
      "input-wrap_xs": size === "xs",
      "input-wrap_sm": size === "sm",
      "input-wrap_md": size === "md",
      "input-wrap_lg": size === "lg",
      "input-wrap_auto": size === "auto"
    },
    wrapClassName
  );

  const inputClass = classnames(
    {
      input: true,
      input_height_xs: height === "xs",
      input_height_sm: height === "sm",
      input_height_md: height === "md",
      "input_success input_password": intent === "success",
      "input_warning input_password": intent === "warning",
      "input_error input_password": intent === "error",
      input_border_none: shape === "border-none"
    },
    inputClassName
  );
  const labelClass = classnames({
    "p4 input__label": true,
    input__label_acent: acentLabel === true
  });
  let icon;
  if (intent === "success") {
    icon = <RoundCheck intent={intent} />;
  } else if (intent === "warning") {
    icon = <TriangleInfo intent={intent} />;
  } else {
    icon = <SquareInfo intent={intent} />;
  }
  return (
    <label className={wrapClass}>
      {label && <span className={labelClass}>{label}</span>}
      {intent ? (
        <div className="input-wrap__inner">
          <input
            value={value}
            type="text"
            className={inputClass}
            placeholder={placeholder}
            disabled={disabled}
            onChange={e => handleChange(e.target.value)}
          />
          {!disabled && (
          <span
            className="input__icon"
          >
            {icon}
          </span>
          )}
        </div>
      ) : (
        <input
          value={value}
          type="text"
          disabled={disabled}
          className={inputClass}
          placeholder={placeholder}
          onChange={e => handleChange(e.target.value)}
        />
      )}

    </label>
  );
};

export default Input;
