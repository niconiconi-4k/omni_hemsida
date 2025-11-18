const container = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;

function showSlide(i){
    index = (i + slides.length) % slides.length;
    container.style.transform = `translateX(${-index * 100}%)`;
}

prevBtn.addEventListener('click', ()=> showSlide(index-1));
nextBtn.addEventListener('click', ()=> showSlide(index+1));

// 自动轮播
setInterval(()=> showSlide(index+1), 5000);
