
# COCO

**COCO** is an open-source CSS framework based on [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes). It operates entirely without JavaScript.

100% Responsive 💻 | Modular 🗂 | Modern 💈 | Free ⚗️
--- | --- | --- | ---
*Designed for multi-device support* | *Import only what you need* | *Built with Flexbox* | *Open Source*

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

### Bower

```sh
bower install bchainhub/coco
```

## Import

After installation, import the CSS file into your project:

**CSS version:**

```css
@import '@blockchainhub/coco/dist/css/coco.css';
```

**Minified CSS version:**

```css
@import '@blockchainhub/coco/dist/css/coco.min.css';
```

**SASS version:**

```css
@import '@blockchainhub/coco/dist/sass/coco.sass';
```

For the right-to-left (RTL) version, append `-rtl` to the file name.

## Customize Distribution

COCO is a CSS framework that outputs a single CSS file [coco.css](https://github.com/bchainhub/coco/blob/master/dist/css/coco.css) or a SASS distribution. You can use it "out of the box" or download the Sass source files to customize the variables.

## Get Started

### Simplest Grid System

> Add columns, and they will resize automatically based on screen size.

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

#### Tabs

> Create tabs without JavaScript:

```html
<div class="tabs">
  <ul>
    <li><a href="#tab-1">Tab 1</a></li>
    <li><a href="#tab-2">Tab 2</a></li>
    <li><a href="#tab-3">Tab 3</a></li>
  </ul>
</div>
<section class="tab-content">
  <article id="tab-2">Content of second tab</article>
  <article id="tab-3">Content of third tab</article>
  <article id="tab-1">Content of first tab (default)</article>
</section>
```

#### Hamburger Menu

> Build a hamburger menu without JavaScript:

1. Add `<input type="checkbox" id="coco-navbar-toggle" aria-hidden="true" />` inside the `.navbar`.
2. Change the link to a label: `<label for="coco-navbar-toggle" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">...</label>`.
3. Ensure your menu `id` matches `label[data-target]` for JavaScript compatibility.
4. Test the hamburger menu functionality.

#### em.oji

> Use emojis as icons with effects:

```html
<em class="oji flat">📥</em>
```

#### Custom Theme

> Create a custom theme by adding variables to `style/utilities/themes.sass`.

To set a theme, add `data-theme="theme"` to the HTML tag.

COCO supports light and dark themes natively.

#### Theme Switch

> To switch between dark/light themes in a `nav` pane:

1. Add the input after the body tag: `<input type="checkbox" id="coco-theme-switch" />`
2. Add a label within the navbar, following this structure:

```html
<label for="coco-theme-switch">
  <div class="sun"></div>
</label>
```

Note: The theme switch depends on the [:has()](https://caniuse.com/css-has) CSS selector.

#### Current Version

> Display the current version of COCO using this code:

```html
<span class="coco version">version </span>
```

## Browser Support

COCO uses [autoprefixer](https://github.com/postcss/autoprefixer) to ensure Flexbox compatibility with older browsers. Based on [Can I use](https://caniuse.com/#feat=flexbox), COCO supports **recent** versions of:

- Chrome
- Edge
- Firefox
- Opera
- Safari

Internet Explorer 10+ is only partially supported.

## Documentation

For detailed documentation, visit the [Online Manual](https://bchainhub.github.io/coco/).

## Informational Notice

Wondering why some files start with an underscore?

> Sass files that begin with an underscore (`_`) are considered partials. These files are not compiled by themselves but are included in other files.

## Copyright and License

This code is copyright 2018 by [Blockchain Hub](https://github.com/bchainhub) and [Jeremy Thomas](https://github.com/jgthms). It is released under the [CORE license](LICENSE).
