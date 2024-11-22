import { withStatusesAtom, withErrorAtom, reatomAsync } from "@reatom/framework";
import { createContext, useContext } from "react";

import { evaaContract } from "./evaa-contract";

export function createModel() {
  const syncEvaaAction = reatomAsync(async (ctx) => {
    await ctx.schedule(() => evaaContract.getSync());
  }, "syncEvaaAction").pipe(withStatusesAtom(), withErrorAtom());

  return {
    syncEvaaAction,
  };
}

export const ModelContext = createContext<ReturnType<typeof createModel> | null>(null);

export function useEvaaModel() {
  const model = useContext(ModelContext);

  if (model === null) {
    throw new Error("useContext must be used within a ModelProvider");
  }

  return model;
}
