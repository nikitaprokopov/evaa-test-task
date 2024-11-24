import { ProfitInToken } from "./profit-in-token";
import { ProfitButton } from "./profit-button";
import { ProfitInUsd } from "./profit-in-usd";

export function ProfitWidget() {
  return (
    <div className="mx-2 flex flex-wrap items-end gap-x-3 gap-y-5 rounded-3xl bg-hero px-5 py-7 noise">
      <div className="mr-auto">
        <p className="mb-1 font-medium text-white">Potential Return</p>

        <div className="min-h-12">
          <ProfitInToken />
          <ProfitInUsd />
        </div>
      </div>

      <ProfitButton />
    </div>
  );
}
