xenonDS/packages/ui-web/src/components/form/FormField.tsx
import React, { ReactNode } from "react";
import { useFormContext } from "./Form";
import { cn } from "../../utils/cn";

interface FormFieldProps {
  name: string;
  label: string;
  children: ReactNode;
  description?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  children,
  description,
  className,
}) => {
  const { errors, touched } = useFormContext();
  const error = touched[name] && errors[name];

  return (
    <div className={cn("mb-4", className)}>
      <label
        htmlFor={name}
        className="block mb-1 font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
      {error && (
        <div className="mt-1">
          <span className="text-destructive text-sm" role="alert" aria-live="polite">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};
