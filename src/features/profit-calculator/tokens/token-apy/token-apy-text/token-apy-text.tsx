import { reatomComponent } from "@reatom/npm-react";

import { useProfitCalculatorModel, TABS_VALUES } from "~/features/profit-calculator/model/profit-calculator-model";
import { exhaustiveCheck } from "~/utils/exhaustive-check";

export const TokenApyText = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeTabValue = ctx.spy(profitCalculatorModel.activeTabValueAtom);

  function getText() {
    switch (activeTabValue) {
      case TABS_VALUES.SUPPLY:
        return "Supply APY";

      case TABS_VALUES.BORROW:
        return "Borrow APY";

      default:
        exhaustiveCheck(activeTabValue);
    }
  }

  return <span className="text-tertiary">{getText()}</span>;
}, "TokenApyText");
