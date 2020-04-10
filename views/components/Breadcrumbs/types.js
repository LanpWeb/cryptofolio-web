// @flow

import type { NextRouter } from "next/router";

export type Props = {|
    router: NextRouter,
    items?: Array<{title: string, route: string}>,
    className?: string
  |};
