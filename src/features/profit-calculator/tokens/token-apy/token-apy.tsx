import { reatomComponent } from "@reatom/npm-react";

import { useEvaaModel } from "~/models/evaa-model/evaa-model";
import { cn } from "~/libs/tailwind/utils";

import { TokenApyNumber } from "./token-apy-number";
import { TokenApyText } from "./token-apy-text";

interface ITokenApyProps {
  assetId: bigint;
}

export const TokenApy = reatomComponent<ITokenApyProps>(({ assetId, ctx }) => {
  const evaaModel = useEvaaModel();
  const masterData = ctx.spy(evaaModel.masterDataResource.dataAtom);

  return (
    <p
      className={cn(
        "flex h-[14px] items-center justify-center gap-2 text-sm opacity-0 transition-opacity",
        masterData && "opacity-100",
      )}
    >
      {masterData && (
        <>
          <TokenApyText />
          <TokenApyNumber assetId={assetId} />
        </>
      )}
    </p>
  );
}, "TokenApy");
