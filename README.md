# Bass-UI-Kit

Bass-UI-Kit is a UI Component Library which provides a number of components aimed at the development of e-commerce websites, fintech applications, Crypto-dashboards, etcetera using react.

## 🚀 Features and Benefits

- **Accessible by Default:** Built on top of headless primitives (Radix UI, TanStack Table, CMDK) adhering strictly to WAI-ARIA standards.
- **Type-Safe Styling:** Leverages **Tailwind CSS v4** and **Class Variance Authority (CVA)** to handle complex component states and design tokens with absolute type safety.
- **Compound Component Architecture:** Utilizes the Compound Component Pattern to give developers complete control over layout markup and internal state assembly.
- **Production-Ready Quality:** Validated with comprehensive unit testing via **Vitest** and visual regression testing via **Chromatic**.

## 📦 Installation

Install the package via npm or yarn:

```sh
# pnpm (Recommended)
pnpm add @bass-ui-kit/core

# npm
npm install @bass-ui-kit/core

# yarn
yarn add @bass-ui-kit/core
```

### Setup

Upon installing the library, add "@source '../node_modules/@bass-ui-kit/core/dist/\*_/_.{js,ts,jsx,tsx}';" and "@import '@bass-ui-kit/core/styles.css';" to your code.

## 📚 Documentation

Detailed documentation and live examples can be found at: [https://bass-ui-kit-docs.netlify.app/]

### 🏗 Development

The development process required me to learn many new tools, technologies, and techniques. I initially tried to build this using standard CSS, but found it hard to maintain design tokens, so I migrated to Tailwind. At first I struggled to manage styling in a way that was predictable and clean, so I learned to use CVA. I had to learn to use Storybook so that I could actually see and test the components, even in isolation as they were.

Each component had multiple unit tests written in vitest in order to make sure that the logic would always work as expected. I tried to keep my vitests to just testing logic and accessibility. i trusted that Storybook and Chromatic would be sufficient for any visual tests. If I had more time, I would have used vitest-axe to evaluate accessibilty compliance just to be on the safe side. That doesn't mean that nothing was done in that regard though. ARIA maps were clarified before the start of development and the a11y extension in storybook was used extensively.

### Requirements

- "react": "^19.2.0",
- "react-dom": "^19.2.0",
- "framer-motion": "^12.38.0"

### 📝 Changelog

Check out the [CHANGELOG.md](CHANGELOG.md) to see the latest updates and breaking changes.
