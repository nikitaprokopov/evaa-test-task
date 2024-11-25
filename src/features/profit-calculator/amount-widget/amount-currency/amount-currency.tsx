import { useLayoutEffect, CSSProperties, RefObject } from "react";
import { reatomComponent, useAtom } from "@reatom/npm-react";
import useResizeObserver from "@react-hook/resize-observer";

import { useProfitCalculatorModel } from "../../model/profit-calculator-model";

const GAP_BETWEEN_CURRENCY_AND_INPUT = 10;

interface IAmountCurrencyProps {
  inputRef: RefObject<HTMLInputElement>;
}

function useRerenderOnElementResize(ref: IAmountCurrencyProps["inputRef"]) {
  const [, setSize] = useAtom<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current.getBoundingClientRect());
    }
  }, [setSize, ref]);

  useResizeObserver(ref, (entry) => setSize(entry.contentRect));
}

export const AmountCurrency = reatomComponent<IAmountCurrencyProps>(({ inputRef, ctx }) => {
  useRerenderOnElementResize(inputRef);

  const profitCalculatorModel = useProfitCalculatorModel();

  const isAmountInputValueInUsd = ctx.spy(profitCalculatorModel.isAmountInputValueInUsdAtom);
  const amountInputValue = ctx.spy(profitCalculatorModel.amountInputValueAtom);
  const activeToken = ctx.spy(profitCalculatorModel.activeTokenAtom);

  if (amountInputValue === "") {
    return null;
  }

  const getText = () => {
    if (isAmountInputValueInUsd) {
      return "USD";
    }

    return activeToken.name;
  };

  const calculateTextWidth = () => {
    if (!inputRef.current) {
      return undefined;
    }

    const inputStyles = window.getComputedStyle(inputRef.current);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("context should exist");
    }

    context.font = `${inputStyles.fontSize} ${inputStyles.fontFamily}`;
    return context.measureText(amountInputValue).width;
  };

  const calculateStyle = (): CSSProperties | undefined => {
    const textWidth = calculateTextWidth();

    if (!inputRef.current || !textWidth) {
      return undefined;
    }

    const inputStyles = window.getComputedStyle(inputRef.current);
    const inputRect = inputRef.current.getBoundingClientRect();

    const paddingLeft = parseFloat(inputStyles.paddingLeft);

    const borderX = parseFloat(inputStyles.borderLeftWidth) + parseFloat(inputStyles.borderRightWidth);
    const paddingX = paddingLeft + parseFloat(inputStyles.paddingRight);
    const inputWidth = inputRect.width - paddingX - borderX;

    if (textWidth >= inputWidth) {
      return { left: `${String(paddingLeft + inputWidth + GAP_BETWEEN_CURRENCY_AND_INPUT)}px` };
    }

    return { left: `${String(paddingLeft + textWidth + GAP_BETWEEN_CURRENCY_AND_INPUT)}px` };
  };

  return (
    <p className="pointer-events-none absolute text-lg font-medium text-white" style={calculateStyle()}>
      {getText()}
    </p>
  );
}, "AmountCurrency");
