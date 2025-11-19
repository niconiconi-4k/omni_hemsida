const container = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;
let intervalId;

function showSlide(i){
    index = (i + slides.length) % slides.length;
    container.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}
function prevSlide() {
    showSlide(index - 1);
}

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 5000); // 5秒切换
}
function stopAutoSlide() {
    clearInterval(intervalId);
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

showSlide(0);
startAutoSlide();
