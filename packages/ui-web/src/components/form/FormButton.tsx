import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  ({ variant = "default", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      type={props.type || "button"}
      className={cn(
        "rounded px-4 py-2 font-medium bg-primary text-primary-foreground focus:ring-2 focus:ring-ring transition-colors",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "outline" && "border border-border bg-background text-foreground",
        variant === "destructive" && "bg-destructive text-destructive-foreground",
        size === "sm" && "text-sm py-1",
        size === "lg" && "text-lg py-3",
        className
      )}
      {...props}
    />
  )
);

FormButton.displayName = "FormButton";
