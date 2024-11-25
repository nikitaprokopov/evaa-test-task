import { useRef } from "react";

import { cn } from "~/libs/tailwind/utils";

import { CurrencyEquivalent } from "./currency-equivalent";
import { CurrencyToggle } from "./currency-toggle";
import { AmountCurrency } from "./amount-currency";
import { AmountInput } from "./amount-input";

interface IAmountWidgetProps {
  className?: string;
}

export function AmountWidget({ className }: IAmountWidgetProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative flex items-center", className)}>
      <CurrencyEquivalent className="absolute bottom-3 left-6" />
      <AmountInput inputRef={inputRef} />
      <AmountCurrency inputRef={inputRef} />
      <CurrencyToggle className="absolute right-6" />
    </div>
  );
}
