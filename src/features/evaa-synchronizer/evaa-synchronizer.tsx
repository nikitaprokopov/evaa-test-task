import { reatomComponent } from "@reatom/npm-react";

import { useEvaaModel } from "~/models/evaa-model/evaa-model";
import { useEffectOnce } from "~/hooks/use-effect-once";

export const EvaaSynchronizer = reatomComponent(({ ctx }) => {
  const evaaModel = useEvaaModel();

  useEffectOnce(() => {
    void evaaModel.syncEvaaAction(ctx);
  });

  return null;
}, "EvaaSynchronizer");
