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
    children: "Contact me",
  },
};
export const Styled = {
  args: {
    className:
      "flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none bg-indigo-500 px-10 py-[10px] font-sans text-sm font-semibold not-italic text-white min-w-min",
    children: "Discard",
  },
};
