// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const LinkIcon = ({ className = "", intent = "" }: Props) => {
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
    <svg viewBox="0 0 16 16" stroke="none" xmlns="http://www.w3.org/2000/svg" className={iconClassName}><path d="M9.273 5h1.773c.388 0 .772.078 1.13.228.359.151.684.372.959.65a3.04 3.04 0 010 4.243c-.275.279-.6.5-.959.65-.358.151-.742.229-1.13.229H9.273m-3.546 0H3.955c-.388 0-.773-.078-1.131-.228a2.95 2.95 0 01-.959-.65A3.023 3.023 0 011 8c0-.796.311-1.559.865-2.121A2.932 2.932 0 013.955 5h1.772M5 8h5" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
};
