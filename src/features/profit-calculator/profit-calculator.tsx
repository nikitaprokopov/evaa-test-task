import { cn } from "~/libs/tailwind/utils";

import { ProfitCalculatorModelProvider } from "./model/profit-calculator-model-provider";
import { ProfitTabs } from "./profit-tabs";

interface IProfitCalculatorProps {
  className?: string;
}

export function ProfitCalculator({ className }: IProfitCalculatorProps) {
  return (
    <ProfitCalculatorModelProvider>
      <div className={cn(className)}>
        <ProfitTabs />
      </div>
    </ProfitCalculatorModelProvider>
  );
}
