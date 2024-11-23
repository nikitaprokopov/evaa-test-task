import { cn } from "~/libs/tailwind/utils";

import { ProfitCalculatorModelProvider } from "./model/profit-calculator-model-provider";
import { AmountWidget } from "./amount-widget";
import { ProfitTabs } from "./profit-tabs";
import { LoanTerms } from "./loan-terms";
import { Tokens } from "./tokens";

interface IProfitCalculatorProps {
  className?: string;
}

export function ProfitCalculator({ className }: IProfitCalculatorProps) {
  return (
    <ProfitCalculatorModelProvider>
      <div className={cn("pt-5", className)}>
        <div className="px-5">
          <ProfitTabs className="mb-[30px]" />
          <Tokens className="mb-10" />
          <AmountWidget className="mb-10" />
          <LoanTerms />
        </div>
      </div>
    </ProfitCalculatorModelProvider>
  );
}
