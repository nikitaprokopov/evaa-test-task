import { TESTNET_POOL_CONFIG } from "@evaafi/sdk";
import { z } from "zod";

export const SUPPORTED_ASSET_NAMES = {
  STTON: "stTON",
  TON: "TON",
} as const;

const ZAssetSchema = z.object({
  name: z.union([z.literal(SUPPORTED_ASSET_NAMES.STTON), z.literal(SUPPORTED_ASSET_NAMES.TON)]),
  assetId: z.bigint(),
});

export const SUPPORTED_ASSETS = TESTNET_POOL_CONFIG.poolAssetsConfig
  .filter((asset) => ZAssetSchema.safeParse(asset).success)
  .map((asset) => ZAssetSchema.parse(asset));
