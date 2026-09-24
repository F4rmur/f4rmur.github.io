const perso = document.getElementById('perso');
const scrollStep = (amount) => {
    const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
    const nextPosition = Math.max(0, Math.min(window.scrollX + amount, maxScroll));

    window.scrollTo({ left: nextPosition, top: 0, behavior: 'auto' });
    perso.style.transform = amount >= 0 ? 'rotateY(0deg)' : 'rotateY(180deg)';
};

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    scrollStep(delta * (event.deltaMode === 1 ? 16 : 1));
}, { passive: false });

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollStep(event.key === 'ArrowRight' ? 80 : -80);
    }
});

const sections = document.querySelectorAll('#zone1, #zone2, #zone3, #zone4');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetElement = document.getElementById(link.getAttribute('href').substring(1));

        if (targetElement) {
            const targetPosition = targetElement.offsetLeft - 500;
            window.scrollTo({ left: Math.max(0, targetPosition), top: 0, behavior: 'smooth' });
            perso.style.transform = targetPosition >= window.scrollX ? 'rotateY(180deg)' : 'rotateY(0deg)';
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, {
    threshold: 0.4,
    rootMargin: '-80px 0px -40% 0px',
});

sections.forEach((section) => observer.observe(section));
