import { reatomComponent } from "@reatom/npm-react";

import { Button } from "~/components/button";
import { cn } from "~/libs/tailwind/utils";

import { useProfitCalculatorModel } from "../model/profit-calculator-model";
import { SUPPORTED_ASSETS } from "../model/profit-calculator-assets";
import { TokenIcon } from "./token-icon";
import { TokenApy } from "./token-apy";

const BUTTON_OUTLINE_CLASSES = "border-[rgba(255,255,255,0.15)] border bg-transparent";
const BUTTON_CLASSES = "h-14 font-medium text-lg rounded-sm items-center gap-[10px]";

interface ITokensProps {
  className?: string;
}

export const Tokens = reatomComponent<ITokensProps>(({ className, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeToken = ctx.spy(profitCalculatorModel.activeTokenAtom);

  const tokens = SUPPORTED_ASSETS.map((asset) => (
    <div className="grid gap-[10px]" key={asset.name}>
      <Button
        className={cn(BUTTON_CLASSES, asset.name !== activeToken.name && BUTTON_OUTLINE_CLASSES)}
        onClick={() => profitCalculatorModel.activeTokenAtom(ctx, asset)}
        type="button"
      >
        <TokenIcon assetName={asset.name} /> {asset.name}
      </Button>

      <TokenApy assetId={asset.assetId} />
    </div>
  ));

  return <div className={cn("grid grid-cols-2 gap-x-[10px] gap-y-5", className)}>{tokens}</div>;
}, "Tokens");
