# [COCO](https://cryptohub-digital.github.io/coco/)

## **COCO** is an open source CSS framework based on [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes) without any piece of ~~JavaScript~~.

100% Responsive 💻 | Modular 🗂 | Modern 💈 | Free ⚗️
--- | --- | --- | ---
*Designed for multi device support* | *Import what you need* | *Built with flexbox* | *Open Source*

## CDN

Latest version
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cryptohub-digital/coco/dist/css/coco.min.css" />
```

Minor updates and patch fixes within a major version
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cryptohub-digital/coco@1/dist/css/coco.min.css" />
```

Patch fixes within a minor version
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cryptohub-digital/coco@1.1/dist/css/coco.min.css" />
```

Using SRI with exact version
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cryptohub-digital/coco@1.1.3/dist/css/coco.min.css" integrity="sha384-{hash}" crossorigin="anonymous" />
```

> Please, replace {hash} with hash generated for chosen specific version. You can use for example this [SRI Hash Generator](https://www.srihash.org/).

## Install

#### NPM

```sh
npm install "https://github.com/cryptohub-digital/coco.git#semver:^1.1" --save
```

---

#### Yarn

```sh
yarn add "https://github.com/cryptohub-digital/coco.git#semver:^1.1"
```

---

#### Bower

```sh
bower install "https://github.com/cryptohub-digital/coco.git#1.1.3" --save
```

### Import

After installation, you can import the CSS file into your project using this snippet:

#### CSS version

```css
@import 'coco/dist/css/coco.css'
```

#### Minified CSS version
```css
@import 'coco/dist/css/coco.min.css'
```

#### SASS version
```css
@import 'coco/dist/sass/coco.sass'
```

#### SCSS version
```css
@import 'coco/dist/scss/coco.scss'
```
### Linking
You can install and connect node_modules distribution with symbolic link for various platforms. Such as:

#### Jekyll aka Github pages :octocat:

```sh
yarn add https://github.com/cryptohub-digital/coco
mkdir -p _sass; ln -s ../node_modules/@cryptohub/coco/dist/sass _sass/coco
```

> css/styles.sass

```css
@import "coco/coco.sass"
```

> \_config.yml

```yaml
include:
  - node_modules/@cryptohub/coco/dist/sass
```

> .gitignore (if present and you don't want import something else)

```bash
!node_modules/
node_modules/*
!node_modules/@cryptohub/
node_modules/@cryptohub/*
!node_modules/@cryptohub/coco/
node_modules/@cryptohub/coco/*
!node_modules/@cryptohub/coco/dist/
node_modules/@cryptohub/coco/dist/*
!node_modules/@cryptohub/coco/dist/sass
```

## Customize distribution

COCO is a **CSS** framework. Output is a single CSS file [coco.css](https://github.com/cryptohub-digital/coco/blob/master/dist/css/coco.css) or SASS distribution.

You can either use that file, "out of the box", or download the Sass source files to customize the variables.

```html
// Import a Google Font
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700')

// Set your brand colors
$purple: #8A4D76
$pink: #FA7C91
$brown: #757763
$beige-light: #D0D1CD
$beige-lighter: #EFF0EB

// Update COCO's global variables
$family-sans-serif: "Nunito", sans-serif
$grey-dark: $brown
$grey-light: $beige-light
$primary: $purple
$link: $pink

// Update some of COCO's component variables
$control-border-width: 2px
$input-background-color: $beige-lighter
$input-border-color: transparent
$input-shadow: none

// Import the rest of COCO
@import "coco/sass/coco.sass"
```

You can found default variables in [dist/default/vars.scss](https://github.com/cryptohub-digital/coco/blob/master/dist/default/vars.scss)

## Get started

### The simplest grid system

> Just add columns, they will resize themselves

```html
<div class="columns">
  <div class="column">1</div>
  <div class="column">2</div>
  <div class="column">3</div>
  <div class="column">4</div>
  <div class="column">5</div>
</div>
```
### Sticky footer

> Sticky footer with one class

```html
<body class="has-sticky-footer">
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

### Tabs

> Tabs without the JavaScript

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
  <!-- Default tab -->
  <article id="tab-1">Content of first tab</article>
</section>
```

### Hamburger menu

> Hamburger menu without the JavaScript

1. Add `<input type="checkbox" id="navbar-toggle" aria-hidden="true" />` into the `.navbar`
2. Change link to label: `<label for="navbar-toggle" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">...</label>`
3. Optional: Your menu `id` should be same as defined in `label[data-target]` for compatiblity with JavaScript
4. Test hamburger menu

### em.oji

> You can use Emoji as icons with effects on it

```html
<em class="oji flat">📥</em>
```

### Current version
> You can call current version with following code:

```html
<span class="coco version">version </span>
```

## Browser Support

COCO uses [autoprefixer](https://github.com/postcss/autoprefixer) to make (most) Flexbox features compatible with earlier browser versions. According to [Can I use](https://caniuse.com/#feat=flexbox), COCO is compatible with **recent** versions of:

* Chrome
* Edge
* Firefox
* Opera
* Safari

Internet Explorer (10+) is only partially supported.

## Documentation

Browse the online documentation in [WIKI page](https://github.com/cryptohub-digital/coco/wiki) or [Online manual](https://cryptohub-digital.github.io/coco/).

## Changelog

You can check the changes in our [changelog](https://github.com/cryptohub-digital/coco/blob/master/.changelog).

## Copyright and license

Code copyright 2018 [Crypto ▪ Hub®](https://github.com/cryptohub-digital), [Raisty](https://github.com/raisty); [Jeremy Thomas](https://github.com/jgthms). Code released under the [MIT license](https://github.com/cryptohub-digital/coco/blob/master/LICENSE).
