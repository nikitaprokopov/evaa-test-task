import { type ReactNode } from "react";

import { useMemoOnce } from "~/hooks/use-memo-once";

import { ModelContext, createModel } from "./profit-calculator-model";

interface IProps {
  children: ReactNode;
}

export function ProfitCalculatorModelProvider({ children }: IProps) {
  const model = useMemoOnce(createModel);
  return <ModelContext.Provider value={model}>{children}</ModelContext.Provider>;
}
