import { ProfitCalculator } from "~/features/profit-calculator";
import { ReatomProvider } from "~/libs/reatom";

export function App() {
  return (
    <ReatomProvider>
      <div className="mx-auto h-screen max-w-[390px]">
        <ProfitCalculator />
      </div>
    </ReatomProvider>
  );
}
