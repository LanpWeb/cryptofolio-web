// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const LinkedIn = ({ customClassName = "" }: Props) => {
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
        d="M5.004 3C3.792 3 3 3.806 3 4.865 3 5.9 3.77 6.73 4.957 6.73h.023c1.235 0 2.003-.83 2.003-1.866C6.959 3.805 6.215 3 5.003 3zm14.51 9.808v6.19h-3.54v-5.775c0-1.451-.512-2.441-1.793-2.441-.978 0-1.56.667-1.816 1.313-.093.23-.117.552-.117.875v6.029H8.707s.048-9.783 0-10.796h3.54v1.53a.407.407 0 01-.01.017c-.005.006-.01.012-.013.018h.023v-.035c.47-.734 1.31-1.784 3.191-1.784 2.33 0 4.076 1.543 4.076 4.86zM6.749 19H3.21V8.204h3.54V19z"
      />
    </svg>
  );
};
