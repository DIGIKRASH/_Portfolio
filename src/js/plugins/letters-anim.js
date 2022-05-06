!function (e) { "undefined" == typeof module ? this.charming = e : module.exports = e }(function (e, n) { "use strict"; n = n || {}; var t = n.tagName || "span", o = null != n.classPrefix ? n.classPrefix : "char", r = 1, a = function (e) { for (var n = e.parentNode, a = e.nodeValue, c = a.length, l = -1; ++l < c;) { var d = document.createElement(t); o && (d.className = o + r, r++), d.appendChild(document.createTextNode(a[l])), n.insertBefore(d, e) } n.removeChild(e) }; return function c(e) { for (var n = [].slice.call(e.childNodes), t = n.length, o = -1; ++o < t;)c(n[o]); e.nodeType === Node.TEXT_NODE && a(e) }(e), e });

/**
 * wordFx.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
  // From https://davidwalsh.name/javascript-debounce-function.
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // From http://snipplr.com/view/37687/random-number-float-generator/
  function randomBetween(minValue, maxValue, precision) {
    if (typeof (precision) == 'undefined') {
      precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
  }

  let winsize = { width: window.innerWidth, height: window.innerHeight };

  class Shape {
    constructor(type, letterRect, options) {
      this.DOM = {};
      this.options = {
        shapeTypes: ['circle', 'rect', 'polygon'],
        shapeColors: ['#e07272', '#0805b5', '#49c6ff', '#8bc34a', '#1e1e21', '#e24e81', '#e0cd24'],
        shapeFill: true,
        shapeStrokeWidth: 1
      }
      Object.assign(this.options, options);
      this.type = type || this.options.shapeTypes[0];
      if (this.type !== 'random' && !this.options.types.includes(this.type)) return;
      if (this.type === 'random') this.type = this.options.shapeTypes[randomBetween(0, this.options.shapeTypes.length - 1, 0)];
      this.letterRect = letterRect;
      this.init();
    }
    init() {
      this.DOM.el = document.createElementNS('http://www.w3.org/2000/svg', this.type);
      this.DOM.el.style.opacity = 0;
      this.configureShapeType();

      if (this.options.shapeFill) {
        this.DOM.el.setAttribute('fill', this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]);
      }
      else {
        this.DOM.el.setAttribute('fill', 'none');
        this.DOM.el.setAttribute('stroke-width', this.options.shapeStrokeWidth);
        this.DOM.el.setAttribute('stroke', this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]);
      }
    }
    configureShapeType() {
      this.DOM.el.style.transformOrigin = `${this.letterRect.left + this.letterRect.width / 2}px ${this.letterRect.top + this.letterRect.height / 2}px`;

      if (this.type === 'circle') {
        const r = 0.5 * this.letterRect.width;
        this.DOM.el.setAttribute('r', r);
        this.DOM.el.setAttribute('cx', this.letterRect.left + this.letterRect.width / 2);
        this.DOM.el.setAttribute('cy', this.letterRect.top + this.letterRect.height / 2);
      }
      else if (this.type === 'rect') {
        const w = randomBetween(0.05, 0.5, 3) * this.letterRect.width;
        const h = randomBetween(0.05, 0.5, 3) * this.letterRect.height;
        this.DOM.el.setAttribute('width', w);
        this.DOM.el.setAttribute('height', h);
        this.DOM.el.setAttribute('x', this.letterRect.left + (this.letterRect.width - w) / 2);
        this.DOM.el.setAttribute('y', this.letterRect.top + (this.letterRect.height - h) / 2);
      }
      else if (this.type === 'polygon') {
        this.DOM.el.setAttribute('points', `${this.letterRect.left} ${this.letterRect.top + this.letterRect.height}, ${this.letterRect.left + this.letterRect.width / 2} ${this.letterRect.bottom - this.letterRect.width}, ${this.letterRect.left + this.letterRect.width} ${this.letterRect.top + this.letterRect.height}`);
      }
    }
    onResize(letterRect) {
      this.letterRect = letterRect;
      this.configureShapeType();
    }
  };

  class Letter {
    constructor(el, svg, options) {
      this.DOM = {};
      this.DOM.el = el;
      this.DOM.svg = svg;
      this.options = {
        totalShapes: 10
      }
      Object.assign(this.options, options);
      this.rect = this.DOM.el.getBoundingClientRect();
      this.totalShapes = this.options.totalShapes;
      this.init();
      this.initEvents();
    }
    init() {
      this.shapes = [];
      for (let i = 0; i <= this.totalShapes - 1; ++i) {
        const shape = new Shape('random', this.rect, this.options);
        this.shapes.push(shape);
        this.DOM.svg.appendChild(shape.DOM.el);
      }
    }
    initEvents() {
      window.addEventListener('resize', debounce(() => {
        this.rect = this.DOM.el.getBoundingClientRect();
        for (let i = 0; i <= this.totalShapes - 1; ++i) {
          const shape = this.shapes[i];
          shape.onResize(this.rect);
        }
      }, 20));
    }
  };

  class Word {
    constructor(el, options) {
      this.DOM = {};
      this.DOM.el = el;
      this.options = {
        shapesOnTop: false
      }
      Object.assign(this.options, options);
      this.init();
      this.initEvents();
    }
    init() {
      this.createSVG();
      charming(this.DOM.el);
      this.letters = [];
      Array.from(this.DOM.el.querySelectorAll('span')).forEach(letter => this.letters.push(new Letter(letter, this.DOM.svg, this.options)));
    }
    initEvents() {
      window.addEventListener('resize', debounce(() => {
        winsize = { width: window.innerWidth, height: window.innerHeight };
        this.DOM.svg.setAttribute('width', `${winsize.width}px`);
        this.DOM.svg.setAttribute('height', `${winsize.width}px`);
        this.DOM.svg.setAttribute('viewbox', `0 0 ${winsize.width} ${winsize.height}`);
      }, 20));
    }
    createSVG() {
      this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.DOM.svg.setAttribute('class', 'shapes');
      this.DOM.svg.setAttribute('width', `${winsize.width}px`);
      this.DOM.svg.setAttribute('height', `${winsize.width}px`);
      this.DOM.svg.setAttribute('viewbox', `0 0 ${winsize.width} ${winsize.height}`);
      if (this.options.shapesOnTop) {
        this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el.nextSibling);
      }
      else {
        this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el);
      }
    }
    show(config) {
      return this.toggle('show', config);
    }
    hide(config) {
      return this.toggle('hide', config);
    }
    toggle(action = 'show', config) {
      return new Promise((resolve, reject) => {
        const toggleNow = () => {
          for (let i = 0, len = this.letters.length; i <= len - 1; ++i) {
            this.letters[i].DOM.el.style.opacity = action === 'show' ? 1 : 0;
          }
          resolve();
        };

        if (config && Object.keys(config).length !== 0) {
          if (config.shapesAnimationOpts) {
            for (let i = 0, len = this.letters.length; i <= len - 1; ++i) {
              const letter = this.letters[i];
              setTimeout(function (letter) {
                return () => {
                  config.shapesAnimationOpts.targets = letter.shapes.map(shape => shape.DOM.el);
                  anime.remove(config.shapesAnimationOpts.targets);
                  anime(config.shapesAnimationOpts);
                }
              }(letter), config.lettersAnimationOpts && config.lettersAnimationOpts.delay ? config.lettersAnimationOpts.delay(letter.DOM.el, i) : 0);
            }
          }
          if (config.lettersAnimationOpts) {
            config.lettersAnimationOpts.targets = this.letters.map(letter => letter.DOM.el);
            config.lettersAnimationOpts.complete = () => {
              if (action === 'hide') {
                for (let i = 0, len = config.lettersAnimationOpts.targets.length; i <= len - 1; ++i) {
                  config.lettersAnimationOpts.targets[i].style.transform = 'none';
                }
              }
              resolve();
            };
            anime(config.lettersAnimationOpts);
          }
          else {
            toggleNow();
          }
        }
        else {
          toggleNow();
        }
      });
    }
  };

  window.Word = Word;
};


{
  const effects = [
    // Effect 1
    {
      options: {
        shapeColors: ['#111']
      },
      hide: {
        shapesAnimationOpts: {
          duration: 200,
          delay: (t, i) => i * 20,
          easing: 'easeOutExpo',
          translateX: t => t.dataset.tx,
          translateY: t => t.dataset.ty - anime.random(400, 800),
          scale: t => t.dataset.s,
          rotate: 0,
          opacity: {
            value: 0,
            duration: 200,
            easing: 'linear'
          }
        }
      },
      show: {
        lettersAnimationOpts: {
          duration: 500,
          delay: (t, i) => i * 60,
          easing: 'easeOutExpo',
          opacity: {
            value: [0, 1],
            duration: 50,
            delay: (t, i) => i * 60,
            easing: 'linear'
          },
          translateY: (t, i) => i % 2 ? [anime.random(-350, -300), 0] : [anime.random(300, 350), 0]
        },
        shapesAnimationOpts: {
          duration: () => anime.random(1000, 4000),
          delay: (t, i) => i * 20,
          easing: [0.2, 1, 0.3, 1],
          translateX: t => {
            const tx = anime.random(-200, 200);
            t.dataset.tx = tx;
            return [0, tx];
          },
          translateY: t => {
            const ty = anime.random(-300, 300);
            t.dataset.ty = ty;
            return [0, ty];
          },
          scale: t => {
            const s = randomBetween(0.2, 0.6);
            t.dataset.s = s;
            return [s, s];
          },
          rotate: () => anime.random(-90, 90),
          opacity: {
            value: 0.6,
            duration: 1000,
            easing: 'linear'
          }
        }
      }
    },
  ];

  class ShapeText {
    constructor(el) {
      this.words = [];
      this.words.push(new Word(document.querySelector('.word'), effects.options));
      this.words[0].show(effects[0].show);
    }
    show(direction) {
      anime({
        duration: 600,
        easing: [0.2, 1, 0.3, 1],
        translateY: ['0%', direction === 'next' ? '-100%' : '100%'],
        complete: () => {
          this.words.show(effects.show);
        }
      });
    }
  }

  window.setTimeout(function () {
    const shapeText = new ShapeText(document.querySelector('.slide'));
  }, 4000)
  window.setTimeout(function () {
    document.querySelector('.slide').classList.add('active');
  }, 5000)
}

