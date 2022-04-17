// Register GSAP plugins
gsap.registerPlugin(SplitText);
gsap.config({ trialWarn: false });

const ring = document.querySelector('.ring');

// replace spaces with &nbsp; element to make math easier (could also manually add these, if you )
const content = ring.textContent.replaceAll(/\s/g, "&nbsp;");
ring.innerHTML = content

// GSAP Split text into characters (could also just use a lot of spans, but this makes it easier) 
// using position: 'absolute' for positioning all to center
const ringText = new SplitText(ring, { type: "chars", position: 'absolute', });

// chars array
const chars = ringText.chars;

// circumference is width of text
const circumference = gsap.getProperty('.ring', 'width');

// get radius with math based on circumference c = 2πr
const radius = (circumference / Math.PI) / 2;

// set updating variables
let currentWidth = 0;

chars.forEach((char) => {
  // get width of current character to be used to get angle 
  const letterWidth = gsap.getProperty(char, 'width')
  const width = currentWidth;
  // Get rotation degrees based on current position on circle and knowledge of circumference (cross multiply and divide) 
  // really wish I knew why the * 1.135 is needed, but it prevents overlap. Determined by trial and error, sadly... 
  const rotation = ((width + (letterWidth / 2)) * 360 / (circumference * 1.1333));

  // get letter height for transform origin   
  const letterHeight = gsap.getProperty(char, 'height');

  // set rotation and transform-origin based on above math. Set all letters to center.  
  gsap.set(char, {
    rotation: `${rotation}deg`,
    transformOrigin: `center ${Math.ceil(radius + letterHeight)}px`,
    xPercent: -50,
    left: '50%',
  });

  currentWidth += letterWidth;
})

// recenter circle
gsap.set(chars, { y: -radius });
// make it visible to avoid FOUC
gsap.set(ring, { autoAlpha: 1 });

// rotate at a rate of 50px per second (cross multiply and divide)
gsap.to(chars, { rotation: '-=360deg', duration: (circumference * 1.135) * 1 / 50, ease: 'none', repeat: -1 })