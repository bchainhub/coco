# COCO Agent Guide

## Project Purpose

COCO is a modular CSS framework built with Sass. The published npm package is
CSS-only and must not require website-facing JavaScript.

## Requirements

- Use Node.js 22.22.2 or newer.
- Use `npm install`; lock files are intentionally ignored.
- Do not add dependency overrides to preserve outdated packages.
- Do not introduce known dependency vulnerabilities.
- Prefer maintained packages and remove obsolete packages when replacing them.
- Preserve accessibility, responsive behavior, and right-to-left support.
- Prefer logical CSS properties over physical properties.
- Keep declarations in alphabetical order and nesting shallow.

## Important Commands

```sh
npm install
npm run test:all
npm run docs:build
```

`npm run test:all` performs the dependency audit, SCSS and Markdown linting,
Node-based Sass tests, production build, preview build, and HTML validation.

## Source Layout

- `scss/config/` contains framework configuration maps and defaults.
- `scss/function/` contains public and internal Sass functions.
- `scss/mixin/` contains reusable mixins and style generators.
- `scss/element/` contains content, layout, media, and utility styles.
- `scss/form/` contains form components.
- `scss/filters/` contains image effects.
- `preview/pug/` contains the JavaScript-free preview website templates.
- `test/` contains Sass tests executed through Node's built-in test runner.
- `scripts/build-docs.mjs` builds KSS, SassDoc, and LLM documentation.

## Documentation Rules

- Document every public CSS component beside its SCSS implementation with KSS.
- Include purpose, selectors, modifiers, states, accessible markup, and pitfalls.
- Document every public Sass function, mixin, and variable with `///` SassDoc.
- Add new KSS section identifiers to the required-section list in the builder.
- Run `npm run docs:build` after changing documentation comments.
- Generated documentation belongs in `.site/` and is published from `doc`.
- Do not commit `.site/`, `dist/`, generated preview files, or lock files.

## Published Package

Only `dist/`, `LICENSE`, and `README.md` are published. Development scripts and
documentation tooling may use JavaScript, but package consumers must receive no
JavaScript runtime or JavaScript assets.

## Completion Checklist

Before considering a change complete:

1. Run `npm run test:all`.
2. Run `npm run docs:build` for component or Sass API changes.
3. Confirm `npm audit` reports zero vulnerabilities.
4. Confirm new public selectors and Sass APIs are documented.
5. Check the preview when visual behavior changes.
6. Run `git diff --check`.
