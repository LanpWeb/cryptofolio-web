// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "../types";

export const Behance = ({ className = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon icon_socials icon_hovered": true
    },
    className
  );
  return (
    <svg
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2 14.244c0-.714-.162-1.322-.485-1.823-.321-.503-.802-.868-1.435-1.1.418-.213.734-.449.948-.708.384-.463.575-1.071.575-1.832 0-.738-.189-1.372-.57-1.9C9.6 6.017 8.526 5.578 7.01 5.554H1V18h5.605a8.68 8.68 0 001.757-.168 3.401 3.401 0 001.405-.625c.351-.263.644-.59.88-.977.37-.586.553-1.248.553-1.986zm2.852-6.93h5.012V6.07h-5.012v1.245zM3.872 10.46h2.634c.541 0 .978-.103 1.315-.308.337-.206.505-.57.505-1.095 0-.578-.222-.963-.668-1.148-.384-.128-.874-.194-1.47-.194H3.873v2.745zm3.916 2.273c.528.24.792.687.792 1.333 0 .767-.273 1.283-.817 1.554-.302.148-.72.219-1.26.219h-2.63v-3.317h2.67c.534.005.95.075 1.245.211zm13.133-.693c.06.408.088.998.077 1.77h-6.49c.035.896.344 1.523.93 1.881.354.225.783.335 1.286.335.53 0 .96-.134 1.293-.409.181-.146.34-.352.479-.612h2.379c-.062.53-.349 1.066-.864 1.612-.797.866-1.916 1.301-3.352 1.301-1.187 0-2.233-.366-3.14-1.097-.905-.733-1.36-1.922-1.36-3.571 0-1.547.408-2.73 1.227-3.554.821-.826 1.882-1.237 3.189-1.237.775 0 1.473.139 2.096.417a3.61 3.61 0 011.539 1.32c.366.531.601 1.145.71 1.844zm-2.965-1.177c.372.32.58.79.623 1.409h-4.017c.085-.582.29-1.042.622-1.38.329-.34.791-.512 1.39-.512.551 0 1.012.162 1.382.483z"
      />
    </svg>
  );
};
