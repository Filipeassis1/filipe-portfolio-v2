import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import "./button.css";

export const buttonVariants = cva("ds-button", {
  variants: {
    variant: {
      primary: "ds-button--primary",
      secondary: "ds-button--secondary",
      ghost: "ds-button--ghost",
      outline: "ds-button--outline",
      destructive: "ds-button--destructive",
      link: "ds-button--link"
    },
    size: {
      xs: "ds-button--xs",
      sm: "ds-button--sm",
      md: "ds-button--md",
      lg: "ds-button--lg",
      icon: "ds-button--icon",
      "icon-sm": "ds-button--icon-sm",
      "icon-lg": "ds-button--icon-lg"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      iconStart,
      iconEnd,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    const isIconOnly = (size === "icon" || size === "icon-sm" || size === "icon-lg") && !children;

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size }), loading && "ds-button--loading", className)}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={asChild && isDisabled ? true : undefined}
        aria-busy={loading || undefined}
        data-icon-only={isIconOnly || undefined}
        {...props}
      >
        {loading ? <span className="ds-button__spinner" aria-hidden="true" /> : null}
        <span className="ds-button__content">
          {iconStart}
          {children}
          {iconEnd}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";
