// @flow

export type Props = {|
  size?: "xs" | "sm" | "md" | "auto",
  shape?: "outline" | "social" | "text",
  icon?: Object,
  children?: Object,
  handleClick?: () => void,
  className?: string,
  disabled?: boolean
|};
