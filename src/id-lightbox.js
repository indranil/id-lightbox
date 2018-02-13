const IDLightbox = function(elems) {
  this.current = -1;
  this.elems = document.querySelectorAll(elems);
  this.overlay = document.createElement('div');
  
  this.elems.forEach(elem => {
    elem.addEventListener('click', this.clickHandler);
  });
}

IDLightbox.prototype.clickHandler = function (e) {
  e.preventDefault();
  
  console.log('hello');
};
