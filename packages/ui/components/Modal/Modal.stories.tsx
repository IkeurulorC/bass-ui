import { Modal } from "./Modal";
import BaseActionButton from "../ActionButton/ActionButton";
import React from "react";

export default {
  title: "Modal",
  component: Modal,
  argTypes: {
    header: { control: false },
    footer: { control: false },
  },
  parameters: {
    // This removes the 16px padding that Storybook adds by default
    layout: "centered",
  },
};

export const Default = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    footer: "Discard",
  },
};

export const longText = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error sit
        reprehenderit possimus corrupti pariatur debitis quis quibusdam quasi
        accusantium, obcaecati fugiat blanditiis distinctio saepe quos magnam
        reiciendis dicta earum.
      </p>
    ),
    footer: "Discard",
  },
};

export const sm = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    footer: "Discard",
    size: "sm",
  },
};

export const md = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    action: "Discard",
    size: "md",
  },
};

export const ActionButton = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    footer: (
      <>
        <BaseActionButton intent="ghost">Cancel</BaseActionButton>
        <BaseActionButton>Discard</BaseActionButton>
      </>
    ),
  },
};

export const smActionButton = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    footer: (
      <>
        <BaseActionButton intent="ghost" size="sm">
          Cancel
        </BaseActionButton>
        <BaseActionButton size="sm">Discard</BaseActionButton>
      </>
    ),
    size: "sm",
  },
};

export const Mix = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    footer: (
      <>
        <BaseActionButton intent="ghost">Cancel</BaseActionButton>
        <button className="flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none bg-indigo-500 px-10 py-3 font-sans text-sm font-semibold not-italic text-white max-w-none">
          Discard
        </button>
      </>
    ),
  },
};

export const StyledActionButton = {
  args: {
    // These match the "props" your Modal expects
    isOpen: true,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    footer: (
      <>
        <BaseActionButton
          className="flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none  px-10 py-[10px] font-sans text-sm font-semibold not-italic text-white min-w-min"
          intent="ghost"
        >
          Cancel
        </BaseActionButton>
        <BaseActionButton className="flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none bg-indigo-500 px-10 py-[10px] font-sans text-sm font-semibold not-italic text-white min-w-min">
          Discard
        </BaseActionButton>
      </>
    ),
  },
};

export const Trigger = {
  args: {
    // These match the "props" your Modal expects
    isOpen: false,
    trigger: <button className="bg-blue-500 text-white p-2">Open Modal</button>,
    title: "Discard Changes",
    header: (
      <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
        Discard Changes
      </h3>
    ),
    children: (
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        Are you sure you want to discard changes? This action can't be undone
      </p>
    ),
    footer: "Discard",
  },
};