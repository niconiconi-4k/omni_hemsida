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

// Cookie Consent Logic
function hasCookieConsent() {
    return localStorage.getItem('omni_cookie_consent') === 'true';
}
function setCookieConsent(val) {
    localStorage.setItem('omni_cookie_consent', val ? 'true' : 'false');
}
function showCookiePopup() {
    const popup = document.getElementById('cookieConsent');
    if (popup) popup.classList.remove('hidden');
}
function hideCookiePopup() {
    const popup = document.getElementById('cookieConsent');
    if (popup) popup.classList.add('hidden');
}
function blockI18NIfNoConsent() {
    if (!hasCookieConsent()) {
        // 禁止 i18n 写入 localStorage
        window.I18N.setLang = function() {};
    }
}
window.addEventListener('DOMContentLoaded', function() {
    // 排除 error404 和 coming-soon 页面
    const path = window.location.pathname;
    if (!/error404|coming-soon/.test(path)) {
        if (!hasCookieConsent()) {
            showCookiePopup();
            blockI18NIfNoConsent();
        }
    }
    const allowBtn = document.getElementById('cookieAllowBtn');
    const denyBtn = document.getElementById('cookieDenyBtn');
    if (allowBtn) {
        allowBtn.onclick = function() {
            setCookieConsent(true);
            hideCookiePopup();
            window.location.reload();
        };
    }
    if (denyBtn) {
        denyBtn.onclick = function() {
            setCookieConsent(false);
            hideCookiePopup();
        };
    }
});
