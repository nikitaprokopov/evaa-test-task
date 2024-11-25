import { MasterData, PriceData } from "@evaafi/sdk";
import BigJs from "big.js";

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

  return new BigJs(Number(tokenPrice)).div(new BigJs(10).pow(Number(assetConfig.decimals)));
};

interface IConvertTokenToUsd extends IGetPriceOfOneTonInUsdProps {
  tokenValue: BigJs.Big;
}

export const convertTokenToUsd = ({ masterData, tokenValue, priceData, assetId }: IConvertTokenToUsd) => {
  const priceOfOneToken = getPriceOfOneTokenInUsd({ masterData, priceData, assetId });

  if (priceOfOneToken === null) {
    return null;
  }

  return tokenValue.times(priceOfOneToken);
};

interface IConvertUsdToToken extends IGetPriceOfOneTonInUsdProps {
  usd: BigJs.Big;
}

export const convertUsdToToken = ({ masterData, priceData, assetId, usd }: IConvertUsdToToken) => {
  const priceOfOneToken = getPriceOfOneTokenInUsd({ masterData, priceData, assetId });

  if (priceOfOneToken === null) {
    return null;
  }

  return usd.div(priceOfOneToken);
};

interface IGetMonthlyPotentialReturn {
  amount: BigJs.Big;
  apy: BigJs.Big;
}

export const getTokenMonthlyPotentialReturn = ({ amount, apy }: IGetMonthlyPotentialReturn) => {
  return amount.times(apy.div(12).plus(1));
};
