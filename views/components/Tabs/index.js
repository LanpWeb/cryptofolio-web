// @flow

import React, { useState } from "react";
import classNames from "classnames";
import type { Props } from "./types";

const InitialContent = [
  { text: "24h", id: 1, handler: () => {} },
  { text: "7d", id: 2, handler: () => {} },
  { text: "1m", id: 3, handler: () => {} },
  { text: "3m", id: 4, handler: () => {} },
  { text: "1y", id: 5, handler: () => {} },
  { text: "All time", id: 6, handler: () => {} }
];

const Tabs = ({ content = InitialContent, selected = 6, className }:Props) => {
  const [selectedTab, setSelectedTab] = useState(selected);
  const tabsClassName = classNames("tabs aic", className);

  return (
    <div className={tabsClassName}>
      {content.map(({ text, id, handler }) => (
        <span
          className={classNames({
            "p3 tabs__item": true,
            tabs__item_active: id === selectedTab
          })}
          key={id}
          onClick={() => { setSelectedTab(id); handler(); }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
