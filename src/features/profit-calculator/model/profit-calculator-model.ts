import { reatomBoolean, reatomString, reatomEnum, action, atom } from "@reatom/framework";
import { createContext, useContext } from "react";

import { convertTonToUsd, convertUsdToTon } from "~/features/profit-calculator/model/profit-calculator-math";
import { useEvaaModel } from "~/models/evaa-model/evaa-model";

import { SUPPORTED_ASSETS } from "./profit-calculator-assets";

export const TABS_VALUES = {
  SUPPLY: "SUPPLY",
  BORROW: "BORROW",
} as const;

function getActiveTokenAtomInitialValue() {
  const [firstAsset] = SUPPORTED_ASSETS;

  if (!firstAsset) {
    throw new Error("at least one asset should exist");
  }

  return firstAsset;
}

interface ICreateModel {
  evaaModel: ReturnType<typeof useEvaaModel>;
}

export function createModel({ evaaModel }: ICreateModel) {
  const activeTabValueAtom = reatomEnum([TABS_VALUES.SUPPLY, TABS_VALUES.BORROW], "activeTabValueAtom");
  const isAmountInputValueInUsdAtom = reatomBoolean(false, "isAmountInputValueInUsdAtom");
  const activeTokenAtom = atom(getActiveTokenAtomInitialValue(), "activeTokenAtom");
  const amountInputValueAtom = reatomString("", "amountInputValueAtom");

  const convertedAmountAtom = atom((ctx) => {
    const masterData = ctx.spy(evaaModel.masterDataResource.dataAtom);
    const priceData = ctx.spy(evaaModel.priceDataResource.dataAtom);
    const amountInputValue = ctx.spy(amountInputValueAtom);
    const activeToken = ctx.spy(activeTokenAtom);

    if (!masterData || !priceData) {
      return null;
    }

    if (ctx.spy(isAmountInputValueInUsdAtom)) {
      const ton = convertUsdToTon({
        assetId: activeToken.assetId,
        usd: amountInputValue,
        masterData,
        priceData,
      });

      return ton;
    }

    const usd = convertTonToUsd({
      assetId: activeToken.assetId,
      ton: amountInputValue,
      masterData,
      priceData,
    });

    return usd;
  }, "convertedAmountAtom");

  const onCurrencyToggleAction = action((ctx) => {
    const amountInputValue = ctx.get(amountInputValueAtom);
    const convertedAmount = ctx.get(convertedAmountAtom);

    if (convertedAmount !== null && amountInputValue) {
      amountInputValueAtom(ctx, convertedAmount.toFixed(2));
    }

    isAmountInputValueInUsdAtom.toggle(ctx);
  }, "onCurrencyToggleAction");

  return {
    isAmountInputValueInUsdAtom,
    onCurrencyToggleAction,
    amountInputValueAtom,
    convertedAmountAtom,
    activeTabValueAtom,
    activeTokenAtom,
  };
}

export const ModelContext = createContext<ReturnType<typeof createModel> | null>(null);

export function useProfitCalculatorModel() {
  const model = useContext(ModelContext);

  if (model === null) {
    throw new Error("useContext must be used within a ModelProvider");
  }

  return model;
}
