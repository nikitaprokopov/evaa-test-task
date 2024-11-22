import { reatomContext } from "@reatom/npm-react";
import { ReactNode } from "react";

import { reatomCtx } from "./reatom-ctx";

interface IReatomProviderProps {
  children: ReactNode;
}

export function ReatomProvider({ children }: IReatomProviderProps) {
  return <reatomContext.Provider value={reatomCtx}>{children}</reatomContext.Provider>;
}
