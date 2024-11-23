import { reatomComponent } from "@reatom/npm-react";

import { cn } from "~/libs/tailwind/utils";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

interface ICurrencyEquivalentProps {
  className?: string;
}

export const CurrencyEquivalent = reatomComponent<ICurrencyEquivalentProps>(({ className, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();

  const isCurrentAmountInUsd = ctx.spy(profitCalculatorModel.isCurrentAmountInUsdAtom);
  const activeTokenName = ctx.spy(profitCalculatorModel.activeTokenNameAtom);

  const getText = () => {
    if (isCurrentAmountInUsd) {
      return `~0.00 ${activeTokenName}`;
    }

    return "~$0.00";
  };

  return <p className={cn("pointer-events-none text-sm text-white opacity-50", className)}>{getText()}</p>;
}, "CurrencyEquivalent");
