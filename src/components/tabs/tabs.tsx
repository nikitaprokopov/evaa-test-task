import { ComponentPropsWithoutRef, ElementRef, forwardRef, MouseEvent } from "react";
import { ImpactHapticFeedbackStyle, hapticFeedback } from "@telegram-apps/sdk-react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "~/libs/tailwind/utils";

import { TTabTriggerVariants, tabTriggerVariants, TTabListVariants, tabListVariants } from "./tabs-variants";

export const Tabs = TabsPrimitive.Root;

interface ITabListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List>, TTabListVariants {}

export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, ITabListProps>(
  ({ className, size, ...props }, ref) => (
    <TabsPrimitive.List className={cn(tabListVariants({ size }), className)} ref={ref} {...props} />
  ),
);

interface ITabTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, TTabTriggerVariants {
  hapticFeedbackStyle?: ImpactHapticFeedbackStyle;
}

export const TabsTrigger = forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, ITabTriggerProps>(
  ({ hapticFeedbackStyle = "light", className, onClick, size, ...props }, ref) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (hapticFeedback.isSupported() && hapticFeedback.impactOccurred.isAvailable()) {
        hapticFeedback.impactOccurred(hapticFeedbackStyle);
      }

      onClick?.(e);
    };

    return (
      <TabsPrimitive.Trigger
        className={cn(tabTriggerVariants({ size }), className)}
        onClick={handleClick}
        ref={ref}
        {...props}
      />
    );
  },
);

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    ref={ref}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
TabsContent.displayName = TabsPrimitive.Content.displayName;
TabsList.displayName = TabsPrimitive.List.displayName;
