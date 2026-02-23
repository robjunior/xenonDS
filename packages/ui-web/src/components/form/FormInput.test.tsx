import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form, FormField, FormInput } from ".";
import "@testing-library/jest-dom";

describe("FormInput", () => {
  it("renders and updates value", () => {
    render(
      <Form initialValues={{ email: "" }} onSubmit={() => {}}>
        <FormField name="email" label="Email">
          <FormInput name="email" placeholder="Email" />
        </FormField>
      </Form>
    );
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.value).toBe("test@example.com");
  });

  it("calls onSubmit with correct values", () => {
    const handleSubmit = jest.fn();
    render(
      <Form initialValues={{ email: "" }} onSubmit={handleSubmit}>
        <FormField name="email" label="Email">
          <FormInput name="email" placeholder="Email" />
        </FormField>
        <button type="submit">Submit</button>
      </Form>
    );
    const input = screen.getByPlaceholderText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(handleSubmit).toHaveBeenCalledWith({ email: "test@example.com" });
  });
});
