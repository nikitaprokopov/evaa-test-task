import { reatomComponent } from "@reatom/npm-react";
import { RefObject } from "react";

import { Input } from "~/components/input";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

interface IAmountInputProps {
  inputRef: RefObject<HTMLInputElement>;
}

export const AmountInput = reatomComponent<IAmountInputProps>(({ inputRef, ctx }) => {
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

    if (inputValue === "") {
      profitCalculatorModel.amountInputValueAtom(ctx, inputValue);
      return;
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
      className="h-[88px] rounded-3xl pb-7 pl-6 pr-44 pt-5 text-4xl"
      value={amountInputValue ? amountInputValue.toString() : ""}
      placeholder={getPlaceholder()}
      data-testid="amount-input"
      onChange={handleChange}
      ref={inputRef}
    />
  );
}, "AmountInput");
