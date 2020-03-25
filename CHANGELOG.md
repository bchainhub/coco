# COCO stylesheet Changelog

## 1.1.1

### New features

* Added version number into style - called with `.coco.version::after`
* Added `.is-sticky` to tabs
* Added `.is-sticky` to navbar
* Tabs without javascript but with `radio` implemented
* Integrate Github Actions

### Improvements

* Fixed non-self building style prefixed with `_`
* Dropped the kaomojis to reduce size
* Updated readme file

### Bug fixes

* Revert $input-color: $text-strong

## 1.1.0

### Improvements

* Big upgrade
* Add CDN link
* Form in separate folder
* Light/dark color functions
* Update shadows
* Change tests

## 1.0.4

### Improvements

* Rearrange modules
* Update documentation

## 1.0.3

### New features

* Export default variables into distribution
* SASS distribution

### Improvements

* Replace modules in gulpfile

## 1.0.2

### Improvements

* Excluded Less from distribution due to converting issues

## 1.0.1

### Improvements

* Fixed imports for different distributions

## 1.0.0

### New features

* Gulp file for exporting
* Automated documentation
* Proper export of Less

### Improvements

* Change the paths
* Added SCSS export using (SASS2SCSS)[https://github.com/mgreter/sass2scss]

## 0.1.2

### Improvements

* "are-medium" for div classes "tags" and "buttons"

## 0.1.1

### New features

* Export to less
* Added filters
* Added chessboard effect

### Improvements

* Exclude SASS from distribution, use main instead
* rename folder styles to dist
* move main coco.sass file into sass

## 0.1.0

### New features

* Added Emoji icons
* Added Kaomoji
* New filters for Emoji and images

### Improvements

* Sticky footer
* Hamburger menu without Javascript
* Flex direction reverse for columns
