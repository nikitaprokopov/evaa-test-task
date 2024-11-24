import { cn } from "~/libs/tailwind/utils";

import { ProfitCalculatorModelProvider } from "./model/profit-calculator-model-provider";
import { AmountWidget } from "./amount-widget";
import { ProfitWidget } from "./profit-widget";
import { ProfitTabs } from "./profit-tabs";
import { LoanTerms } from "./loan-terms";
import { Tokens } from "./tokens";

interface IProfitCalculatorProps {
  className?: string;
}

export function ProfitCalculator({ className }: IProfitCalculatorProps) {
  return (
    <ProfitCalculatorModelProvider>
      <div className={cn("bg-master pt-5 noise", className)}>
        <div className="mb-10 px-5">
          <ProfitTabs className="mb-[30px]" />
          <Tokens className="mb-10" />
          <AmountWidget className="mb-10" />
          <LoanTerms />
        </div>

        <ProfitWidget />
      </div>
    </ProfitCalculatorModelProvider>
  );
}
