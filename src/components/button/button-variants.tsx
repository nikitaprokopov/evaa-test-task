import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.95]",
  {
    variants: {
      variant: {
        outline: "border border-input border-primary bg-background text-foreground hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-primary",
        navItem: "gap-0.5 flex-col py-0 px-3 text-[0.6875rem] hover:bg-transparent hover:opacity-90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        link: "text-primary underline-offset-4 hover:underline",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        card: "bg-accent text-accent-foreground",
        active: "text-primary hover:bg-accent",
      },

      size: {
        lg: "h-11 rounded-md px-8",
        default: "h-12 px-5 py-2",
        sm: "h-8 rounded-md px-3",
        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type TButtonVariants = VariantProps<typeof buttonVariants>;
