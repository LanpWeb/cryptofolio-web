// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Eye = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon-frame": true
    },
    customClassName
  );
  return (
    <span className={iconClassName}>
      <svg
        width="14"
        height="10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path d="M7 3c-.506 0-.992.21-1.35.586A2.05 2.05 0 005.09 5c0 .53.202 1.04.56 1.414C6.008 6.79 6.494 7 7 7c.506 0 .992-.21 1.35-.586A2.05 2.05 0 008.91 5c0-.53-.202-1.04-.56-1.414A1.866 1.866 0 007 3zm0 5.333a3.11 3.11 0 01-2.25-.976A3.416 3.416 0 013.818 5c0-.884.335-1.732.932-2.357A3.11 3.11 0 017 1.667a3.11 3.11 0 012.25.976c.597.625.932 1.473.932 2.357 0 .884-.335 1.732-.932 2.357A3.11 3.11 0 017 8.333zM7 0C3.818 0 1.1 2.073 0 5c1.1 2.927 3.818 5 7 5s5.9-2.073 7-5c-1.1-2.927-3.818-5-7-5z" />
      </svg>
    </span>
  );
};
