// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Delete = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon-frame": true
    },
    customClassName
  );
  return (
    <>
      <span className={iconClassName}>
        <svg
          width="10"
          height="12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path d="M10 .667H7.5L6.786 0H3.214L2.5.667H0V2h10V.667zm-9.286 10c0 .353.15.692.419.943.268.25.631.39 1.01.39h5.714c.379 0 .742-.14 1.01-.39s.419-.59.419-.943v-8H.714v8z" />
        </svg>
      </span>
    </>
  );
};
