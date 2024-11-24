import { reatomComponent } from "@reatom/npm-react";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

export const ProfitInToken = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeToken = ctx.spy(profitCalculatorModel.activeTokenAtom);
  const potentialTokenReturnAmount = ctx.spy(profitCalculatorModel.potentialTokenReturnAmountAtom);

  if (potentialTokenReturnAmount === null) {
    return <p className="opacity-0 transition-opacity" />;
  }

  return (
    <p className="flex gap-1 text-white opacity-100 transition-opacity">
      <span className="text-2xl font-black">{potentialTokenReturnAmount.toFixed(2)}</span>
      <span className="mt-2 text-base font-medium">{activeToken.name}</span>
    </p>
  );
}, "ProfitInToken");
