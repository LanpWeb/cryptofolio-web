// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const RoundCheck = ({ customClassName = "", intent = "" }: Props) => {
  const iconFrameClassName = classNames(
    {
      "icon-frame": true
    },
    customClassName
  );
  const iconClassName = classNames({
    "icon icon_secondary": true,
    icon_primary: intent === "primary",
    icon_error: intent === "error",
    icon_success: intent === "success"
  });
  return (
    <span className={iconFrameClassName}>
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <rect width="16" height="16" rx="8" />
        <path
          d="M10.88 5L12 6.058 6.776 11 4 8.375l1.12-1.058 1.656 1.56L10.88 5z"
          fill="#fff"
        />
      </svg>
    </span>
  );
};
