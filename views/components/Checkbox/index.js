// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";
import { Check } from "../icons/Check";

const Checkbox = ({
  handleChange = () => {},
  checked,
  label,
  className,
  intent
}: Props) => {
  const checkClassName = classNames("checkbox aic", className);
  const customCheckClassName = classNames({
    checkbox__custom: true,
    checkbox__custom_primary: intent === "primary",
    checkbox__custom_error: intent === "error",
    checkbox__custom_success: intent === "success"
  });
  const labelClassName = classNames({
    "p3 checkbox__label-text": true,
    "checkbox__label-text_primary": intent === "primary",
    "checkbox__label-text_error": intent === "error",
    "checkbox__label-text_success": intent === "success"
  });
  return (
    <label className={checkClassName}>
      <input
        type="checkbox"
        className="checkbox__real"
        onChange={e => handleChange(e.target.checked)}
        checked={checked}
      />
      <span className={customCheckClassName}>
        <Check customClassName="checkbox__icon" intent={intent} />
      </span>
      {label && <span className={labelClassName}>{label}</span>}
    </label>
  );
};

export default Checkbox;
