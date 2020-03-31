// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const CloseEye = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      icon: true
    },
    customClassName
  );
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path d="M7.892 5.79l2.017 1.995v-.1c0-.503-.201-.985-.56-1.34A1.916 1.916 0 008 5.788h-.108zm-2.737.505l.987.979c-.032.132-.051.265-.051.41 0 .503.201.985.56 1.34.357.355.843.555 1.349.555.14 0 .28-.019.414-.05l.986.978a3.174 3.174 0 01-1.4.335 3.194 3.194 0 01-2.25-.925 3.146 3.146 0 01-.932-2.233c0-.499.127-.966.337-1.39zM1.636 2.802l1.451 1.44.287.284A7.478 7.478 0 001 7.684a7.525 7.525 0 007 4.737c.986 0 1.928-.19 2.787-.53l.274.265L12.919 14l.808-.802L2.445 2l-.809.802zM8 4.526c.844 0 1.653.333 2.25.925.597.592.932 1.396.932 2.233 0 .404-.083.796-.23 1.15l1.865 1.85a7.482 7.482 0 002.183-3 7.525 7.525 0 00-7-4.737 7.59 7.59 0 00-2.545.442l1.38 1.358c.363-.139.751-.22 1.165-.22z" />
    </svg>
  );
};
