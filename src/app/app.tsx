import { EvaaModelProvider } from "~/models/evaa-model/evaa-model-provider";
import { EvaaSynchronizer } from "~/features/evaa-synchronizer";
import { ProfitCalculator } from "~/features/profit-calculator";
import { ReatomProvider } from "~/libs/reatom";

export function App() {
  return (
    <ReatomProvider>
      <EvaaModelProvider>
        <div className="mx-auto h-screen max-w-[390px]">
          <ProfitCalculator />
        </div>

        <EvaaSynchronizer />
      </EvaaModelProvider>
    </ReatomProvider>
  );
}
