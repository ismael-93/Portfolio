/* ═══════════════════════════════════════════════════════════════
   enhancements.js — Portfolio Ismael Ben Chikh
   Fonctionnalités : scroll progress, back-to-top, stats counter,
                     typing effect, skill bars, scroll reveal
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ─────────────────────────────────────────────────────
       1. BARRE DE PROGRESSION DU SCROLL
    ───────────────────────────────────────────────────── */
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = pct + '%';
    }

    /* ─────────────────────────────────────────────────────
       2. BOUTON RETOUR EN HAUT
    ───────────────────────────────────────────────────── */
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (!backToTop) return;
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ─────────────────────────────────────────────────────
       3. EFFET DE FRAPPE MULTI-PHRASES
    ───────────────────────────────────────────────────── */
    const typedTextEl = document.querySelector('.typed-text');
    if (typedTextEl) {
        const phrases = [
            'Web',
            'PHP',
            'JavaScript',
            'C# / WPF',
            'Full-Stack',
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 120;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 60;
            } else {
                typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 120;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause avant d'effacer
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 300;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Démarrage différé pour laisser l'animation hero se charger
        setTimeout(typeEffect, 2000);
    }

    /* ─────────────────────────────────────────────────────
       4. COMPTEURS DE STATS ANIMÉS
    ───────────────────────────────────────────────────── */
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(function () {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 16);
    }

    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            countersStarted = true;
            document.querySelectorAll('.hero-stat-number').forEach(function (el) {
                animateCounter(el);
            });
        }
    }

    /* ─────────────────────────────────────────────────────
       5. BARRES DE PROGRESSION DES COMPÉTENCES
    ───────────────────────────────────────────────────── */
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const animatedBars = new Set();

    function animateSkillBars() {
        skillBars.forEach(function (bar) {
            if (animatedBars.has(bar)) return;
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                animatedBars.add(bar);
                const width = bar.getAttribute('data-width') || '0';
                bar.style.width = width + '%';
            }
        });
    }

    /* ─────────────────────────────────────────────────────
       6. SCROLL REVEAL (apparition au scroll)
    ───────────────────────────────────────────────────── */
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Observer tous les éléments à révéler
    document.querySelectorAll('.reveal-item, .reveal-section, .highlight-card, .about-card, .skill-bar-group, .timeline-item, .stage-card, .project-card').forEach(function (el) {
        el.classList.add('reveal-ready');
        revealObserver.observe(el);
    });

    /* ─────────────────────────────────────────────────────
       7. LISTENER DE SCROLL UNIQUE (performance)
    ───────────────────────────────────────────────────── */
    window.addEventListener('scroll', function () {
        updateScrollProgress();
        toggleBackToTop();
        animateSkillBars();
        startCounters();
    }, { passive: true });

    // Appel initial
    updateScrollProgress();
    toggleBackToTop();
    startCounters();
    animateSkillBars();

    /* ─────────────────────────────────────────────────────
       8. SMOOTH HIGHLIGHT NAVBAR (amélioration)
    ───────────────────────────────────────────────────── */
    // Tooltips légers sur les icônes nav
    document.querySelectorAll('.social-links a').forEach(function (link) {
        link.setAttribute('tabindex', '0');
    });

    /* ─────────────────────────────────────────────────────
       9. ANIMATION D'ENTRÉE DES CARTES PROJETS (stagger)
    ───────────────────────────────────────────────────── */
    const projectObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('revealed');
                }, i * 80);
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.project-card').forEach(function (card) {
        projectObserver.observe(card);
    });

    /* ─────────────────────────────────────────────────────
       10. TOAST NOTIFICATIONS
    ───────────────────────────────────────────────────── */
    function showToast(message, type) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        const icon = toast.querySelector('.toast-icon i');
        const msg  = toast.querySelector('.toast-msg');

        if (type === 'error') {
            if (icon) { icon.className = 'fas fa-exclamation-circle'; icon.style.color = '#ef4444'; }
        } else {
            if (icon) { icon.className = 'fas fa-check-circle'; icon.style.color = '#22c55e'; }
        }
        if (msg) msg.textContent = message;

        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 4000);
    }

    /* ─────────────────────────────────────────────────────
       11. FORMULAIRE CONTACT — bouton loading
    ───────────────────────────────────────────────────── */
    const contactForm = document.getElementById('contactFormMain');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const btn      = contactForm.querySelector('#contact-submit');
            const btnText  = btn ? btn.querySelector('.btn-text')    : null;
            const btnLoad  = btn ? btn.querySelector('.btn-loading') : null;

            if (btn)     btn.disabled        = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoad) btnLoad.style.display = 'flex';

            // Le formulaire se soumet normalement (action formsubmit.co)
            // On rétablit le bouton après 5s en cas d'erreur réseau
            setTimeout(function () {
                if (btn)     btn.disabled        = false;
                if (btnText) btnText.style.display = '';
                if (btnLoad) btnLoad.style.display = 'none';
            }, 5000);
        });
    }

    /* ─────────────────────────────────────────────────────
       12. EASTER EGG CONSOLE
    ───────────────────────────────────────────────────── */
    console.log('%c👋 Bonjour développeur !', 'color: #64ffda; font-size: 18px; font-weight: bold;');
    console.log('%c Portfolio réalisé par Ismael Ben Chikh — BTS SIO SLAM 2026', 'color: #9ca3af; font-size: 13px;');
    console.log('%c Stack : HTML5, CSS3, JavaScript, PHP, C#, MySQL', 'color: #64ffda; font-size: 12px;');

    /* ─────────────────────────────────────────────────────
       13. HIGHLIGHT ACTIVE NAV LINK (amélioration douce)
    ───────────────────────────────────────────────────── */
    const navLinks2 = document.querySelectorAll('.sidebar nav a');
    navLinks2.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks2.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
        });
    });

});

/* ═══════════════════════════════════════════════════════════════
   14. PARTICULES HERO — Canvas léger
   ═══════════════════════════════════════════════════════════════ */
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function getAccentRgb() {
        // Lit la variable CSS --accent-color-rgb (ex: "100, 255, 218")
        const val = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent-color-rgb').trim();
        const parts = val.split(',').map(Number);
        return (parts.length === 3 && !parts.some(isNaN)) ? parts : [100, 255, 218];
    }

    function resize() {
        const section = document.getElementById('home');
        if (!section) return;
        canvas.width  = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    function makeParticle() {
        return {
            x:  Math.random() * canvas.width,
            y:  Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r:  Math.random() * 1.6 + 0.4,
            o:  Math.random() * 0.35 + 0.08
        };
    }

    function init() {
        resize();
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 65);
        particles = Array.from({ length: count }, makeParticle);
    }

    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const [R, G, B] = getAccentRgb();

        particles.forEach(function (p) {
            // Mouvement
            p.x += p.vx;
            p.y += p.vy;
            // Reboucler
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width)  p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Point
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + p.o + ')';
            ctx.fill();
        });

        // Connexions entre particules proches
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxD = 130;

                if (dist < maxD) {
                    const alpha = (1 - dist / maxD) * 0.12;
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + alpha + ')';
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        animFrame = requestAnimationFrame(drawFrame);
    }

    init();
    drawFrame();

    window.addEventListener('resize', function () {
        cancelAnimationFrame(animFrame);
        init();
        drawFrame();
    }, { passive: true });

    // Ré-init si le thème change (accent color change)
    document.addEventListener('themeChanged', function () {
        cancelAnimationFrame(animFrame);
        drawFrame();
    });
})();

/* ═══════════════════════════════════════════════════════════════
   15. BARRES LANGUES & APPRENTISSAGE — Scroll reveal
   ═══════════════════════════════════════════════════════════════ */
(function () {
    var langBars     = document.querySelectorAll('.lang-fill');
    var learningBars = document.querySelectorAll('.learning-bar-fill');
    var doneL = new Set();
    var doneR = new Set();

    function animBars(bars, done) {
        bars.forEach(function (bar) {
            if (done.has(bar)) return;
            var rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 40) {
                done.add(bar);
                var w = bar.getAttribute('data-width') || '0';
                bar.style.width = w + '%';
            }
        });
    }

    window.addEventListener('scroll', function () {
        animBars(langBars, doneL);
        animBars(learningBars, doneR);
    }, { passive: true });

    // Vérification initiale (si la section est déjà visible)
    animBars(langBars, doneL);
    animBars(learningBars, doneR);

    // Observer les nouvelles sections pour le scroll-reveal
    if (typeof IntersectionObserver !== 'undefined') {
        var newSections = document.querySelectorAll('#languages .reveal-item, #learning .reveal-item');
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
        newSections.forEach(function (el) {
            el.classList.add('reveal-ready');
            obs.observe(el);
        });
    }
})();
