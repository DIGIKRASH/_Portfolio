

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