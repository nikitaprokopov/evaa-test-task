import { exhaustiveCheck } from "~/utils/exhaustive-check";
// import JusdcIcon from "~/icons/jusdc.svg?react";
// import JusdtIcon from "~/icons/jusdt.svg?react";
import SttonIcon from "~/icons/stton.svg?react";
import TonIcon from "~/icons/ton.svg?react";

import { SUPPORTED_ASSET_NAMES } from "../../model/profit-calculator-assets";

interface ITokenIconProps {
  assetName: (typeof SUPPORTED_ASSET_NAMES)[keyof typeof SUPPORTED_ASSET_NAMES];
}

const ICON_CLASSES = "size-8";

export function TokenIcon({ assetName }: ITokenIconProps) {
  switch (assetName) {
    // case SUPPORTED_ASSET_NAMES.JUSDC:
    //   return <JusdcIcon className={ICON_CLASSES} />;

    // case SUPPORTED_ASSET_NAMES.JUSDT:
    //   return <JusdtIcon className={ICON_CLASSES} />;

    case SUPPORTED_ASSET_NAMES.STTON:
      return <SttonIcon className={ICON_CLASSES} />;

    case SUPPORTED_ASSET_NAMES.TON:
      return <TonIcon className={ICON_CLASSES} />;

    default:
      exhaustiveCheck(assetName);
  }
}
