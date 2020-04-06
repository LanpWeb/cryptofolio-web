// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

const initialOptions = [
  {
    name: "All coins",
    id: 1,
    handler: () => {}
  },
  {
    name: "Bitcoin",
    id: 2,
    handler: () => {}
  },
  {
    name: "Etherium",
    id: 3,
    handler: () => {}
  },
  {
    name: "Litecoin",
    id: 4,
    handler: () => {}
  }
];
const DropList = ({
  options = initialOptions, className, active
}: Props) => {
  const droplistClassName = classNames({
    droplist: true,
    droplist_open: active
  }, className);

  return (
    <div className={droplistClassName}>
      {options.map(({ name, handler, id }) => (
        <div
          className="droplist__option"
          onClick={() => handler()}
          key={id}
        >
          <p className="p3 droplist__text">{name}</p>
        </div>
      ))}
    </div>
  );
};

export default DropList;
