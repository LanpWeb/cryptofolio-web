// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const RoundInfo = ({ customClassName = "", intent = "" }: Props) => {
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
        width="12"
        height="12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path d="M6.6 4.2H5.4V3h1.2v1.2zm0 4.8H5.4V5.4h1.2V9zM6 0a6 6 0 100 12A6 6 0 006 0z" />
      </svg>
    </span>
  );
};
