import { reatomComponent } from "@reatom/npm-react";

import { Button } from "~/components/button";
import { cn } from "~/libs/tailwind/utils";

import { useProfitCalculatorModel } from "../model/profit-calculator-model";
import { SUPPORTED_ASSETS } from "../model/profit-calculator-assets";
import { TokenIcon } from "./token-icon";

const BUTTON_OUTLINE_CLASSES = "border-[rgba(255,255,255,0.15)]";
const BUTTON_CLASSES = "h-14 font-medium text-lg rounded-sm items-center gap-[10px]";

interface ITokensProps {
  className?: string;
}

export const Tokens = reatomComponent<ITokensProps>(({ className, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeTokenName = ctx.spy(profitCalculatorModel.activeTokenNameAtom);

  const buttons = SUPPORTED_ASSETS.map((asset) => (
    <Button
      className={cn(BUTTON_CLASSES, asset.name !== activeTokenName && BUTTON_OUTLINE_CLASSES)}
      onClick={() => profitCalculatorModel.activeTokenNameAtom(ctx, asset.name)}
      variant={asset.name === activeTokenName ? "default" : "outline"}
      key={asset.name}
      type="button"
    >
      <TokenIcon assetName={asset.name} /> {asset.name}
    </Button>
  ));

  return <div className={cn("grid grid-cols-2 gap-[10px]", className)}>{buttons}</div>;
}, "Tokens");
