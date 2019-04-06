# [COCO](https://cococss.com)

## **COCO** is an open source CSS framework based on [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes) without any piece of ~~JavaScript~~.

100% Responsive 💻 | Modular 🗂 | Modern 💈 | Free ⚗️
--- | --- | --- | ---
*Designed for multi device support* | *Import what you need* | *Built with flexbox* | *Open Source*

## Install

#### NPM

```sh
npm install cryptohub-digital/coco#master --save
```

---

#### Yarn

```sh
yarn add https://github.com/cryptohub-digital/coco
```

---

#### Bower

```sh
bower install https://github.com/cryptohub-digital/coco#master --save
```

### Import
After installation, you can import the CSS file into your project using this snippet:

#### Normal CSS version
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

#### Meteor
Note: install meteor plug-in first [fourseven:scss](https://atmospherejs.com/fourseven/scss)
```sh
meteor add fourseven:scss
meteor npm install CryptoHub-place/coco#master --save
ln -sf ../node_modules/@cryptohub/coco/dist/scss imports/coco
```
> client/styles/main.scss
```css
@import "{}/imports/coco/coco.scss";
```

#### Jekyll aka Github pages :octocat:
```sh
npm install cryptohub-digital/coco#master --save
ln -sf ../node_modules/@cryptohub/coco/dist/sass _sass/coco
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

### em.oji
> You can use Emoji as icons with effects on it

```html
<em class="oji flat">📥</em>
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

Browse the online documentation in [WIKI page](https://github.com/cryptohub-digital/coco/wiki) or [cococss.com](https://cococss.com).

## Copyright and license

Code copyright 2018 Crypto ▪ Hub, Rastislav; Jeremy Thomas. Code released under [the MIT license](https://github.com/cryptohub-digital/coco/blob/master/LICENSE).
