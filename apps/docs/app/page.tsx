"use client";
import { Stat } from "@bass-ui-kit/core";

export default function Page() {
  return (
    <div>
      <Stat.Root>
        <Stat.Label>10000 USD equals</Stat.Label>
        <Stat.Value value={48146350} />
      </Stat.Root>
    </div>
  );
}
