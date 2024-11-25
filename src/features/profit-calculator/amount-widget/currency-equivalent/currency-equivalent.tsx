import { reatomComponent } from "@reatom/npm-react";

import { cn } from "~/libs/tailwind/utils";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

interface ICurrencyEquivalentProps {
  className?: string;
}

export const CurrencyEquivalent = reatomComponent<ICurrencyEquivalentProps>(({ className, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();

  const isAmountInputValueInUsd = ctx.spy(profitCalculatorModel.isAmountInputValueInUsdAtom);
  const convertedAmount = ctx.spy(profitCalculatorModel.convertedAmountAtom);
  const activeToken = ctx.spy(profitCalculatorModel.activeTokenAtom);

  if (convertedAmount === null) {
    return null;
  }

  const getText = () => {
    if (isAmountInputValueInUsd) {
      return `~${convertedAmount.round(2).toString()} ${activeToken.name}`;
    }

    return `~$${convertedAmount.round(2).toString()}`;
  };

  return (
    <div className={cn("animate-fade-in", className)} data-testid="currency-equivalent">
      <p className="pointer-events-none text-sm text-white opacity-50">{getText()}</p>
    </div>
  );
}, "CurrencyEquivalent");
