// @flow

export type Props = {|
  placeholder?: string,
  size?: "sm" | "md" | "auto",
  inputSize?: "sm" | "md",
  style?: "border-none",
  label?: string,
  disabled?: boolean,
  acentLabel?: boolean,
  wrapClassName?: string,
  inputClassName?: string,
  value?: string,
  handleChange: (value: string) => void
|};
