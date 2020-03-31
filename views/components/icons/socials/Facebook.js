// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const Facebook = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon icon_socials": true
    },
    customClassName
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
        d="M7.255 11.435h1.736v7.147c0 .14.115.255.256.255h2.943a.255.255 0 00.256-.255v-7.114h1.995c.13 0 .24-.097.254-.226l.303-2.63a.255.255 0 00-.253-.286h-2.3V6.677c0-.497.268-.75.797-.75h1.503A.255.255 0 0015 5.673V3.257a.255.255 0 00-.255-.255h-2.072c-.014 0-.047-.002-.095-.002-.359 0-1.608.07-2.595.978-1.093 1.006-.941 2.21-.905 2.42v1.928H7.255A.255.255 0 007 8.582v2.597c0 .141.114.256.255.256z"
      />
    </svg>
  );
};
