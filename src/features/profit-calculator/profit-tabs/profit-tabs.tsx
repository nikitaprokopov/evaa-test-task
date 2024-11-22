import { reatomComponent } from "@reatom/npm-react";

import { TabsTrigger, TabsList, Tabs } from "~/components/tabs";

import { useProfitCalculatorModel, TABS_VALUES } from "../model/profit-calculator-model";

export const ProfitTabs = reatomComponent(({ ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeTabValue = ctx.spy(profitCalculatorModel.activeTabValueAtom);

  return (
    <Tabs value={activeTabValue}>
      <TabsList className="w-full">
        <TabsTrigger
          onClick={() => profitCalculatorModel.activeTabValueAtom(ctx, TABS_VALUES.SUPPLY)}
          value={TABS_VALUES.SUPPLY}
          className="w-full"
        >
          Supply
        </TabsTrigger>

        <TabsTrigger
          onClick={() => profitCalculatorModel.activeTabValueAtom(ctx, TABS_VALUES.BORROW)}
          value={TABS_VALUES.BORROW}
          className="w-full"
        >
          Borrow
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}, "ProfitTabs");
