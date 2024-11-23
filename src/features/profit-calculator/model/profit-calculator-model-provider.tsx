import { type ReactNode } from "react";

import { useEvaaModel } from "~/models/evaa-model/evaa-model";
import { useMemoOnce } from "~/hooks/use-memo-once";

import { ModelContext, createModel } from "./profit-calculator-model";

interface IProps {
  children: ReactNode;
}

export function ProfitCalculatorModelProvider({ children }: IProps) {
  const evaaModel = useEvaaModel();
  const model = useMemoOnce(() => createModel({ evaaModel }));
  return <ModelContext.Provider value={model}>{children}</ModelContext.Provider>;
}
