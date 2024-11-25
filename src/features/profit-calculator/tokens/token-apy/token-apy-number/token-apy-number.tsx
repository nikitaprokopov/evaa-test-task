import { reatomComponent } from "@reatom/npm-react";
import BigJs from "big.js";

import { useProfitCalculatorModel, TABS_VALUES } from "~/features/profit-calculator/model/profit-calculator-model";
import { useEvaaModel } from "~/models/evaa-model/evaa-model";
import { exhaustiveCheck } from "~/utils/exhaustive-check";

interface ITokenApyNumberProps {
  assetId: bigint;
}

function roundTo2DecimalPlaces(apy: number): string {
  const numberPercent = new BigJs(apy).times(100);
  return `${numberPercent.toFixed(2)}%`;
}

export const TokenApyNumber = reatomComponent<ITokenApyNumberProps>(({ assetId, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const evaaModel = useEvaaModel();

  const activeTabValue = ctx.spy(profitCalculatorModel.activeTabValueAtom);
  const masterData = ctx.spy(evaaModel.masterDataResource.dataAtom);

  if (!masterData) {
    throw new Error("masterData should exist");
  }

  const getText = () => {
    const assetData = masterData.assetsData.get(assetId);

    if (!assetData) {
      return null;
    }

    switch (activeTabValue) {
      case TABS_VALUES.SUPPLY:
        return roundTo2DecimalPlaces(assetData.supplyApy);

      case TABS_VALUES.BORROW:
        return roundTo2DecimalPlaces(assetData.borrowApy);

      default:
        exhaustiveCheck(activeTabValue);
    }
  };

  return (
    <span className="font-black text-white" data-testid="token-apy-number">
      {getText()}
    </span>
  );
}, "TokenApyNumber");
