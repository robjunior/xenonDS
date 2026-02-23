xenonDS/packages/ui-web/src/components/form/Form.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  FormEvent,
} from "react";

type FormValues = Record<string, any>;
type FormErrors = Record<string, string>;

interface FormContextProps {
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string) => void;
  validateForm: () => boolean;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("Form components must be used within <Form>");
  return ctx;
}

interface FormProps {
  initialValues: FormValues;
  validate?: (values: FormValues) => FormErrors;
  onSubmit: (values: FormValues) => void;
  children: ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  initialValues,
  validate,
  onSubmit,
  children,
  className,
}) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldValue = (name: string, value: any) => {
    setValues((v) => ({ ...v, [name]: value }));
  };

  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched((t) => ({ ...t, [name]: isTouched }));
  };

  const validateField = (name: string) => {
    if (validate) {
      const fieldErrors = validate(values);
      setErrors((e) => ({ ...e, [name]: fieldErrors[name] }));
    }
  };

  const validateForm = useCallback(() => {
    if (!validate) return true;
    const errs = validate(values);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [validate, values]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
    }
  };

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        validateField,
        validateForm,
      }}
    >
      <form onSubmit={handleSubmit} className={className} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
};
