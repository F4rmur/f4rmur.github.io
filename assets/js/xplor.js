const perso = document.getElementById('perso');
const landscapes = document.querySelectorAll('.landscape');
const persoScale = 3;
let movementTimer;
let parallaxFrame;
const progressSections = Array.from(document.querySelectorAll('main > section'));
const progressHud = document.createElement('aside');
const progressTitle = document.createElement('span');
const progressBar = document.createElement('div');
const progressFill = document.createElement('span');

progressHud.className = 'xplor-hud';
progressHud.setAttribute('aria-label', 'Repères de navigation');

const progressKicker = document.createElement('span');
progressKicker.className = 'xplor-hud-kicker';
progressKicker.textContent = 'EXPLORATION';

progressTitle.className = 'xplor-hud-title';

progressBar.className = 'xplor-hud-progress';
progressBar.setAttribute('role', 'progressbar');
progressBar.setAttribute('aria-label', 'Progression dans cet univers');
progressBar.setAttribute('aria-valuemin', '1');
progressBar.setAttribute('aria-valuemax', String(progressSections.length));
progressFill.className = 'xplor-hud-progress-fill';
progressBar.append(progressFill);

const progressControls = document.createElement('div');
progressControls.className = 'xplor-hud-controls';
const wheelHint = document.createElement('span');
wheelHint.textContent = 'Molette pour avancer';
const keyboardHint = document.createElement('span');
keyboardHint.textContent = '← → clavier';
progressControls.append(wheelHint, keyboardHint);

progressHud.append(progressKicker, progressTitle, progressBar, progressControls);
document.body.append(progressHud);

const nextWorldLink = document.querySelector('.world-navigation-next');

const positionWorldNavigation = () => {
    if (nextWorldLink) {
        nextWorldLink.style.left = `${document.documentElement.scrollWidth - nextWorldLink.offsetWidth}px`;
    }
};

if (nextWorldLink) {
    positionWorldNavigation();
    window.addEventListener('resize', positionWorldNavigation);
}

const updateProgress = () => {
    if (progressSections.length === 0) {
        return;
    }

    const activationPoint = window.scrollX + window.innerWidth * 0.45;
    let activeIndex = 0;

    progressSections.forEach((section, index) => {
        if (section.offsetLeft <= activationPoint) {
            activeIndex = index;
        }
    });

    const activeHeading = progressSections[activeIndex].querySelector('h1, h2');
    progressTitle.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(progressSections.length).padStart(2, '0')} · ${activeHeading ? activeHeading.textContent.trim() : 'Exploration'}`;
    progressBar.setAttribute('aria-valuenow', String(activeIndex + 1));
    progressFill.style.width = `${((activeIndex + 1) / progressSections.length) * 100}%`;
};

const setPersoDirection = (direction) => {
    perso.style.transform = `rotateY(${direction}deg) scale(${persoScale})`;
};

const updateParallax = () => {
    parallaxFrame = undefined;
    const scrollPosition = window.scrollX;

    landscapes.forEach((landscape) => {
        const indexMatch = landscape.className.match(/-(\d+)$/);
        const layerIndex = indexMatch ? Number(indexMatch[1]) : 1;
        const layerSpeed = 1 - ((layerIndex - 1) * 0.1);
        const offset = scrollPosition * layerSpeed;

        landscape.style.backgroundPositionX = `${-offset}px`;
    });

    updateProgress();
};

const requestParallaxUpdate = () => {
    if (!parallaxFrame) {
        parallaxFrame = window.requestAnimationFrame(updateParallax);
    }
};

const showRunningAnimation = () => {
    perso.classList.add('is-running');
    window.clearTimeout(movementTimer);
    movementTimer = window.setTimeout(() => {
        perso.classList.remove('is-running');
    }, 180);
};

const scrollStep = (amount) => {
    const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
    const nextPosition = Math.max(0, Math.min(window.scrollX + amount, maxScroll));

    window.scrollTo({ left: nextPosition, top: 0, behavior: 'auto' });
    setPersoDirection(amount >= 0 ? 0 : 180);
    showRunningAnimation();
};

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    scrollStep(delta * (event.deltaMode === 1 ? 16 : 1));
}, { passive: false });

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
requestParallaxUpdate();

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
            setPersoDirection(targetPosition >= window.scrollX ? 180 : 0);
            showRunningAnimation();
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
