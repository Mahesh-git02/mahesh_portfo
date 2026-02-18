// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// Intersection Observer for fade-in
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.service-card, .achievement-card, .contact-card, .timeline-item, .stat-card, .about-content, .activity-card'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Parallax shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.shape').forEach((shape, index) => {
        shape.style.transform = `translateY(${scrolled * (index + 1) * 0.1}px)`;
    });
});

// Stat card hover
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// Cursor trail (desktop only)
if (window.innerWidth > 768) {
    let mouseCircle = null;
    document.addEventListener('DOMContentLoaded', () => {
        mouseCircle = document.createElement('div');
        mouseCircle.style.cssText = `
            position: fixed; width: 20px; height: 20px; border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 107, 157, 0.5), transparent);
            pointer-events: none; z-index: 9999; transition: transform 0.1s ease; mix-blend-mode: screen;
        `;
        document.body.appendChild(mouseCircle);
    });
    document.addEventListener('mousemove', (e) => {
        if (mouseCircle) {
            mouseCircle.style.left = e.clientX - 10 + 'px';
            mouseCircle.style.top  = e.clientY - 10 + 'px';
        }
    });
}

// Stats stagger
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-card').forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 100);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsGrid);
}

// Image glow rotation
const imageGlow = document.querySelector('.image-glow');
if (imageGlow) {
    let rotation = 0;
    setInterval(() => { rotation += 0.5; imageGlow.style.transform = `rotate(${rotation}deg)`; }, 50);
}

// Page load fade
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});

// Button ripple
document.querySelectorAll('button, .btn-primary').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            position: absolute; width: ${size}px; height: ${size}px; border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${e.clientX - rect.left - size / 2}px;
            top:  ${e.clientY - rect.top  - size / 2}px;
            transform: scale(0); animation: ripple 0.6s ease-out; pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(rippleStyle);

// Hero title fade
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && window.innerWidth > 768) {
    heroTitle.style.opacity = '0';
    setTimeout(() => { heroTitle.style.opacity = '1'; heroTitle.style.animation = 'fadeInUp 0.8s ease'; }, 300);
}

// Scroll progress bar
const indicator = document.createElement('div');
indicator.style.cssText = `
    position: fixed; top: 0; left: 0; width: 0; height: 3px;
    background: linear-gradient(90deg, #ff6b9d, #c770f0);
    z-index: 10000; transition: width 0.1s ease;
`;
document.body.appendChild(indicator);
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    indicator.style.width = pct + '%';
});

// ═══════════════════════════════════════════════════════
//  SLIDER — Achievements & Certifications
// ═══════════════════════════════════════════════════════

/**
 * initSlider(trackId, dotsContainerId)
 *  trackId         – id of the .slider-track element
 *  dotsContainerId – id of the .slider-dots element
 */
function initSlider(trackId, dotsContainerId) {
    const track      = document.getElementById(trackId);
    const dotsBox    = document.getElementById(dotsContainerId);
    if (!track || !dotsBox) return;

    const slides     = Array.from(track.children);
    const total      = slides.length;
    let   current    = 0;

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsBox.appendChild(dot);
    });

    function goTo(index) {
        current = (index + total) % total;          // wrap around
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsBox.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    // Wire up the PREV / NEXT buttons that sit around this slider-track-container
    const wrapper = track.closest('.slider-wrapper');
    wrapper.querySelector('.slider-prev').addEventListener('click', () => goTo(current - 1));
    wrapper.querySelector('.slider-next').addEventListener('click', () => goTo(current + 1));

    // Optional: keyboard arrow support when hovered
    wrapper.setAttribute('tabindex', '0');
    wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Optional: touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
}

// Initialise both sliders after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSlider('achievementSlider', 'achievementDots');
    initSlider('certSlider',        'certDots');
});

console.log('Portfolio loaded successfully! 🚀');