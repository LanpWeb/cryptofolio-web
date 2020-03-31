// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const Facebook = ({ customClassName = "" }: Props) => {
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
        width="8"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon_socials"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.255 8.435h1.736v7.147c0 .14.115.255.256.255H5.19a.255.255 0 00.256-.255V8.468H7.44c.13 0 .24-.097.254-.226l.303-2.63a.255.255 0 00-.253-.286h-2.3V3.677c0-.497.269-.75.797-.75h1.503A.255.255 0 008 2.673V.257a.255.255 0 00-.255-.255H5.673A2.03 2.03 0 005.578 0C5.22 0 3.97.07 2.983.978c-1.093 1.006-.941 2.21-.905 2.42v1.928H.255A.255.255 0 000 5.582v2.597c0 .141.114.256.255.256z"
        />
      </svg>
    </span>
  );
};
