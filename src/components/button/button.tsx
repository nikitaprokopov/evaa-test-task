import { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "~/libs/tailwind/utils";

import { TButtonVariants, buttonVariants } from "./button-variants";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TButtonVariants {
  asChild?: boolean;
}

export function Button({ asChild = false, className, variant, size, ...props }: IButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ className, variant, size }))} {...props} />;
}

Button.displayName = "Button";
