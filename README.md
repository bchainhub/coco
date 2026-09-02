# COCO

COCO is a lightweight, modular CSS framework built with Sass. It ships CSS only,
with no JavaScript runtime, dependencies, or required initialization.

## Install

Install the package with npm:

```sh
npm install @blockchainhub/coco
```

Then load either the expanded or minified stylesheet:

```html
<link rel="stylesheet" href="./node_modules/@blockchainhub/coco/dist/coco.min.css">
```

```css
@import '@blockchainhub/coco/dist/coco.css';
```

## CDN

Pin the exact version for reproducible production builds:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blockchainhub/coco@2.3.0/dist/coco.min.css">
```

To receive compatible updates within major version 2:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blockchainhub/coco@2/dist/coco.min.css">
```

The package files are `dist/coco.css` and `dist/coco.min.css`. No JavaScript is
published.

## Examples

COCO uses a responsive grid familiar to Bootstrap users and includes typography,
forms, tables, buttons, layout utilities, and image filters.

### Sticky footer

```html
<body class="has-sticky-footer">
  <header>Header</header>
  <main>Main content</main>
  <footer>Footer</footer>
</body>
```

### Emoji icon

```html
<em class="oji flat" aria-hidden="true">📥</em>
```

### Framework version

```html
<span class="coco version">Version </span>
```

## Documentation

Browse the [online documentation](https://bchainhub.github.io/coco/) for the
preview, KSS component style guide, and SassDoc API reference. Documentation is
generated directly from comments beside the relevant SCSS source.

The documentation build also produces `llms.txt`, `llms-full.txt`,
`components.json`, and `sass-api.json` for coding assistants and automated
tools. Repository-specific instructions for coding agents are in
[AGENTS.md](AGENTS.md).

## Development

COCO requires Node.js 22.22.2 or newer for its development toolchain.

```sh
npm install
npm run test:all
```

Lock files are intentionally not committed, so use `npm install` for a fresh checkout.

Useful commands:

- `npm run build` creates the expanded and minified production CSS.
- `npm run preview:build` generates the static preview.
- `npm run docs:build` creates the complete documentation site in `.site/`.
- `npm start` watches the Sass and Pug sources and serves the preview at `http://localhost:3000/html/page/color.html`.
- `npm test` runs the Sass unit tests with Node's built-in test runner.
- `npm run lint` checks all Sass and SCSS files.

Build tools use JavaScript during development, but the website-facing package
and preview require none.

## Contributing

See the [contribution guide](.github/CONTRIBUTING.md) before opening a pull request.

## License

Released under the [CORE license](LICENSE).
