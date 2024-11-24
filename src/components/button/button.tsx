import { ImpactHapticFeedbackStyle, hapticFeedback } from "@telegram-apps/sdk-react";
import { ButtonHTMLAttributes, MouseEvent } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "~/libs/tailwind/utils";

import { TButtonVariants, buttonVariants } from "./button-variants";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TButtonVariants {
  hapticFeedbackStyle?: ImpactHapticFeedbackStyle;
  asChild?: boolean;
}

export function Button({
  hapticFeedbackStyle = "light",
  asChild = false,
  className,
  variant,
  onClick,
  size,
  ...props
}: IButtonProps) {
  const Component = asChild ? Slot : "button";

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (hapticFeedback.isSupported() && hapticFeedback.impactOccurred.isAvailable()) {
      hapticFeedback.impactOccurred(hapticFeedbackStyle);
    }

    onClick?.(e);
  };

  return <Component className={cn(buttonVariants({ className, variant, size }))} onClick={handleClick} {...props} />;
}

Button.displayName = "Button";
