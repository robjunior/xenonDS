import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Form, FormField, FormInput, FormButton, FormError } from ".";

const meta: Meta = {
  title: "Form/Primitives",
  component: Form,
  tags: ["autodocs"],
};
export default meta;

const validate = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};

export const Basic: StoryObj = {
  render: () => (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-background rounded shadow">
      <Form
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Submitted: ${JSON.stringify(values, null, 2)}`);
        }}
      >
        <FormField name="email" label="Email">
          <FormInput
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FormError name="email" />
        </FormField>
        <FormField name="password" label="Password">
          <FormInput
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <FormError name="password" />
        </FormField>
        <FormButton type="submit" className="w-full mt-4">
          Sign In
        </FormButton>
      </Form>
    </div>
  ),
};

export const DisabledState: StoryObj = {
  render: () => (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-background rounded shadow">
      <Form
        initialValues={{ email: "user@example.com", password: "password" }}
        onSubmit={() => {}}
      >
        <FormField name="email" label="Email">
          <FormInput
            name="email"
            type="email"
            disabled
            value="user@example.com"
          />
        </FormField>
        <FormField name="password" label="Password">
          <FormInput
            name="password"
            type="password"
            disabled
            value="password"
          />
        </FormField>
        <FormButton type="submit" className="w-full mt-4" disabled>
          Sign In
        </FormButton>
      </Form>
    </div>
  ),
};

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "destructive",
] as const;

const buttonSizes = ["sm", "md", "lg"] as const;

export const VariantsAndSizes: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-sm mx-auto mt-10 p-6 bg-background rounded shadow">
      <Form initialValues={{ email: "", password: "" }} onSubmit={() => {}}>
        <FormField name="email" label="Email">
          <FormInput name="email" placeholder="default md" />
        </FormField>
        <FormField name="emailSm" label="Email (sm)">
          <FormInput name="emailSm" size="sm" placeholder="small" />
        </FormField>
        <FormField name="emailLg" label="Email (lg)">
          <FormInput name="emailLg" size="lg" placeholder="large" />
        </FormField>
        <FormField name="emailOutline" label="Email (outline)">
          <FormInput
            name="emailOutline"
            variant="outline"
            placeholder="outline"
          />
        </FormField>
        <div className="flex gap-2 mt-4">
          {buttonVariants.map((variant) => (
            <FormButton key={variant} type="button" variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </FormButton>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          {buttonSizes.map((size) => (
            <FormButton key={size} type="button" size={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </FormButton>
          ))}
        </div>
      </Form>
    </div>
  ),
};
