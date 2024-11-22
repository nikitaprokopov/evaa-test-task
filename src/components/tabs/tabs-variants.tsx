import { VariantProps, cva } from "class-variance-authority";

export const tabListVariants = cva(
  "inline-flex h-12 items-center justify-center rounded-md bg-tabs p-1 text-tertiary",
  {
    variants: {
      size: {
        default: "h-12",
        sm: "h-[38px]",
      },
    },

    defaultVariants: {
      size: "default",
    },
  },
);

export const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[22px] px-6 py-3 text-sm tracking-wide ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state="active"]:font-black hover:bg-accent',
  {
    variants: {
      size: {
        default: "",
        sm: "h-8",
      },
    },

    defaultVariants: {
      size: "default",
    },
  },
);

export type TTabTriggerVariants = VariantProps<typeof tabTriggerVariants>;
export type TTabListVariants = VariantProps<typeof tabListVariants>;
