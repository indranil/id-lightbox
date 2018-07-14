# IDLightbox

A simple easy to use lightbox solution that runs without any dependencies!

**Under 1KB minified & Gzipped** (784 bytes)

### Getting Started

#### Installation

You can use `npm` or `yarn` and add the files directly to your project

```
yarn add id-lightbox
```

and make sure to include the css file located at `dist/id-lightbox.min.css`

**Alternatively**, you can include the css and js files from here:

```
https://cdn.jsdelivr.net/npm/id-lightbox/dist/id-lightbox.min.css
```

```
https://cdn.jsdelivr.net/npm/id-lightbox/dist/id-lightbox.min.js
```

#### Usage

Finally, to use the script, just call this with any selector that can be parsed by `querySelectorAll`.

```
var lighty = new IDLightbox('.image'); // where image is the class of the a link tag
```

To create a gallery, simply add a `rel` tag to the anchors to group them together, for eg: `rel="gallery1"`

### Final Thoughts

If you have feature requests, bug reports, you know what to do.

My main objective with this project was to create a tiny lightbox script with no frills, and most importantly, no dependencies which you can just plop in and get going with!

✌🏽

### Changelog

**0.5.4**: Fixed a small bug where images would not show if the `a` tag had a child and was not positioned well

**0.5.3**: Cleaner Readme

**0.5.2**: Allowing both `require` and normal linking script file

**0.4.2**: Initial Release
