import React, { forwardRef } from "react";
import { useFormContext } from "./Form";
import { cn } from "../../utils/cn";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, variant = "default", size = "md", className, ...props }, ref) => {
    const {
      values,
      setFieldValue,
      setFieldTouched,
      validateField,
    } = useFormContext();

    return (
      <input
        id={name}
        name={name}
        ref={ref}
        value={values[name] ?? ""}
        onChange={(e) => setFieldValue(name, e.target.value)}
        onBlur={() => {
          setFieldTouched(name, true);
          validateField(name);
        }}
        className={cn(
          "block w-full rounded border px-3 py-2 bg-background text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring",
          variant === "outline" ? "border-border" : "border-transparent",
          size === "sm" && "text-sm py-1",
          size === "lg" && "text-lg py-3",
          className
        )}
        {...props}
      />
    );
  }
);
FormInput.displayName = "FormInput";
