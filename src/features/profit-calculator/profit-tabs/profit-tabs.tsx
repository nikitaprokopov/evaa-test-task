import { reatomComponent } from "@reatom/npm-react";

import { TabsTrigger, TabsList, Tabs } from "~/components/tabs";

import { useProfitCalculatorModel, TABS_VALUES } from "../model/profit-calculator-model";

interface IProfitTabsProps {
  className?: string;
}

export const ProfitTabs = reatomComponent<IProfitTabsProps>(({ className, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeTabValue = ctx.spy(profitCalculatorModel.activeTabValueAtom);

  return (
    <div className={className}>
      <Tabs value={activeTabValue}>
        <TabsList className="w-full">
          <TabsTrigger
            onClick={() => profitCalculatorModel.activeTabValueAtom(ctx, TABS_VALUES.SUPPLY)}
            value={TABS_VALUES.SUPPLY}
            data-testid="supply-tab"
            className="w-full"
          >
            Supply
          </TabsTrigger>

          <TabsTrigger
            onClick={() => profitCalculatorModel.activeTabValueAtom(ctx, TABS_VALUES.BORROW)}
            value={TABS_VALUES.BORROW}
            data-testid="borrow-tab"
            className="w-full"
          >
            Borrow
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}, "ProfitTabs");
