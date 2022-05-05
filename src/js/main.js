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





// // --- Infinite Animate Text
// let parent = document.querySelectorAll('.animate-text');
// for (let i = 0; i < parent.length; i++) {
//   parent[i].style.width = parent[i].children[0].clientWidth + "px";
// };


// $('.think__inner').hover(
//   function () {
//     $('.think__images').css('opacity', 1);
//   },
// );

// $('.think__item1').hover(
//   function () {
//     $('.think__img1').css('z-index', 2);
//     $('.think__img2').css('z-index', 1);
//   },
// );
// $('.think__item2').hover(
//   function () {
//     $('.think__img1').css('z-index', 1);
//     $('.think__img2').css('z-index', 2);
//   },
// );


function delay(n) {
  n = n || 2000
  // Keep official documentation wording, done -> resolve
  // and make it more concise
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}

const loadingScreen = document.querySelector('.loading-screen')
const loadingScreen2 = document.querySelector('.loading-screen2')
const mainNavigation = document.querySelector('.main-navigation')

// Function to add and remove the page transition screen
function pageTransitionIn() {
  // GSAP methods can be chained and return directly a promise
  // but here, a simple tween is enough
  return gsap
    .timeline()
    // .set(loadingScreen, { transformOrigin: 'bottom left'})
    // .to(loadingScreen, { duration: .5, scaleY: 1 })
    .to(loadingScreen, {
      duration: .5,
      scaleX: 1,
      transformOrigin: 'left'
    })
    .to(loadingScreen2, {
      duration: .9,
      scaleX: 1,
      transformOrigin: 'left'
    })
}
// Function to add and remove the page transition screen
function pageTransitionOut(container) {
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 1 }) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .to(loadingScreen, {
      duration: 0.5,
      scaleX: 0,
      skewX: 0,
      transformOrigin: 'right',
      ease: 'power1.out'
    }, 'start')
    .to(loadingScreen2, {
      duration: 0.9,
      scaleX: 0,
      skewX: 0,
      transformOrigin: 'right',
      ease: 'power1.out'
    })
    .call(contentAnimation, [container], 'start')
}

// Function to animate the content of each page
function contentAnimation(container) {
  // Query from container
  $(container.querySelector('.green-heading-bg')).addClass('show')
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline()
    .from(container.querySelector('.is-animated'), {
      duration: 0.5,
      translateY: 10,
      opacity: 0,
      stagger: 0.4
    })
    .from(mainNavigation, { duration: .5, translateY: -10, opacity: 0 })
}

$(function () {
  barba.init({
    // We don't want "synced transition"
    // because both content are not visible at the same time
    // and we don't need next content is available to start the page transition
    // sync: true,
    transitions: [{
      // NB: `data` was not used.
      // But usually, it's safer (and more efficient)
      // to pass the right container as a paramater to the function
      // and get DOM elements directly from it
      async leave(data) {
        // Not needed with async/await or promises
        // const done = this.async();

        await pageTransitionIn()
        // No more needed as we "await" for pageTransition
        // And i we change the transition duration, no need to update the delay…
        // await delay(1000)

        // Not needed with async/await or promises
        // done()

        // Loading screen is hiding everything, time to remove old content!
        data.current.container.remove()
      },

      async enter(data) {
        await pageTransitionOut(data.next.container)
      },
      // Variations for didactical purpose…
      // Better browser support than async/await
      // enter({ next }) {
      //   return pageTransitionOut(next.container);
      // },
      // More concise way
      // enter: ({ next }) => pageTransitionOut(next.container),

      async once(data) {
        await contentAnimation(data.next.container);
      }
    }]
  });

});

// document.querySelector('.loader__video').play();

// document.getElementById('btnn').addEventListener('click', function () {
//   document.querySelector('.menu').classList.toggle('class1');
// });

$('.menu-diamond').click(function () {
  $('.menu').toggleClass('close');
  $('.menu').toggleClass('open');
  $(this).toggleClass('active');
});

$('.lang__list-item').click(function () {
  $('.lang__list-item').removeClass('active');
  $(this).toggleClass('active');
});


// --- Маленький Header при скролле
$(window).scroll(() => {
  var windowTop = $(window).scrollTop();
  windowTop > 10 ? $('.header').addClass('header-mini') : $('.header').removeClass('header-mini');
});
if ($(window).scrollTop() > 10) {
  $('.header').addClass('header-mini')
} else {
  $('.header').removeClass('header-mini');
}


$(document).ready(function () {
  function whichAnimationEvent() {
    var t,
      el = document.createElement("fakeelement");

    var animations = {
      "animation": "animationend",
      "OAnimation": "oAnimationEnd",
      "MozAnimation": "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }

  var animationEvent = whichAnimationEvent();


  $('#clickThis').click(
    // pageTransition11()
    function pageTransition11() {
      $('.container').fadeOut(500);
      $('.container').promise().done(function () {
        // After animation ends
        $('.overlay .revealer:nth-child(1)').addClass('slideIn-1');
        $('.overlay .revealer:nth-child(2)').addClass('slideIn-2');
        $('.container').delay(500).fadeIn();
        // After animation ends
        $('.overlay .revealer:nth-child(1)').one(animationEvent,
          function (event) {

            $('.overlay .revealer:nth-child(1)').removeClass('slideIn-1');
            $('.overlay .revealer:nth-child(2)').removeClass('slideIn-2');
          });
      });
    }
  )

});


// const LANDING = {};
// LANDING.intro = document.querySelector(".intro-screen");
// LANDING.start = LANDING.intro.querySelector("div#start");
// LANDING.path = LANDING.intro.querySelector("path");

// const svgAnimation = () => {

//   anime({
//     targets: LANDING.intro,
//     duration: 2000,
//     easing: "easeInOutSine",
//     translateY: "-200vh"
//   });

//   anime({
//     targets: LANDING.path,
//     duration: 1500,
//     easing: "easeInOutSine",
//     d: LANDING.path.getAttribute("pathdata:id")
//   });

// };

// window.onload = function () {
//   svgAnimation();
// }






$("body").css("background-color","red");
