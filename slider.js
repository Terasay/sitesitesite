document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let current = 0;
    let timer;
    const interval = 6000;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
            dots[i].classList.remove('active');
        });
        slides[idx].classList.add('active');
        slides[idx].style.opacity = '1';
        slides[idx].style.zIndex = '1';
        dots[idx].classList.add('active');
        current = idx;
    }

    function nextSlide() {
        let next = (current + 1) % slides.length;
        showSlide(next);
    }

    function startSlider() {
        timer = setInterval(nextSlide, interval);
    }

    function stopSlider() {
        clearInterval(timer);
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(idx);
            startSlider();
        });
    });

    // Инициализация
    showSlide(0);
    startSlider();
});
