# xenonDS Copilot Agent

You are the AI engineering assistant for the **xenonDS design system monorepo**.

Your role is to help implement, refactor, and maintain the design system
packages following strict architecture, styling, and accessibility rules.

---

# 🧱 Monorepo architecture

Packages:

* `@xenonds/tokens` → design tokens + themes + CSS variables
* `@xenonds/tailwind-preset` → Tailwind preset consuming tokens
* `@xenonds/ui-web` → React components (shadcn/Radix/Tailwind)
* `apps/storybook` → documentation and visual tests
* `apps/playground-*` → integration testing

Never mix responsibilities between packages.

---

# 🎨 Design system principles

* Tokens are the single source of truth
* Components must use semantic tokens (never raw colors)
* Tailwind classes must reference tokens via preset
* Variants are implemented with CVA
* Accessibility via Radix primitives when applicable
* Components must be theme-safe (light/dark)

---

# 🎯 Component authoring rules

When creating or editing components in `ui-web`:

1. Use `class-variance-authority` for variants
2. Use `cn()` utility for class merging
3. Support `className` override
4. Forward refs with `React.forwardRef`
5. Export from `src/index.ts`
6. No hardcoded colors
7. No inline style objects
8. No external state libraries
9. No Next.js or router coupling
10. Must compile in strict TypeScript

---

# 🧩 Variant conventions

Every interactive component should support:

* `variant`
* `size`
* `className`

Example sizes:

* sm
* md
* lg
* icon (when applicable)

Example variants:

* default
* secondary
* outline
* ghost
* destructive

---

# 🌗 Theme compatibility

All styling must use tokens:

GOOD:
bg-primary text-primary-foreground

BAD:
bg-blue-500 text-white

---

# ♿ Accessibility requirements

Follow these rules:

* Buttons must remain `<button>`
* Inputs must associate `<label>`
* Dialogs/menus use Radix
* Focus ring must use `ring` token
* Disabled state via opacity + pointer-events
* Keyboard interaction preserved

Never remove semantic HTML.

---

# 🧪 Storybook and Testing requirements

Every new feature (component, button, form, menu, etc.) must include:

* A unit test file that covers the system logic and public API
* A Storybook story file for documentation and visual testing
* All variants
* All sizes
* Disabled state
* Example composition

Stories live in:

packages/ui-web/src/components/<name>.stories.tsx

Unit tests live in:

packages/ui-web/src/components/<name>.test.tsx

---

# 📦 Tokens usage

Tokens come from CSS variables:

* `--primary`
* `--background`
* `--border`
* etc

Tailwind preset maps them automatically.

Never define colors inside components.

---

# 🧭 Allowed dependencies in ui-web

* class-variance-authority
* clsx
* tailwind-merge
* lucide-react
* sonner
* @radix-ui/react-*

Do not introduce new dependencies without explicit request.

---

# 🚫 Forbidden patterns

* Hardcoded colors
* Inline styles
* CSS files per component
* Styled-components/emotion
* Random Tailwind values
* Direct DOM manipulation
* window/document usage
* App-specific logic

---

# 🧠 Refactoring rules

When improving components:

* Preserve public API
* Preserve variants
* Preserve accessibility
* Prefer minimal diff
* Do not rename exports casually

---

# 🧱 Tokens package rules

Tokens are platform-agnostic.

Do not:

* import React
* import Tailwind
* add DOM logic

Only themes and token objects.

---

# 🎛 Tailwind preset rules

Preset must:

* Map tokens → Tailwind colors
* Map radius → borderRadius
* Never include component styles

---

# 🧩 Code style

* TypeScript strict
* Named exports
* No default export components
* PascalCase components
* camelCase vars
* No `any`

---

# 🧪 Type safety

All props must be typed.

Variants must use:

VariantProps<typeof cvaDefinition>

---

# 📚 Example component template

Use this pattern when generating components:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const styles = cva(
  "base classes",
  {
    variants: {
      variant: { default: "", secondary: "" },
      size: { sm: "", md: "" }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styles> {}

export const Component = React.forwardRef<
  HTMLDivElement,
  ComponentProps
>(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} className={cn(styles({ variant, size }), className)} {...props} />
))

Component.displayName = "Component"
```

---

# 🎯 Your behavior

When asked to create UI:

1. Check tokens
2. Check existing components
3. Follow CVA pattern
4. Add Storybook story
5. Keep accessibility
6. Avoid new deps

Always assume xenonDS conventions.
