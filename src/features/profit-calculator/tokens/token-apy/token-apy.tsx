import { reatomComponent } from "@reatom/npm-react";

import { useEvaaModel } from "~/models/evaa-model/evaa-model";

import { TokenApyNumber } from "./token-apy-number";
import { TokenApyText } from "./token-apy-text";

interface ITokenApyProps {
  assetId: bigint;
}

export const TokenApy = reatomComponent<ITokenApyProps>(({ assetId, ctx }) => {
  const evaaModel = useEvaaModel();
  const masterData = ctx.spy(evaaModel.masterDataResource.dataAtom);

  if (!masterData) {
    return <p className="h-[14px] opacity-0 transition-opacity" />;
  }

  return (
    <p className="flex h-[14px] items-center justify-center gap-2 text-sm opacity-100 transition-opacity">
      <TokenApyText />
      <TokenApyNumber assetId={assetId} />
    </p>
  );
}, "TokenApy");
