import { EvaaModelProvider } from "~/models/evaa-model/evaa-model-provider";
import { ProfitCalculator } from "~/features/profit-calculator";
import { ReatomProvider } from "~/libs/reatom";

export function App() {
  return (
    <ReatomProvider>
      <EvaaModelProvider>
        <div className="mx-auto h-screen max-w-lg">
          <ProfitCalculator className="h-full" />
        </div>
      </EvaaModelProvider>
    </ReatomProvider>
  );
}
