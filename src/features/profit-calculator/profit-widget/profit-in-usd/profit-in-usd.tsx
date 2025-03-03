import { reatomComponent } from "@reatom/npm-react";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

export const ProfitInUsd = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const potentialReturnAmountInUsd = ctx.spy(profitCalculatorModel.potentialReturnAmountInUsdAtom);

  if (potentialReturnAmountInUsd === null) {
    return <p className="opacity-0 transition-opacity" />;
  }

  return (
    <p className="text-sm text-white opacity-50 transition-opacity" data-testid="profit-in-usd">
      ~${potentialReturnAmountInUsd.round(2).toString()}
    </p>
  );
}, "ProfitInUsd");
