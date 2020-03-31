// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const Insta = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon-frame icon-frame_lg": true,
      customClassName
    },
    customClassName
  );
  return (
    <span className={iconClassName}>
      <svg
        width="17"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon_socials"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.5 0h6a5 5 0 015 5v6a5 5 0 01-5 5h-6a5 5 0 01-5-5V5a5 5 0 015-5zm5.845 14.164a3.323 3.323 0 003.319-3.32V5.156a3.323 3.323 0 00-3.319-3.319h-5.69a3.323 3.323 0 00-3.319 3.32v5.689a3.323 3.323 0 003.32 3.319h5.689z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.39 7.999a4.108 4.108 0 118.217 0 4.108 4.108 0 01-8.216 0zm1.742 0A2.37 2.37 0 008.5 10.366a2.37 2.37 0 002.367-2.367A2.37 2.37 0 008.5 5.632 2.37 2.37 0 006.132 8zM12.69 4.645a.647.647 0 100-1.293.647.647 0 000 1.293z"
        />
      </svg>
    </span>
  );
};
