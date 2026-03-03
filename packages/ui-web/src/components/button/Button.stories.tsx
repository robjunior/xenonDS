import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta = {
  title: "Button/Primitives",
  component: Button,
  tags: ["autodocs"],
};
export default meta;

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
] as const;

export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

const sizes = ["sm", "md", "lg", "icon"] as const;

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      {sizes.map((size) =>
        size === "icon" ? (
          <Button key={size} size={size} aria-label="icon">
            <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
              <circle
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={2}
              />
            </svg>
          </Button>
        ) : (
          <Button key={size} size={size}>
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </Button>
        ),
      )}
    </div>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  ),
};

export const FullWidth: StoryObj = {
  render: () => (
    <Button className="w-full" size="lg">
      Full Width Button
    </Button>
  ),
};

export const AsChild: StoryObj = {
  render: () => (
    <Button asChild variant="outline">
      <a href="https://xenon.design" target="_blank" rel="noopener noreferrer">
        Button as Link
      </a>
    </Button>
  ),
};
