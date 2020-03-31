// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const Dribble = ({ customClassName = "" }: Props) => {
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
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon_socials"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm0-1.863c-1.267 0-2.47-.38-3.5-1.101.42-.697 1.696-2.442 4.43-3.485a27.33 27.33 0 011.182 4.21A6.065 6.065 0 018 14.137zm2.89-5.057a29.537 29.537 0 011.01 3.652 6.162 6.162 0 002.088-3.418 9.559 9.559 0 00-2.258-.275 8.48 8.48 0 00-.84.041zm2.132-4.576a6.15 6.15 0 011.083 2.983 16.645 16.645 0 00-2.63-.218c-.435 0-.857.02-1.257.06l-.032-.076a21.122 21.122 0 00-.267-.599c1.633-.733 2.622-1.63 3.103-2.15zm-1.24-1.31a6.112 6.112 0 00-4.648-1.25 35.593 35.593 0 011.94 3.071c1.49-.616 2.337-1.406 2.708-1.822zm-6.67-.589c.36.507 1.152 1.656 1.953 3.032a24.32 24.32 0 01-4.948.653 6.176 6.176 0 012.995-3.685zm3.074 5.151a22.51 22.51 0 00-.201-.416c-2.639.741-5.163.844-6.11.854a6.107 6.107 0 001.25 3.525c.653-.944 2.341-3.028 5.06-3.963z"
        />
      </svg>
    </span>
  );
};
