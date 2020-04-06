// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Folder = ({ className = "", intent = "" }: Props) => {
  const iconClassName = classNames(
    {
      icon: true,
      icon_primary: intent === "primary",
      icon_error: intent === "error",
      icon_success: intent === "success",
      icon_warning: intent === "warning"
    },
    className
  );
  return (
    <svg viewBox="0 0 16 16" stroke="none" xmlns="http://www.w3.org/2000/svg" className={iconClassName}>
      <path d="M10.5 3h1.25c.332 0 .65.129.884.358.234.23.366.54.366.864v8.556c0 .324-.132.635-.366.864-.235.23-.553.358-.884.358h-7.5c-.332 0-.65-.129-.884-.358A1.209 1.209 0 013 12.778V4.222c0-.324.132-.635.366-.864.235-.23.552-.358.884-.358H5.5" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 2h-3c-.276 0-.5.336-.5.75v1.5c0 .414.224.75.5.75h3c.276 0 .5-.336.5-.75v-1.5c0-.414-.224-.75-.5-.75z" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
