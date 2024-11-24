import { EvaaModelProvider } from "~/models/evaa-model/evaa-model-provider";
import { ProfitCalculator } from "~/features/profit-calculator";
import { ReatomProvider } from "~/libs/reatom";

export function App() {
  return (
    <ReatomProvider>
      <EvaaModelProvider>
        <div className="animate-fade-in h-dvh bg-master noise">
          <ProfitCalculator className="mx-auto max-w-lg" />
        </div>
      </EvaaModelProvider>
    </ReatomProvider>
  );
}
