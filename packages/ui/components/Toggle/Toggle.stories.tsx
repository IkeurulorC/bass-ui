import { Toggle } from "./Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
};

export const Default = {
  args: {
    error: "False Spook!!! Hahaha",
  },
};

export const Disabled = {
  args: {
    disabled: true,
    error: "False Spook!!! Hahaha",
  },
};
