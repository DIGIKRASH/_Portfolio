// Запуск функций при старте документа
// $(document).ready(function () { })

// --- Code animation
// $('.heart-animation').html("<pre id=p>"), j = 0,
//   setInterval(() => {
//     for (M = Math, A = M.abs, T = '4#0;:-·', S = 20, s = '', i = 492; i--;)
//       s += (x = i % 41) ? T[A(j - (((M.hypot((X = x - S) / S * (.5 + .5 * (Y = 2 * ((i / 41) | 0) - 10) / S), Y / S - A(X / S) * .63) - .7) * S) | 0)) % 7] : '\n';
//     p.innerHTML = s; j++
//   }, 150)






// // --- Script for animating the letters
// function findRandom(n) {
//   let num = (1 + parseInt(Math.random() * 100)) % n;
//   return num;
// }

// function razz() {
//   var cover = document.getElementById("razz");
//   var letter = cover.getElementsByTagName("b");

//   let C = "";
//   z = findRandom(5);
//   if (z == 0) {
//     C = "l-shadow";
//   } else if (z == 1) {
//     C = "l-slide";
//   } else if (z == 2) {
//     C = "l-spin";
//   } else if (z == 3) {
//     C = "l-bump";
//   } else if (z == 4) {
//     C = "l-spin-back";
//   }

//   let x = findRandom(10);
//   letter[x].classList.add(C);

//   setTimeout(function () {
//     letter[x].classList.remove(C);
//   }, 1200);

//   setTimeout(function () {
//     razz();
//   }, 3000);
// }
// razz();


// --- Locomotive Scroll (Smoth)
// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   smoothMobile: true,
// });
// scroll.destroy();
// document.addEventListener("DOMContentLoaded", function (event) {
//   scroll.init();
// });


// $('.wave').click(function () {
//   $(this).toggleClass('active');
// });




// let section = document.querySelector('.box');
// let text = document.querySelector('.text')
// let innerText = document.querySelector('.innerText')
// window.addEventListener('scroll', function () {
//   let value = window.scrollY;
//   section.style.clipPath = "circle(" + value + "px at center center)";
//   text.style.left = 100 - value / 5 + '%';
//   innerText.style.left = 100 - value / 5 + '%';
// })





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







Splitting();

let cursor = document.querySelector('.cursor'),
  cursorText = cursor.querySelectorAll('.char');


function rounded(radius) {

  for (let i = 0; i < cursorText.length; i++) {
    let rotation = i * (360 / cursorText.length);
    gsap.set(cursorText[i], {
      transformOrigin: `0px ${radius}px`,
      x: radius,
      rotate: rotation
    });
    gsap.set(cursor, { transformOrigin: "center center", rotation: 0, width: radius * 2, height: radius * 2 })

  }

  let rotate = gsap.timeline({ repeat: -1 })
  rotate.to(cursor, { rotation: 360, duration: 5, ease: "none", })
}

let radius = 70


function cursorMove(e) {
  var mouseX = e.clientX,
    mouseY = e.clientY
  tl = gsap.timeline();
  tl.to(cursor, {
    duration: 1,
    x: mouseX - radius,
    y: mouseY - radius,
    ease: Expo.ease
  })
}



function init() {
  rounded(radius);
  window.addEventListener('mousemove', cursorMove);
}

window.addEventListener("load", function () {
  init();
})


let parent = document.querySelectorAll('.animate-text');
for (let i = 0; i < parent.length; i++) {
  parent[i].style.width = parent[i].children[0].clientWidth + "px";
};



const body = document.body,
  scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
  height = scrollWrap.getBoundingClientRect().height - 1,
  speed = 0.04;

var offset = 0;

body.style.height = Math.floor(height) + "px";

function smoothScroll() {
  offset += (window.pageYOffset - offset) * speed;

  var scroll = "translateY(-" + offset + "px) translateZ(0)";
  scrollWrap.style.transform = scroll;

  callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();
const content = document.querySelector(".section2");
let currentPos = window.pageYOffset;

const callDistort = function () {
  const newPos = window.pageYOffset;
  const diff = newPos - currentPos;
  const speed = diff * 0.35;

  content.style.transform = "skewY(" + speed + "deg)";
  currentPos = newPos;
  requestAnimationFrame(callDistort);
};

callDistort();




var Slice = function () {
  var sliceDiv = document.getElementById('slice');
  var gridX = 4;
  var w = sliceDiv.offsetWidth;
  var h = sliceDiv.offsetHeight;
  var img = document.querySelectorAll('#slice img')[0].src;
  var delay = 0.05;

  console.log(w, h, img)

  this.create = function () {

    for (x = 0; x < gridX; x++) {

      var width = x * w / gridX + "px";
      var div = document.createElement('div');
      document.getElementById('slice').appendChild(div);

      div.style.left = width;
      div.style.top = 0;
      div.style.width = w / gridX + 'px';
      div.style.height = h + 'px';
      div.style.backgroundImage = "url(" + img + ')';
      div.style.backgroundPosition = "-" + width;
      div.style.backgroundSize = w + 'px';
      div.style.transitionDelay = x * delay + "s";

    }
  }

  this.create();

  document.getElementById('slice').onmousemove = function () {
    mouseOver();
  }
  document.getElementById('slice').onmouseout = function () {
    mouseOut();
  }

  function mouseOver() {
    sliceDiv.classList.add('active');
  }
  function mouseOut() {
    sliceDiv.classList.remove('active');
  }
  // document.getElementById('slice').onmousemove = function () {
  //   sliceDiv.classList.add('active');
  // }
  // document.getElementById('slice').onmouseout = function () {
  //   sliceDiv.classList.remove('active');
  // }

}

window.onload = function () {
  var slice = Slice();
}