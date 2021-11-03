//preloader

const counter = document.getElementById('preloader-counter');
const preloader = document.getElementById('preloader');

setTimeout(()=> {
    counter.innerText = '30%';
}, 250)

setTimeout(()=> {
    counter.innerText = '68%';
}, 750)

setTimeout(()=> {
    counter.innerText = '87%';
}, 1000)

setTimeout(()=> {
    counter.innerText = '100%';
}, 1500)

setTimeout(()=> {
    preloader.style.display = 'none';
}, 2000)

//slider

let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector('.slider-inner');

const end = () => {
	isDown = false;
  slider.classList.remove('active');
}

const start = (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;	
}

const move = (e) => {
	if(!isDown) return;

  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
  const dist = (x - startX);
  slider.scrollLeft = scrollLeft - dist;
}

slider.addEventListener('mousedown', start);
slider.addEventListener('touchstart', start);

slider.addEventListener('mousemove', move);
slider.addEventListener('touchmove', move);

slider.addEventListener('mouseleave', end);
slider.addEventListener('mouseup', end);
slider.addEventListener('touchend', end);

// scroll-to-top

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const upArrow = document.getElementById('arrow-up');
upArrow.addEventListener('click', topFunction);

// mobile nav

const line = document.querySelector('.line');
const mobileNavOpen = document.querySelector('.mobile-nav-open');
const body = document.querySelector('body');

line.addEventListener('click', ()=> {
    mobileNavOpen.classList.toggle('block');
    body.classList.toggle('stop-scrolling');
})

const close = document.getElementById('close');

close.addEventListener('click', ()=> {
    mobileNavOpen.classList.toggle('block');
    body.classList.toggle('stop-scrolling');
})

// testimonials 

const data = [
    {
        name:'Jamie K Cohen',
        quote: 'Déplacé Maison is a convincer for anticipation. The urban trekking as nevers seen before. An exceptional product that has no equal alongside a great team represent the brand professionally.'
    },
    {
        name:'William Gibson',
        quote:'Good things come to those who wait – Déplacé Maison is what has been missing in the modern fashion industry for years. Buy a shoe of high quality and design it finally happened.'
    }
]
let i = 0;
let testimonialName = document.querySelector('.testimonial-name');
let testimonialQuote = document.querySelector('.testimonial-quote');

const timer = setInterval(()=> {
    if(i > 1){ 
        i = 0;
    }
    testimonialName.innerText = data[i].name;
    testimonialQuote.innerText = data[i].quote;
    i++;
}, 5000)

// Ink Mode

const inkToggle = document.getElementById('ink-mode');
let verticalLogo = document.querySelector('.vertical-logo');
let newsletterLogo = document.querySelector('.newsletter');
let facebookLogo = document.getElementById('facebook');
let instagramLogo = document.getElementById('instagram');

inkToggle.addEventListener('click', ()=> {
  body.classList.toggle('ink');

  if(body.classList.contains('ink')){
    verticalLogo.src = 'images/ink-logo-vert.svg';
    newsletterLogo.src = 'images/newsletter-side.svg';
    upArrow.src = 'images/arrow-up-ink.svg';
    facebookLogo.src = 'images/facebook2.svg';
    instagramLogo.src = 'images/instagram2.svg';
  } else {
    verticalLogo.src = 'images/de-logotype-vert.svg';
    newsletterLogo.src = 'images/newsletter-face.svg';
    upArrow.src = 'images/arrow-up.svg';
    facebookLogo.src = 'images/facebook1.svg';
    instagramLogo.src = 'images/instagram1.svg';
  }

})

//cursor 

const TAIL_LENGTH = 20;

const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(TAIL_LENGTH).fill({x: 0, y: 0});

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle') ;
    cursor.append(div);
  }
  cursorCircles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {  
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });
    
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];
    
    let xDiff = next.x - current.x;
    let yDiff = next.y - current.y;
    
    current.x += xDiff * 0.35;
    current.y += yDiff * 0.35;
    cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/TAIL_LENGTH})`;  
  }
  requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();