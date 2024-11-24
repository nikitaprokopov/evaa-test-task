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
    return <div className="h-[14px]" />;
  }

  return (
    <p className="animate-fade-in flex h-[14px] items-center justify-center gap-2 text-sm">
      <TokenApyText />
      <TokenApyNumber assetId={assetId} />
    </p>
  );
}, "TokenApy");
