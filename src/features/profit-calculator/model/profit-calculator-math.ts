import { MasterData, PriceData } from "@evaafi/sdk";

interface IGetPriceOfOneTonInUsdProps {
  masterData: MasterData;
  priceData: PriceData;
  assetId: bigint;
}

const getPriceOfOneTokenInUsd = ({ masterData, priceData, assetId }: IGetPriceOfOneTonInUsdProps) => {
  const assetConfig = masterData.assetsConfig.get(assetId);
  const tokenPrice = priceData.dict.get(assetId);

  if (!tokenPrice) {
    return null;
  }

  if (!assetConfig) {
    return null;
  }

  return Number(tokenPrice) / 10 ** Number(assetConfig.decimals);
};

interface IConvertTokenToUsd extends IGetPriceOfOneTonInUsdProps {
  tokenValue: string;
}

export const convertTokenToUsd = ({ masterData, tokenValue, priceData, assetId }: IConvertTokenToUsd) => {
  const priceOfOneToken = getPriceOfOneTokenInUsd({ masterData, priceData, assetId });

  if (priceOfOneToken === null) {
    return null;
  }

  return Number(tokenValue) * priceOfOneToken;
};

interface IConvertUsdToToken extends IGetPriceOfOneTonInUsdProps {
  usd: string;
}

export const convertUsdToToken = ({ masterData, priceData, assetId, usd }: IConvertUsdToToken) => {
  const priceOfOneToken = getPriceOfOneTokenInUsd({ masterData, priceData, assetId });

  if (priceOfOneToken === null) {
    return null;
  }

  return Number(usd) / priceOfOneToken;
};

interface IGetMonthlyPotentialReturn {
  amount: number;
  apy: number;
}

export const getTokenMonthlyPotentialReturn = ({ amount, apy }: IGetMonthlyPotentialReturn) => {
  return amount * (1 + apy / 12);
};
