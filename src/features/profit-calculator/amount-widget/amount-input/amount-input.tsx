import { reatomComponent } from "@reatom/npm-react";

import { Input } from "~/components/input";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

export const AmountInput = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();

  const isCurrentAmountInUsd = ctx.spy(profitCalculatorModel.isCurrentAmountInUsdAtom);
  const amountInputValue = ctx.spy(profitCalculatorModel.amountInputValueAtom);
  const activeTokenName = ctx.spy(profitCalculatorModel.activeTokenNameAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Replace commas with dots
    inputValue = inputValue.replace(/,/g, ".");

    // Allow only digits, one dot, and digits after the dot
    if (/^\d*\.?\d*$/.test(inputValue)) {
      profitCalculatorModel.amountInputValueAtom(ctx, inputValue);
    }
  };

  const getPlaceholder = () => {
    if (isCurrentAmountInUsd) {
      return "$0.00";
    }

    return `0.00 ${activeTokenName}`;
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
