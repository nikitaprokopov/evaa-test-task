import { reatomBoolean, reatomString, reatomEnum, action, atom } from "@reatom/framework";
import { createContext, useContext } from "react";
import BigJs from "big.js";

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
  const amountInputValueAtom = reatomString("0.00", "amountInputValueAtom");

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
        usd: new BigJs(amountInputValue),
        assetId: activeToken.assetId,
        masterData,
        priceData,
      });

      return token;
    }

    const usd = convertTokenToUsd({
      tokenValue: new BigJs(amountInputValue),
      assetId: activeToken.assetId,
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

    if (apyFromActiveTabAndToken === null) {
      return null;
    }

    const convertedAmount = ctx.spy(convertedAmountAtom);

    if (ctx.spy(isAmountInputValueInUsdAtom) && convertedAmount !== null) {
      return getTokenMonthlyPotentialReturn({
        apy: new BigJs(apyFromActiveTabAndToken),
        amount: convertedAmount,
      });
    }

    const amountInputValue = ctx.spy(amountInputValueAtom);

    return getTokenMonthlyPotentialReturn({
      apy: new BigJs(apyFromActiveTabAndToken),
      amount: new BigJs(amountInputValue),
    });
  }, "potentialTokenReturnAmountAtom");

  const potentialReturnAmountInUsdAtom = atom((ctx) => {
    const potentialTokenReturnAmount = ctx.spy(potentialTokenReturnAmountAtom);
    const masterData = ctx.spy(evaaModel.masterDataResource.dataAtom);
    const priceData = ctx.spy(evaaModel.priceDataResource.dataAtom);

    if (!masterData || !priceData || potentialTokenReturnAmount === null) {
      return null;
    }

    return convertTokenToUsd({
      assetId: ctx.spy(activeTokenAtom).assetId,
      tokenValue: potentialTokenReturnAmount,
      masterData,
      priceData,
    });
  }, "potentialReturnAmountInUsdAtom");

  const onCurrencyToggleAction = action((ctx) => {
    const convertedAmount = ctx.get(convertedAmountAtom);

    if (convertedAmount !== null) {
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
