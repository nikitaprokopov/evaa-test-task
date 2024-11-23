import { reatomBoolean, reatomString, reatomEnum } from "@reatom/framework";
import { createContext, useContext } from "react";

import { SUPPORTED_ASSETS } from "./profit-calculator-assets";

export const TABS_VALUES = {
  SUPPLY: "SUPPLY",
  BORROW: "BORROW",
} as const;

export function createModel() {
  const activeTabValueAtom = reatomEnum([TABS_VALUES.SUPPLY, TABS_VALUES.BORROW], "activeTabValueAtom");
  const isCurrentAmountInUsdAtom = reatomBoolean(false, "isCurrentAmountInUsdAtom");
  const amountInputValueAtom = reatomString("", "amountInputValueAtom");

  const activeTokenNameAtom = reatomEnum(
    SUPPORTED_ASSETS.map((asset) => asset.name),
    "activeTokenNameAtom",
  );

  return {
    isCurrentAmountInUsdAtom,
    amountInputValueAtom,
    activeTokenNameAtom,
    activeTabValueAtom,
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
