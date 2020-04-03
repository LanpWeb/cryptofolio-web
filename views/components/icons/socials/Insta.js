// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const Insta = ({ className = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon icon_socials icon_hovered": true
    },
    className
  );
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 3h6a5 5 0 015 5v6a5 5 0 01-5 5h-6a5 5 0 01-5-5V8a5 5 0 015-5zm5.845 14.164a3.323 3.323 0 003.319-3.32V8.156a3.323 3.323 0 00-3.319-3.319h-5.69a3.323 3.323 0 00-3.319 3.32v5.689a3.323 3.323 0 003.32 3.319h5.689z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.39 10.999a4.108 4.108 0 118.218 0 4.108 4.108 0 01-8.217 0zm1.742 0a2.37 2.37 0 002.367 2.367 2.37 2.37 0 002.367-2.367A2.37 2.37 0 0010.5 8.632 2.37 2.37 0 008.132 11zM14.69 7.645a.647.647 0 100-1.293.647.647 0 000 1.293z"
      />
    </svg>
  );
};
