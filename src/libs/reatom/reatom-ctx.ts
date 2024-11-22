import { connectDevtools } from "@reatom/devtools";
import { connectLogger } from "@reatom/logger";
import { createCtx } from "@reatom/framework";

import { ENV } from "~/env";

export const reatomCtx = createCtx();

if (ENV.DEV) {
  connectLogger(reatomCtx);
  connectDevtools(reatomCtx);
}
