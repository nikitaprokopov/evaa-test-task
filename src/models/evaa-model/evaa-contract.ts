import { TESTNET_POOL_CONFIG, Evaa } from "@evaafi/sdk";
import { TonClient } from "@ton/ton";

import { ENV } from "~/env";

const tonClient = new TonClient({
  endpoint: ENV.VITE_TON_CLIENT_ENDPOINT,
  apiKey: ENV.VITE_RPC_API_KEY,
});

export const evaaContract = tonClient.open(new Evaa({ poolConfig: TESTNET_POOL_CONFIG }));
