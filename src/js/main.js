// --- Barba
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

// $(function () {
//   barba.init({
//     // We don't want "synced transition"
//     // because both content are not visible at the same time
//     // and we don't need next content is available to start the page transition
//     // sync: true,
//     transitions: [{
//       // NB: `data` was not used.
//       // But usually, it's safer (and more efficient)
//       // to pass the right container as a paramater to the function
//       // and get DOM elements directly from it
//       async leave(data) {
//         // Not needed with async/await or promises
//         // const done = this.async();

//         await pageTransitionIn()
//         // No more needed as we "await" for pageTransition
//         // And i we change the transition duration, no need to update the delay…
//         // await delay(1000)

//         // Not needed with async/await or promises
//         // done()

//         // Loading screen is hiding everything, time to remove old content!
//         data.current.container.remove()
//       },

//       async enter(data) {
//         await pageTransitionOut(data.next.container)
//       },
//       // Variations for didactical purpose…
//       // Better browser support than async/await
//       // enter({ next }) {
//       //   return pageTransitionOut(next.container);
//       // },
//       // More concise way
//       // enter: ({ next }) => pageTransitionOut(next.container),

//       async once(data) {
//         await contentAnimation(data.next.container);
//       }
//     }]
//   });

// });















// --- Hamburger
$('.menu-diamond').click(function () {
  $('.menu').toggleClass('close');
  $('.menu').toggleClass('open');
  $(this).toggleClass('active');
  $('html').toggleClass('hidden');
});

$('.lang__list-item').click(function () {
  $('.lang__list-item').removeClass('active');
  $(this).toggleClass('active');
});



// --- Маленький Header при скролле
$('body').scroll(() => {
  // $("body").css("background-color","red");
  var windowTop = $('body').scrollTop();
  windowTop > 100 ? $('.header').addClass('header-mini') : $('.header').removeClass('header-mini');
});

function generateBalls() {
  for (var i = 0; i < Math.floor(window.innerWidth/30); i++) {
    $(".gooey-animations").append(`
    <div class="ball"></div>
  `);
    var colors = ['#d8d8d8'];
    $(".ball").eq(i).css({"bottom":"-100%","left":Math.random()*window.innerWidth-100,"animation-delay":Math.random()*5+"s","transform":"translateY("+Math.random()*10+"px)","background-color":colors[i%2]});
  }
}
generateBalls();

window.addEventListener('resize', function(e) {
  $(".gooey-animations .ball").remove();
  generateBalls();
})