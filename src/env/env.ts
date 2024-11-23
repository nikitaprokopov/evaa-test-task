import { z } from "zod";

const ZEnvSchema = z.object({
  VITE_TON_CLIENT_ENDPOINT: z.string(),
  VITE_RPC_API_KEY: z.string(),
  DEV: z.boolean(),
});

export const ENV = ZEnvSchema.parse(import.meta.env);
