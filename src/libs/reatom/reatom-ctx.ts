import { connectDevtools } from "@reatom/devtools";
import { connectLogger } from "@reatom/logger";
import { createCtx } from "@reatom/framework";

export const reatomCtx = createCtx();

if (import.meta.env.DEV) {
  connectLogger(reatomCtx);
  connectDevtools(reatomCtx);
}
