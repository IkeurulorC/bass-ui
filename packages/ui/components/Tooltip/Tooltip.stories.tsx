import { ToolTip } from "./Tooltip";

export default {
  title: "Components/ToolTip",
  component: ToolTip,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),
  },
};
export const Medium = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),
    size: "md",
  },
};
export const Small = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),
    size: "sm",
  },
};
export const Header = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),
    header: "Add To Library",
  },
};
export const DefaultError = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),

    intent: "error",
  },
};
export const MediumError = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),
    size: "md",
    intent: "error",
  },
};
export const SmallError = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),
    size: "sm",
    intent: "error",
  },
};
export const HeaderError = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque!",
    trigger: (
      <button className="absolute top-5 left-2/4 inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        T
      </button>
    ),
    header: "Add To Library",
    intent: "error",
  },
};
