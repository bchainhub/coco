
# COCO

**COCO** is an open-source CSS framework.

Minimalistic ⛽ | Modular 🗂 | Modern 💈 | Free ⚗️
--- | --- | --- | ---
*As small as possible, yet feature-rich* | *Import only the components you need* | *Built on CSS3* | *Open Source*

## CDN

**Latest version:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blockchainhub/coco/dist/css/coco.min.css" />
```

**Minor updates and patch fixes within a major version:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blockchainhub/coco@2/dist/css/coco.min.css" />
```

**Patch fixes within a minor version:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blockchainhub/coco@2.0/dist/css/coco.min.css" />
```

**Using SRI with the exact version:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blockchainhub/coco@2.0.0/dist/css/coco.min.css" integrity="sha384-{hash}" crossorigin="anonymous" />
```

> Replace `{hash}` with the SRI hash generated for the specific version. Use this [SRI Hash Generator](https://www.srihash.org/) for assistance.

## Install

### NPM

```sh
npm i @blockchainhub/coco
```

or

```sh
npm install "https://github.com/bchainhub/coco.git#semver:^2.0" --save
```

### Yarn

```sh
yarn add @blockchainhub/coco
```

or

```sh
yarn add "https://github.com/bchainhub/coco.git#semver:^2.0"
```

## Import

After installation, import the CSS file into your project:

**CSS version:**

```css
@import '@blockchainhub/coco/dist/coco.css';
```

**Minified CSS version:**

```css
@import '@blockchainhub/coco/dist/coco.min.css';
```

## Get Started

### Simplest Grid System, same as Bootstrap

> This framework uses a grid system with the same standards as Bootstrap.

### Features

#### Sticky Footer

> Implement a sticky footer with just one class:

```html
<body class="has-sticky-footer">
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

#### em.oji

> Use emojis as icons with effects:

```html
<em class="oji flat">📥</em>
```

#### Current Version

> Display the current version of COCO using this code:

```html
<span class="coco version">version </span>
```

## Documentation

For detailed documentation, visit the [Online Manual](https://bchainhub.github.io/coco/).

## Informational Notice

Have you noticed some files start with an underscore?

> Sass files that begin with an underscore (`_`) are considered partials. These files are not compiled by themselves but are included in other files.

## Copyright and License

Released under the [CORE license](LICENSE).
