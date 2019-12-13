var slideItems = document.querySelectorAll('.slide');
var indContainter = document.querySelector('.indicators');
var indItems = document.querySelectorAll('.indicator');
var currentSlide = 0;
var slideslength = slideItems.length;
var slideInterval;

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';

document.querySelector('.controls').style.display = 'inline-block';

// console.log('OUTPUT: slideItems', slideItems);

function gotoNSlide(n) {
    // currentSlide будем увеличивать на 1
    // при достижении массива слайдов сбрасывать в 0

    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (slideslength + n) % slideslength;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');

}

function gotoNextSlide() {
    gotoNSlide(currentSlide + 1);
}

function gotoPrevSlide() {
    gotoNSlide(currentSlide - 1);
}

var playbackStatus = true;
var pauseBtn = document.querySelector('#pause');
var prevBtn = document.querySelector('#prev');
var nextBtn = document.querySelector('#next');


function pauseSlideShow() {
    if (playbackStatus) {
        clearInterval(slideInterval);
        pauseBtn.innerHTML = 'Play';
        playbackStatus = !playbackStatus;
    }
}

function playSlideShow() {
    slideInterval = setInterval(gotoNextSlide, 2000);
    pauseBtn.innerHTML = 'Pause';
    playbackStatus = !playbackStatus;
}

function clickPausePlayBtn() {
    if (playbackStatus) {
        pauseSlideShow();
    } else {
        playSlideShow();
    }   
}

function clickPrevBtn() {
    pauseSlideShow();
    gotoPrevSlide();
}

function clickNextBtn() {
    pauseSlideShow();
    gotoNextSlide();
}

pauseBtn.addEventListener('click', clickPausePlayBtn);
nextBtn.addEventListener('click', clickNextBtn); 
prevBtn.addEventListener('click', clickPrevBtn);



function clickIndicatorBtn (e) {
    var target = e.target;

    if (target.classList.contains('indicator')); {
        pauseSlideShow();
        gotoNSlide(+target.getAttribute('data-slide-to'));
    }  
}

function pressKeyControl(e) {
    if (e.key === LEFT_ARROW) clickPrevBtn();
    if (e.key === RIGHT_ARROW) clickNextBtn();
    if (e.key === SPACE) clickPausePlayBtn();
}

document.addEventListener('keydown', pressKeyControl);

indContainter.addEventListener('click', clickIndicatorBtn)

slideInterval = setInterval(gotoNextSlide, 2000);

