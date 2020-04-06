// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const RoundInfo = ({ className = "", intent = "" }: Props) => {
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
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconClassName}><path d="M8.6 6.2H7.4V5h1.2v1.2zm0 4.8H7.4V7.4h1.2V11zM8 2a6 6 0 100 12A6 6 0 008 2z" /></svg>
  );
};
