import {
  withStatusesAtom,
  reatomResource,
  withErrorAtom,
  reatomBoolean,
  withDataAtom,
  reatomAsync,
  atom,
} from "@reatom/framework";
import { createContext, useContext } from "react";
import { getPrices } from "@evaafi/sdk";

import { evaaContract } from "./evaa-contract";

export function createModel() {
  const isEvaaInitializedAtom = reatomBoolean(false, "isEvaaInitializedAtom");

  const syncEvaaAction = reatomAsync(async (ctx) => {
    await ctx.schedule(() => evaaContract.getSync());
    isEvaaInitializedAtom.setTrue(ctx);
  }, "syncEvaaAction").pipe(withStatusesAtom(), withErrorAtom());

  const priceDataResource = reatomResource(async (ctx) => {
    if (!ctx.spy(isEvaaInitializedAtom)) {
      return null;
    }

    return ctx.schedule(() => getPrices());
  }, "priceDataResource").pipe(withDataAtom(null));

  const masterDataAtom = atom((ctx) => {
    if (!ctx.spy(isEvaaInitializedAtom)) {
      return null;
    }

    if (!evaaContract.data) {
      throw new Error("evaaContract.data should exist");
    }

    return evaaContract.data;
  }, "masterDataAtom");

  return {
    priceDataResource,
    masterDataAtom,
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
