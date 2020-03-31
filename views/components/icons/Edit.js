// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Edit = ({ customClassName = "" }: Props) => {
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
          width="13"
          height="13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path d="M11.807 3.693a.664.664 0 000-.94l-1.56-1.56a.664.664 0 00-.94 0L8.08 2.413l2.5 2.5 1.227-1.22zM0 10.5V13h2.5l7.373-7.38-2.5-2.5L0 10.5z" />
        </svg>
      </span>
    </>
  );
};
