import * as Card from "./Card";
import { Bitcoin } from "lucide-react";

export default {
  title: "Components/AssetCard",
};

export const Default = () => {
  return (
    <Card.AssetCard.Root>
      <Card.AssetCard.Header>
        <Card.AssetCard.Icon>
          <Bitcoin className="w-9 h-9 border rounded-full text-white bg-orange-400 p-1" />
        </Card.AssetCard.Icon>
        <Card.AssetCard.Group>
          <span className="font-semibold">Bitcoin</span>
          <span className="font-light text-gray-400">BTC</span>
        </Card.AssetCard.Group>
      </Card.AssetCard.Header>
      <Card.AssetCard.Main>
        <Card.AssetCard.Info>
          <Card.AssetCard.Value>$112,350</Card.AssetCard.Value>
          <Card.AssetCard.Rate rate={0.03} />
        </Card.AssetCard.Info>
        <Card.AssetCard.Visuals>
          <Card.AssetCard.Sparkline
            strokeWidth={1}
            data={[4350, 4310, 4340, 4210, 4250, 4180, 4112, 4400]}
          />
        </Card.AssetCard.Visuals>
      </Card.AssetCard.Main>
    </Card.AssetCard.Root>
  );
};

export const Negative = () => {
  return (
    <Card.AssetCard.Root>
      <Card.AssetCard.Header>
        <Card.AssetCard.Icon>
          <Bitcoin className="w-9 h-9 border rounded-full text-white bg-orange-400 p-1" />
        </Card.AssetCard.Icon>
        <Card.AssetCard.Group>
          <span className="font-semibold">Bitcoin</span>
          <span className="font-light text-gray-400">BTC</span>
        </Card.AssetCard.Group>
      </Card.AssetCard.Header>
      <Card.AssetCard.Main>
        <Card.AssetCard.Info>
          <Card.AssetCard.Value>$112,350</Card.AssetCard.Value>
          <Card.AssetCard.Rate rate={-0.03} />
        </Card.AssetCard.Info>
        <Card.AssetCard.Visuals>
          <Card.AssetCard.Sparkline
            strokeWidth={1}
            data={[4350, 4310, 4340, 4210, 4250, 4180, 4112, 4058]}
          />
        </Card.AssetCard.Visuals>
      </Card.AssetCard.Main>
    </Card.AssetCard.Root>
  );
};

export const Neutral = () => {
  return (
    <Card.AssetCard.Root>
      <Card.AssetCard.Header>
        <Card.AssetCard.Icon>
          <Bitcoin className="w-9 h-9 border rounded-full text-white bg-orange-400 p-1" />
        </Card.AssetCard.Icon>
        <Card.AssetCard.Group>
          <span className="font-semibold">Bitcoin</span>
          <span className="font-light text-gray-400">BTC</span>
        </Card.AssetCard.Group>
      </Card.AssetCard.Header>
      <Card.AssetCard.Main>
        <Card.AssetCard.Info>
          <Card.AssetCard.Value>$112,350</Card.AssetCard.Value>
          <Card.AssetCard.Rate rate={0.0} />
        </Card.AssetCard.Info>
        <Card.AssetCard.Visuals>
          <Card.AssetCard.Sparkline
            strokeWidth={1}
            data={[4350, 4310, 4340, 4250, 4292, 4265, 4308, 4350]}
          />
        </Card.AssetCard.Visuals>
      </Card.AssetCard.Main>
    </Card.AssetCard.Root>
  );
};
