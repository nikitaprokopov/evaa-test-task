import { reatomComponent } from "@reatom/npm-react";

import PlusInCircleIcon from "~/icons/plus-in-circle.svg?react";
import { exhaustiveCheck } from "~/utils/exhaustive-check";
import BorrowIcon from "~/icons/borrow.svg?react";
import { Button } from "~/components/button";

import { useProfitCalculatorModel, TABS_VALUES } from "../../model/profit-calculator-model";

const ICON_CLASSES = "size-6";

export const ProfitButton = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeTabValue = ctx.spy(profitCalculatorModel.activeTabValueAtom);

  const getText = () => {
    switch (activeTabValue) {
      case TABS_VALUES.SUPPLY:
        return "Supply Now";

      case TABS_VALUES.BORROW:
        return "Borrow Now";

      default:
        exhaustiveCheck(activeTabValue);
    }
  };

  const renderIcon = () => {
    switch (activeTabValue) {
      case TABS_VALUES.SUPPLY:
        return <PlusInCircleIcon className={ICON_CLASSES} />;

      case TABS_VALUES.BORROW:
        return <BorrowIcon className={ICON_CLASSES} />;

      default:
        exhaustiveCheck(activeTabValue);
    }
  };

  return (
    <Button
      className="pointer-events-none w-[166px] gap-[10px] bg-white py-[10px] text-base text-black opacity-70"
      data-testid="profit-button"
      tabIndex={-1}
    >
      {renderIcon()} <span>{getText()}</span>
    </Button>
  );
}, "ProfitButton");
