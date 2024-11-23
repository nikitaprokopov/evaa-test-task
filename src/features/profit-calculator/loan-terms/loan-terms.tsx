import { cn } from "~/libs/tailwind/utils";

interface ILoanTermsProps {
  className?: string;
}

export function LoanTerms({ className }: ILoanTermsProps) {
  return (
    <p className={cn("flex items-center gap-3", className)}>
      <span className="text-sm text-white opacity-50">Loan terms:</span>
      <span className="text-lg font-black text-white">1 MONTH</span>
    </p>
  );
}
