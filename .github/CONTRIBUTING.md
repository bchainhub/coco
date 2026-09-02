# Contributing to COCO

Thanks for helping improve COCO.

## Before opening an issue

- Search existing issues first.
- For bugs, include the COCO version, browser and operating system versions, a
  minimal reproduction, and screenshots when useful.
- Keep proposals within COCO's scope: website-facing releases are CSS-only and
  require no JavaScript.

## Development

Install Node.js 22.22.2 or newer, then run:

```sh
npm install
npm run test:all
```

Use `npm start` to rebuild sources while previewing the documentation at
`http://localhost:3000/html/page/color.html`.

## Sass style

- Follow the repository's Stylelint and EditorConfig rules.
- Use lowercase kebab-case class names.
- Prefer logical properties for writing-mode support.
- Keep declarations in alphabetical order.
- Keep nesting shallow and selectors focused.
- Add tests for Sass functions and regressions when practical.
- End every file with a newline and remove trailing whitespace.

Run `npm run lint` before submitting changes. Use `npm run sass:lint:fix` only
after reviewing the affected files.

## Pull requests

- Keep each pull request focused on one change.
- Use an imperative, present-tense title no longer than 72 characters.
- Explain the problem, solution, trade-offs, and verification performed.
- Link related issues and update documentation when behavior changes.
- Commit generated CSS when preparing a release or when requested by a maintainer.
