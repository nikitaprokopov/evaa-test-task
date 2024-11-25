import { reatomComponent } from "@reatom/npm-react";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

export const ProfitInToken = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeToken = ctx.spy(profitCalculatorModel.activeTokenAtom);
  const potentialTokenReturnAmount = ctx.spy(profitCalculatorModel.potentialTokenReturnAmountAtom);

  if (potentialTokenReturnAmount === null) {
    return null;
  }

  return (
    <p className="animate-fade-in flex gap-1 text-white">
      <span data-testid="profit-in-token-amount" className="text-2xl font-black">
        {potentialTokenReturnAmount.round(2).toFixed()}
      </span>

      <span className="mt-2 text-base font-medium" data-testid="profit-in-token-name">
        {activeToken.name}
      </span>
    </p>
  );
}, "ProfitInToken");
