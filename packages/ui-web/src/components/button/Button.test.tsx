import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Click me");
    expect(btn).not.toBeDisabled();
  });

  it("renders all variants", () => {
    const variants = [
      "default",
      "secondary",
      "outline",
      "ghost",
      "destructive",
    ] as const;
    variants.forEach((variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      const btn = screen.getByRole("button", { name: variant });
      expect(btn).toBeInTheDocument();
    });
  });

  it("renders all sizes", () => {
    const sizes = ["sm", "md", "lg", "icon"] as const;
    sizes.forEach((size) => {
      render(<Button size={size}>{size}</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toBeInTheDocument();
    });
  });

  it("applies className override", () => {
    render(<Button className="test-class">Classy</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("test-class");
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>,
    );
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders as a child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>,
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });
});
