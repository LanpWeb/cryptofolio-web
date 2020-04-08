// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Eye = ({ className = "", active }: Props) => {
  const iconClassName = classNames(
    {
      "icon icon_hovered": true,
      icon_active: active,

    },
    className
  );
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path d="M8 6c-.506 0-.992.21-1.35.586A2.05 2.05 0 006.09 8c0 .53.202 1.04.56 1.414.358.375.844.586 1.35.586.506 0 .992-.21 1.35-.586A2.05 2.05 0 009.91 8c0-.53-.202-1.04-.56-1.414A1.866 1.866 0 008 6zm0 5.333a3.11 3.11 0 01-2.25-.976A3.416 3.416 0 014.818 8c0-.884.335-1.732.932-2.357A3.11 3.11 0 018 4.667a3.11 3.11 0 012.25.976c.597.625.932 1.473.932 2.357 0 .884-.335 1.732-.932 2.357a3.11 3.11 0 01-2.25.976zM8 3C4.818 3 2.1 5.073 1 8c1.1 2.927 3.818 5 7 5s5.9-2.073 7-5c-1.1-2.927-3.818-5-7-5z" />
    </svg>
  );
};
