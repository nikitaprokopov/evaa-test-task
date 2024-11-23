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
    return <div className={cn("opacity-0 transition-opacity", className)} />;
  }

  const getText = () => {
    if (isAmountInputValueInUsd) {
      return `~${convertedAmount.toFixed(2)} ${activeToken.name}`;
    }

    return `~$${convertedAmount.toFixed(2)}`;
  };

  return (
    <div className={cn("opacity-100 transition-opacity", className)}>
      <p className="pointer-events-none text-sm text-white opacity-50">{getText()}</p>
    </div>
  );
}, "CurrencyEquivalent");
