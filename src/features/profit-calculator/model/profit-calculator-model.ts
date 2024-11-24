import { reatomBoolean, reatomString, reatomEnum, action, atom } from "@reatom/framework";
import { createContext, useContext } from "react";

import { useEvaaModel } from "~/models/evaa-model/evaa-model";
import { exhaustiveCheck } from "~/utils/exhaustive-check";

import { getTokenMonthlyPotentialReturn, convertTokenToUsd, convertUsdToToken } from "./profit-calculator-math";
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

    if (!masterData || !priceData) {
      return null;
    }

    const amountInputValue = ctx.spy(amountInputValueAtom);
    const activeToken = ctx.spy(activeTokenAtom);

    if (ctx.spy(isAmountInputValueInUsdAtom)) {
      const token = convertUsdToToken({
        assetId: activeToken.assetId,
        usd: amountInputValue,
        masterData,
        priceData,
      });

      return token;
    }

    const usd = convertTokenToUsd({
      assetId: activeToken.assetId,
      tokenValue: amountInputValue,
      masterData,
      priceData,
    });

    return usd;
  }, "convertedAmountAtom");

  const apyFromActiveTabAndTokenAtom = atom((ctx) => {
    const masterData = ctx.spy(evaaModel.masterDataResource.dataAtom);
    const activeToken = ctx.spy(activeTokenAtom);

    const assetData = masterData?.assetsData.get(activeToken.assetId);

    if (!assetData) {
      return null;
    }

    const activeTabValue = ctx.spy(activeTabValueAtom);

    switch (activeTabValue) {
      case TABS_VALUES.SUPPLY:
        return assetData.supplyApy;

      case TABS_VALUES.BORROW:
        return assetData.borrowApy;

      default:
        exhaustiveCheck(activeTabValue);
    }
  }, "apyFromActiveTabAndTokenAtom");

  const potentialTokenReturnAmountAtom = atom((ctx) => {
    const apyFromActiveTabAndToken = ctx.spy(apyFromActiveTabAndTokenAtom);
    const amountInputValue = ctx.spy(amountInputValueAtom);
    const convertedAmount = ctx.spy(convertedAmountAtom);

    if (apyFromActiveTabAndToken === null) {
      return null;
    }

    if (ctx.spy(isAmountInputValueInUsdAtom) && convertedAmount) {
      return getTokenMonthlyPotentialReturn({
        apy: apyFromActiveTabAndToken,
        amount: convertedAmount,
      });
    }

    return getTokenMonthlyPotentialReturn({
      amount: Number(amountInputValue),
      apy: apyFromActiveTabAndToken,
    });
  }, "potentialTokenReturnAmountAtom");

  const potentialReturnAmountInUsdAtom = atom((ctx) => {
    const potentialTokenReturnAmount = ctx.spy(potentialTokenReturnAmountAtom);
    const masterData = ctx.spy(evaaModel.masterDataResource.dataAtom);
    const priceData = ctx.spy(evaaModel.priceDataResource.dataAtom);

    if (!masterData || !priceData || potentialTokenReturnAmount === null) {
      return null;
    }

    const usd = convertTokenToUsd({
      tokenValue: String(potentialTokenReturnAmount),
      assetId: ctx.spy(activeTokenAtom).assetId,
      masterData,
      priceData,
    });

    return usd;
  }, "potentialReturnAmountInUsdAtom");

  const onCurrencyToggleAction = action((ctx) => {
    const amountInputValue = ctx.get(amountInputValueAtom);
    const convertedAmount = ctx.get(convertedAmountAtom);

    if (convertedAmount !== null && amountInputValue) {
      amountInputValueAtom(ctx, convertedAmount.toFixed(2));
    }

    isAmountInputValueInUsdAtom.toggle(ctx);
  }, "onCurrencyToggleAction");

  return {
    potentialReturnAmountInUsdAtom,
    potentialTokenReturnAmountAtom,
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
