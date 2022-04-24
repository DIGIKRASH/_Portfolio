

////////////////////////////////////////////
// --- textCircle
var textCircle = function (el, opt) {
  this.listEl = document.querySelectorAll(el);
  this.arrEl = [].slice.call(this.listEl);
  this.opt = opt;
  this.diameter = this.opt.diameter || 300;
  this.fontSize = this.opt.fontSize || 20;
  this.space = this.opt.space || 6;
  this.elRotate = this.opt.rotate || 'top';
  this.init();
}

textCircle.prototype = {

  init: function () {
    var self = this;
    self.arrEl.forEach(function (el) {
      var text = el.innerText;
      var arrText = text.match(/./g);

      self.wrapStyle(el);
      self.circle(el, arrText);
    });
  },

  rotate: function (el, elRotate, arrChild) {
    var wrapRotate = arrChild[Math.floor(arrChild.length / 2)].style.transform;
    if (elRotate == 'top') {
      wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, ''));
    } else if (elRotate == 'bottom') {
      wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, '')) + 180;
    } else if (elRotate == 'left') {
      wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, '')) + 90;
    } else if (elRotate == 'right') {
      wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, '')) + 270;
    }
    el.style.transform = 'rotate(-' + wrapRotate + 'deg)';
  },

  wrapStyle: function (el) {
    var self = this;
    el.innerHTML = '';
    el.style.position = 'relative';
    el.style.display = 'inline-block';
    el.style.fontSize = self.fontSize + 'px';
    el.style.width = self.diameter + 'px';
    el.style.height = self.diameter + 'px';
  },

  splitText: function (el, arrText) {
    for (var i = 0, len = arrText.length; i < len; i++) {
      if (i === len) break;
      // wrap span text
      el.innerHTML += '<span style="display:inline-block;">' + arrText[i] + '</span>';
    }
  },

  circle: function (el, arrText) {
    var self = this;
    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }
    self.splitText(el, arrText);

    var childList = el.children;
    var arrChild = [].slice.call(childList);
    for (var i = 0, len = arrChild.length; i < len; i++) {
      if (i === len) break;

      arrChild[i].style.position = 'absolute';
      arrChild[i].style.textAlign = 'center';
      arrChild[i].style.width = self.fontSize + 'px';
      arrChild[i].style.height = self.fontSize + 'px';

      var x = (self.diameter - self.fontSize) / 2 * (Math.sin(toRadians(i * self.space)) + 1);
      var y = (self.diameter - self.fontSize) / 2 * (Math.cos(toRadians(i * self.space)) + 1);
      console.log(x)
      console.log(y)
      arrChild[i].style.top = x + 'px';
      arrChild[i].style.left = y + 'px';
      arrChild[i].style.transform = 'rotate(' + (90 + (i * self.space)) + 'deg)';

      // rotate center
      self.rotate(el, self.elRotate, arrChild);

    }
  }
}

// Demo 1
var demo1 = new textCircle('.torch__pretitle', {
  diameter: 300,
  space: 8,
  fontSize: 25,
});
