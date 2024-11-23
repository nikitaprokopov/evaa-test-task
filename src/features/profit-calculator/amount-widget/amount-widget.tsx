import { CurrencyEquivalent } from "./currency-equivalent";
import { CurrencyToggle } from "./currency-toggle";
import { AmountInput } from "./amount-input";

export function AmountWidget() {
  return (
    <div className="relative flex items-center">
      <CurrencyEquivalent className="absolute bottom-3 left-6" />
      <CurrencyToggle className="absolute right-6" />
      <AmountInput />
    </div>
  );
}
