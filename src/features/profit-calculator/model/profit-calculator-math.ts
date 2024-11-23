import { MasterData, PriceData } from "@evaafi/sdk";

interface IGetPriceOfOneTonInUsdProps {
  masterData: MasterData;
  priceData: PriceData;
  assetId: bigint;
}

const getPriceOfOneTonInUsd = ({ masterData, priceData, assetId }: IGetPriceOfOneTonInUsdProps) => {
  const assetConfig = masterData.assetsConfig.get(assetId);
  const tonPrice = priceData.dict.get(assetId);

  if (!tonPrice) {
    throw new Error("tonPrice should exist");
  }

  if (!assetConfig) {
    throw new Error("assetConfig should exist");
  }

  return Number(tonPrice) / 10 ** Number(assetConfig.decimals);
};

interface IConvertTonToUsd extends IGetPriceOfOneTonInUsdProps {
  ton: string;
}

export const convertTonToUsd = ({ masterData, priceData, assetId, ton }: IConvertTonToUsd) => {
  return Number(ton) * getPriceOfOneTonInUsd({ masterData, priceData, assetId });
};

interface IConvertUsdToTon extends IGetPriceOfOneTonInUsdProps {
  usd: string;
}

export const convertUsdToTon = ({ masterData, priceData, assetId, usd }: IConvertUsdToTon) => {
  return Number(usd) / getPriceOfOneTonInUsd({ masterData, priceData, assetId });
};
