(function() {

const IDLightbox = function(elems) {
  this.elems = document.querySelectorAll(elems);
  this.current = -1;
  
  this.overlay;
  this.container;
  this.galId;
  
  this.clickHandler = this.clickHandler.bind(this);
  this.destroy = this.destroy.bind(this);
  this.nextImg = this.nextImg.bind(this);
  this.prevImg = this.prevImg.bind(this);
  
  // Click Handlers
  for (let i=0; i<this.elems.length; i++) {
    this.elems[i].addEventListener('click', this.clickHandler);
  }
  
  // let's go!
  this.setupContentArea();
};

IDLightbox.prototype.setupContentArea = function () {
  this.overlay = document.createElement('div');
  this.overlay.classList.add('id-lightbox-overlay');
  
  this.container = document.createElement('div');
  this.container.classList.add('id-lightbox-container');
  
  this.overlay.innerHTML = '<span class="id-lightbox-close"></span>';
  
  this.overlay.addEventListener('click', this.destroy);
  this.overlay.querySelector('.id-lightbox-close')
    .addEventListener('click', this.destroy);
};

IDLightbox.prototype.setupControls = function () {
  let controls = '<span class="id-lightbox-next"></span><span class="id-lightbox-prev"></span>';
  this.container.innerHTML += controls;
  
  this.container.querySelector('.id-lightbox-next')
    .addEventListener('click', this.nextImg);
  this.container.querySelector('.id-lightbox-prev')
    .addEventListener('click', this.prevImg);
};

IDLightbox.prototype.clickHandler = function (e) {
  e.preventDefault();
  let img;
  
  this.galId = e.currentTarget.rel;
  
  if (this.galId) {
    const gallery = document.querySelectorAll('[rel='+this.galId+']');
    for (let i=0; i < gallery.length; i++) {
      img = this.setupImage(gallery[i].href);
      // if current image, make it visible!
      if (gallery[i] === e.currentTarget) {
        this.current = i;
        img.classList.add('id-lightbox-current');
      }
      this.container.appendChild(img);
    }
    
    if (gallery.length > 1) {
      this.setupControls();
    }
  } else {
    this.current = 0;
    img = this.setupImage(e.currentTarget.href);
    img.classList.add('id-lightbox-current');
    this.container.appendChild(img);
  }
  
  document.body.appendChild(this.container);
  document.body.appendChild(this.overlay);
  setTimeout(() => {
    this.container.classList.add('visible');
    this.overlay.classList.add('visible');
  }, 50);
};

IDLightbox.prototype.setupImage = function (imgSrc) {
  let img = new Image();
  img.src = imgSrc;
  img.classList.add('id-lightbox-image');
  return img;
};

IDLightbox.prototype.destroy = function (e) {
  e.preventDefault();
  
  this.overlay.remove();
  this.container.remove();
  
  this.setupContentArea();
};

IDLightbox.prototype.nextImg = function (e) {
  e.preventDefault();
  const imageGallery = this.container.querySelectorAll('.id-lightbox-image');
  const currentImage = this.container.querySelector('.id-lightbox-current');
  this.current = (this.current < imageGallery.length-1) ? this.current + 1 : 0;
  
  currentImage.classList.remove('id-lightbox-current');
  imageGallery[this.current].classList.add('id-lightbox-current');
};

IDLightbox.prototype.prevImg = function (e) {
  e.preventDefault();
  
  const imageGallery = this.container.querySelectorAll('.id-lightbox-image');
  const currentImage = this.container.querySelector('.id-lightbox-current');
  this.current = (this.current <= 0) ? imageGallery.length - 1 : this.current - 1;
  
  currentImage.classList.remove('id-lightbox-current');
  imageGallery[this.current].classList.add('id-lightbox-current');
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = IDLightbox;
} else {
  window.IDLightbox = IDLightbox;
}

}());
