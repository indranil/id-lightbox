const IDLightbox = function(elems) {
  this.current = -1;
  this.elems = document.querySelectorAll(elems);
  this.imgArray = new Array();
  
  this.overlay;
  this.galId;
  
  this.clickHandler = this.clickHandler.bind(this);
  
  // let's go!
  this.setupClickHandlers();
  this.setupOverlay();
};

IDLightbox.prototype.setupClickHandlers = function () {
  for (let i=0; i<this.elems.length; i++) {
    this.elems[i].addEventListener('click', this.clickHandler);
  }
};

IDLightbox.prototype.setupOverlay = function () {
  this.overlay = document.createElement('div');
  this.overlay.classList.add('id-lightbox-overlay');
  this.overlay.innerHTML = '<span class="id-lightbox-close"></span>';
};

IDLightbox.prototype.setupControls = function () {
  let controls = '<span class="id-lightbox-next"></span><span classid-lightbox-prev"></span>';
  this.overlay.innerHTML = this.overlay.innerHTML + controls;
  
  // set up the click handlers for the controls
};

IDLightbox.prototype.clickHandler = function (e) {
  e.preventDefault();
  let img;
  
  this.galId = e.target.rel;
  
  if (this.galId) {
    const gallery = document.querySelectorAll('[rel='+this.galId+']');
    for (let i=0; i < gallery.length; i++) {
      if (this.imgArray.indexOf(gallery[i].href) === -1) {
        img = this.setupImage(gallery[i].href);
        
        // if current image, make it visible!
        if (gallery[i] === e.target.href) {
          img.classList.add('id-lightbox-current');
          setTimeout(() => {
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
    setTimeout(() => {
      img.classList.add('visible');
    }, 50);
    
    this.overlay.appendChild(img);
    this.imgArray.push(e.target.href);
  }
    
  if (this.imgArray.length > 1) {
    this.setupControls();
  }
  
  document.body.appendChild(this.overlay);
  setTimeout(() => {
    this.overlay.classList.add('visible');
  }, 50);
};

IDLightbox.prototype.setupImage = function (imgSrc) {
  let img = new Image();
  img.src = imgSrc;
  img.classList.add('id-lightbox-image');
  return img;
};

IDLightbox.prototype.destroy = function () {
  this.current = -1;
  this.imgArray = new Array();
  this.overlay.remove();
};
