// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Award = ({ className = "", intent = "" }: Props) => {
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
    <svg viewBox="0 0 16 16" stroke="none" xmlns="http://www.w3.org/2000/svg" className={iconClassName}>
      <path d="M8 9.6a4 4 0 100-8 4 4 0 000 8z" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.574 8.806L4.8 14.4 8 12.558l3.2 1.842-.775-5.6" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
