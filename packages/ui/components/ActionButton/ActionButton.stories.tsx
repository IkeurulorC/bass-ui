import { Children } from "react";
import ActionButton from "./ActionButton";

export default {
  title: "call_to_action",
  component: ActionButton,
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    children: "Button",
    intent: "primary",
  },
};
export const Secondary = {
  args: {
    children: "Button",
    intent: "secondary",
  },
};
export const Danger = {
  args: {
    children: "Button",
    intent: "danger",
  },
};
export const Ghost = {
  args: {
    children: "Button",
    intent: "ghost",
  },
};
export const Disabled = {
  args: {
    children: "Button",
    isDisabled: true,
  },
};
export const Medium = {
  args: {
    size: "md",
    children: "Button",
  },
};
export const Small = {
  args: {
    size: "sm",
    children: "contact me",
  },
};
