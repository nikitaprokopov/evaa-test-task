import { withStatusesAtom, reatomResource, withErrorAtom, withDataAtom } from "@reatom/framework";
import { createContext, useContext } from "react";
import { getPrices } from "@evaafi/sdk";

import { evaaContract } from "./evaa-contract";

export function createModel() {
  const syncEvaaResource = reatomResource(async (ctx) => {
    await ctx.schedule(() => evaaContract.getSync());
  }, "syncEvaaResource").pipe(withStatusesAtom(), withErrorAtom());

  const masterDataResource = reatomResource(async (ctx) => {
    const syncEvaaPromise = ctx.spy(syncEvaaResource.promiseAtom);
    await ctx.schedule(() => syncEvaaPromise);

    if (!evaaContract.data) {
      throw new Error("evaaContract.data should exist");
    }

    return evaaContract.data;
  }, "masterDataResource").pipe(withDataAtom(null), withStatusesAtom());

  const priceDataResource = reatomResource(async (ctx) => {
    const syncEvaaPromise = ctx.spy(syncEvaaResource.promiseAtom);
    await ctx.schedule(() => syncEvaaPromise);
    return ctx.schedule(() => getPrices());
  }, "priceDataResource").pipe(withDataAtom(null));

  return {
    masterDataResource,
    priceDataResource,
    syncEvaaResource,
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
