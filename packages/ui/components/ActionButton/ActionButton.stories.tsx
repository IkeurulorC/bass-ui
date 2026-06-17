import type { Meta } from "@storybook/react-vite";
import { ActionButton } from "./ActionButton";
import { useState } from "react";

const meta: Meta<typeof ActionButton> = {
  title: "Foundations/ActionButton",
  tags: ["autodocs"],
};

export default meta;

export const Primary = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);

    // Simulate an asynchronous network request resolving after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <ActionButton isLoading={loading} onClick={handleLoading} intent="primary">
      Click To Submit
    </ActionButton>
  );
};

export const Secondary = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);

    // Simulate an asynchronous network request resolving after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <ActionButton
      isLoading={loading}
      onClick={handleLoading}
      intent="secondary"
    >
      Click To Submit
    </ActionButton>
  );
};

export const Ghost = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);

    // Simulate an asynchronous network request resolving after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <ActionButton isLoading={loading} onClick={handleLoading} intent="ghost">
      Click To Submit
    </ActionButton>
  );
};

export const Danger = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);

    // Simulate an asynchronous network request resolving after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <ActionButton isLoading={loading} onClick={handleLoading} intent="danger">
      Click To Submit
    </ActionButton>
  );
};

export const Disabled = () => {
  return <ActionButton isDisabled={true}>Click To Submit</ActionButton>;
};

export const Full = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);

    // Simulate an asynchronous network request resolving after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <ActionButton
      size="full"
      isLoading={loading}
      onClick={handleLoading}
      intent="primary"
    >
      Click To Submit
    </ActionButton>
  );
};

export const Styled = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);

    // Simulate an asynchronous network request resolving after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <ActionButton
      className="flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none bg-indigo-500 px-10 py-[10px] fon
    )t-sans text-sm font-semibold not-italic text-white min-w-min"
      isLoading={loading}
      onClick={handleLoading}
      intent="primary"
    >
      Click To Submit
    </ActionButton>
  );
};
