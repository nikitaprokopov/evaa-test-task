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

  const isAmountInputValueInUsd = ctx.spy(profitCalculatorModel.isAmountInputValueInUsdAtom);
  const activeToken = ctx.spy(profitCalculatorModel.activeTokenAtom);

  const getCurrencyText = () => {
    if (isAmountInputValueInUsd) {
      return activeToken.name;
    }

    return "USD";
  };

  return (
    <Button
      className={cn("h-fit items-center gap-2 bg-[rgba(255,255,255,0.1)] px-3 text-sm", className)}
      onClick={() => profitCalculatorModel.onCurrencyToggleAction(ctx)}
      dataTestId="currency-toggle"
      type="button"
    >
      <ArrowsIcon className="size-[18px] text-white opacity-50" />
      <span className="text-white opacity-50">{getCurrencyText()}</span>
    </Button>
  );
}, "CurrencyToggle");
