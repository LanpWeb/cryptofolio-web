// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const LinkedIn = ({ customClassName = "" }: Props) => {
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
          d="M2.004 0C.792 0 0 .806 0 1.865 0 2.9.77 3.73 1.957 3.73h.023c1.235 0 2.003-.83 2.003-1.866C3.959.805 3.215 0 2.003 0zm14.51 9.808v6.19h-3.54v-5.775c0-1.451-.512-2.441-1.793-2.441-.978 0-1.56.667-1.816 1.313-.093.23-.117.552-.117.875v6.029H5.707s.048-9.783 0-10.796h3.54v1.53a.441.441 0 01-.01.017c-.005.006-.01.012-.013.018h.023v-.035c.47-.734 1.31-1.784 3.191-1.784 2.33 0 4.076 1.543 4.076 4.86zM3.749 16H.21V5.204h3.54V16z"
        />
      </svg>
    </span>
  );
};
