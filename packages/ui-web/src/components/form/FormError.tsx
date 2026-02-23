xenonDS/packages/ui-web/src/components/form/FormError.tsx
import React from "react";
import { useFormContext } from "./Form";

interface FormErrorProps {
  name: string;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ name, className }) => {
  const { errors, touched } = useFormContext();
  if (!touched[name] || !errors[name]) return null;
  return (
    <span
      className={className ?? "text-destructive text-sm"}
      role="alert"
      aria-live="polite"
    >
      {errors[name]}
    </span>
  );
};
