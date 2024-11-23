import { reatomComponent } from "@reatom/npm-react";

import { Input } from "~/components/input";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

export const AmountInput = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();

  const isAmountInputValueInUsd = ctx.spy(profitCalculatorModel.isAmountInputValueInUsdAtom);
  const amountInputValue = ctx.spy(profitCalculatorModel.amountInputValueAtom);
  const activeToken = ctx.spy(profitCalculatorModel.activeTokenAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Replace commas with dots
    inputValue = inputValue.replace(/,/g, ".");

    // Prevent the first character from being a dot
    if (inputValue.startsWith(".")) {
      inputValue = inputValue.slice(1); // Remove the leading dot
    }

    // Allow only digits, one dot, and digits after the dot
    if (/^\d*\.?\d*$/.test(inputValue)) {
      profitCalculatorModel.amountInputValueAtom(ctx, inputValue);
    }
  };

  const getPlaceholder = () => {
    if (isAmountInputValueInUsd) {
      return "$0.00";
    }

    return `0.00 ${activeToken.name}`;
  };

  return (
    <Input
      className="h-[88px] px-6 pb-7 pr-32 pt-3 text-4xl"
      placeholder={getPlaceholder()}
      value={amountInputValue}
      onChange={handleChange}
    />
  );
}, "AmountInput");
