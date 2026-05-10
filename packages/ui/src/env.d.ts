// packages/ui/src/env.d.ts

// The "Catch-all" for CSS files
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Ensure TypeScript treats this as a global declaration file
export {};
