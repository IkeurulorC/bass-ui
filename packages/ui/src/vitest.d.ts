import "vitest";
import "@testing-library/jest-dom";

declare module "vitest" {
  interface Assertion<T> extends jest.Matchers<void, T>, ExternalNotEnumerable {
    toBeInTheDocument(): T;
    toHaveClass(className: string): T;
    // Add other matchers you use frequently
  }
}
