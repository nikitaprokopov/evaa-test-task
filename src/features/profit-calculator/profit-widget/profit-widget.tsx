import { ProfitInToken } from "./profit-in-token";
import { ProfitButton } from "./profit-button";
import { ProfitInUsd } from "./profit-in-usd";

export function ProfitWidget() {
  return (
    <div className="flex items-end rounded-3xl px-5 py-7">
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
