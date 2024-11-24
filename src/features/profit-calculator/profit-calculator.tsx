import { ProfitCalculatorModelProvider } from "./model/profit-calculator-model-provider";
import { AmountWidget } from "./amount-widget";
import { ProfitWidget } from "./profit-widget";
import { ProfitTabs } from "./profit-tabs";
import { LoanTerms } from "./loan-terms";
import { Tokens } from "./tokens";

export function ProfitCalculator() {
  return (
    <ProfitCalculatorModelProvider>
      <div className="noise rounded-[36px] bg-master pt-5">
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
