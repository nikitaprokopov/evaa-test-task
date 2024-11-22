import { cn } from "~/libs/tailwind/utils";

interface IProfitCalculatorProps {
  className?: string;
}

export function ProfitCalculator({ className }: IProfitCalculatorProps) {
  return <div className={cn(className)}>Hello World!</div>;
}
