import { createContext, useContext } from "react";
import { reatomEnum } from "@reatom/framework";

export const TABS_VALUES = {
  SUPPLY: "SUPPLY",
  BORROW: "BORROW",
} as const;

export function createModel() {
  const activeTabValueAtom = reatomEnum([TABS_VALUES.SUPPLY, TABS_VALUES.BORROW], "activeTabValueAtom");

  return {
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
