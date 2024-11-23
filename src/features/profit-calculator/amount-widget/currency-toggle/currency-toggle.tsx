import { reatomComponent } from "@reatom/npm-react";

import ArrowsIcon from "~/icons/arrows.svg?react";
import { Button } from "~/components/button";
import { cn } from "~/libs/tailwind/utils";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

interface ICurrencyToggleProps {
  className?: string;
}

export const CurrencyToggle = reatomComponent<ICurrencyToggleProps>(({ className, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();

  const isCurrentAmountInUsd = ctx.spy(profitCalculatorModel.isCurrentAmountInUsdAtom);
  const activeTokenName = ctx.spy(profitCalculatorModel.activeTokenNameAtom);

  const getCurrencyText = () => {
    if (isCurrentAmountInUsd) {
      return activeTokenName;
    }

    return "USD";
  };

  return (
    <Button
      className={cn("h-fit items-center gap-2 bg-[rgba(255,255,255,0.1)] px-3 text-sm", className)}
      onClick={() => profitCalculatorModel.isCurrentAmountInUsdAtom.toggle(ctx)}
      type="button"
    >
      <ArrowsIcon className="size-[18px] text-white opacity-50" />
      <span className="text-white opacity-50">{getCurrencyText()}</span>
    </Button>
  );
}, "CurrencyToggle");
