import { reatomComponent } from "@reatom/npm-react";

import { Button } from "~/components/button";
import { cn } from "~/libs/tailwind/utils";

import { useProfitCalculatorModel, TOKENS_VALUES } from "../model/profit-calculator-model";

const BUTTON_OUTLINE_CLASSES = "border-[rgba(255,255,255,0.15)]";
const BUTTON_CLASSES = "h-14 font-medium text-lg rounded-sm";

const BUTTONS = [
  { value: TOKENS_VALUES.TON, text: "TON" },
  { value: TOKENS_VALUES.USDT, text: "USDT" },
] as const;

interface ITokensProps {
  className?: string;
}

export const Tokens = reatomComponent<ITokensProps>(({ className, ctx }) => {
  const profitCalculatorModel = useProfitCalculatorModel();
  const activeTokenValue = ctx.spy(profitCalculatorModel.activeTokenValueAtom);

  const buttons = BUTTONS.map((button) => (
    <Button
      className={cn(BUTTON_CLASSES, button.value !== activeTokenValue && BUTTON_OUTLINE_CLASSES)}
      onClick={() => profitCalculatorModel.activeTokenValueAtom(ctx, button.value)}
      variant={button.value === activeTokenValue ? "default" : "outline"}
      key={button.value}
      type="button"
    >
      {button.text}
    </Button>
  ));

  return <div className={cn("grid grid-cols-2 gap-[10px]", className)}>{buttons}</div>;
}, "Tokens");
