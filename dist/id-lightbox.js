'use strict';

(function () {
  this.IDLightbox = function (elems) {
    this.current = -1;
    this.elems = document.querySelectorAll(elems);
    this.imgArray = new Array();

    this.overlay;
    this.galId;

    this.clickHandler = this.clickHandler.bind(this);

    // Click Handlers
    for (var i = 0; i < this.elems.length; i++) {
      this.elems[i].addEventListener('click', this.clickHandler);
    }

    // let's go!
    this.setupOverlay();
  };

  IDLightbox.prototype.setupOverlay = function () {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('id-lightbox-overlay');
    this.overlay.innerHTML = '<span class="id-lightbox-close"></span>';
  };

  IDLightbox.prototype.setupControls = function () {
    var controls = '<span class="id-lightbox-next"></span><span classid-lightbox-prev"></span>';
    this.overlay.innerHTML = this.overlay.innerHTML + controls;

    // set up the click handlers for the controls
  };

  IDLightbox.prototype.clickHandler = function (e) {
    var _this = this;

    e.preventDefault();
    var img = void 0;

    this.galId = e.target.rel;

    if (this.galId) {
      var gallery = document.querySelectorAll('[rel=' + this.galId + ']');
      for (var i = 0; i < gallery.length; i++) {
        if (this.imgArray.indexOf(gallery[i].href) === -1) {
          img = this.setupImage(gallery[i].href);

          // if current image, make it visible!
          if (gallery[i] === e.target.href) {
            img.classList.add('id-lightbox-current');
            setTimeout(function () {
              img.classList.add('visible');
            }, 50);
          }

          this.overlay.appendChild(img);
          this.imgArray.push(gallery[i].href);
        }
      }
    } else {
      img = this.setupImage(e.target.href);
      img.classList.add('id-lightbox-current');
      setTimeout(function () {
        img.classList.add('visible');
      }, 50);

      this.overlay.appendChild(img);
      this.imgArray.push(e.target.href);
    }

    if (this.imgArray.length > 1) {
      this.setupControls();
    }

    document.body.appendChild(this.overlay);
    setTimeout(function () {
      _this.overlay.classList.add('visible');
    }, 50);
  };

  IDLightbox.prototype.setupImage = function (imgSrc) {
    var img = new Image();
    img.src = imgSrc;
    img.classList.add('id-lightbox-image');
    return img;
  };

  IDLightbox.prototype.destroy = function () {
    this.current = -1;
    this.imgArray = new Array();
    this.overlay.remove();
  };
})();