import { connectLogger, createCtx } from "@reatom/framework";

import { ENV } from "~/env";

export const reatomCtx = createCtx();

if (ENV.DEV) {
  connectLogger(reatomCtx);
}
