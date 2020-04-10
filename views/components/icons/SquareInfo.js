// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const SquareInfo = ({ className = "", intent = "" }: Props) => {
  const iconClassName = classNames(
    {
      icon: true,
      icon_primary: intent === "primary",
      icon_error: intent === "error",
      icon_success: intent === "success",
      icon_warning: intent === "warning"
    },
    className
  );
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconClassName}><path d="M8.889 8.889H7.11V3.556H8.89v5.333zM8 12.71A1.156 1.156 0 118 10.4a1.156 1.156 0 010 2.311zM11.316 0H4.684L0 4.684v6.632L4.684 16h6.632L16 11.316V4.684L11.316 0z" /></svg>
  );
};
