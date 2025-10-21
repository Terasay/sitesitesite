
document.addEventListener('mousemove', function(e) {
    const eyes = document.querySelectorAll('.eye');
    if (eyes.length < 2) return;
    const rect1 = eyes[0].getBoundingClientRect();
    const rect2 = eyes[1].getBoundingClientRect();
    const centerX = (rect1.left + rect1.width / 2 + rect2.left + rect2.width / 2) / 2;
    const centerY = (rect1.top + rect1.height / 2 + rect2.top + rect2.height / 2) / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx);
    const radius = 12;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    eyes.forEach(function(eye) {
        const pupil = eye.querySelector('.pupil');
        pupil.style.transform = `translate(${px}px, ${py}px)`;
    });
});
