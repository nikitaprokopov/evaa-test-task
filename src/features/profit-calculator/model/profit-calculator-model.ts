import { createContext, useContext } from "react";
import { reatomEnum } from "@reatom/framework";

export const TABS_VALUES = {
  SUPPLY: "SUPPLY",
  BORROW: "BORROW",
} as const;

export const TOKENS_VALUES = {
  USDT: "USDT",
  TON: "TON",
} as const;

export function createModel() {
  const activeTokenValueAtom = reatomEnum([TOKENS_VALUES.TON, TOKENS_VALUES.USDT], "activeTokenValueAtom");
  const activeTabValueAtom = reatomEnum([TABS_VALUES.SUPPLY, TABS_VALUES.BORROW], "activeTabValueAtom");

  return {
    activeTokenValueAtom,
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
