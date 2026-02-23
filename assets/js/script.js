// Sidebar toggle functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

function openMenu() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
}

function closeMenu() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
}

sidebarToggle.addEventListener('click', openMenu);
sidebarOverlay.addEventListener('click', closeMenu);

// Close menu when clicking a nav link
document.querySelectorAll('.sidebar nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on larger screens
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(isDark) {
    if (isDark) {
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
    }
    themeToggle.checked = !isDark;
}

// Restore theme from localStorage
try {
    const saved = localStorage.getItem('dark-theme');
    if (saved !== null) {
        applyTheme(saved === '1');
    }
} catch (e) { }

// Add theme toggle handler
themeToggle.addEventListener('change', () => {
    const isDark = !body.classList.contains('light-theme');
    applyTheme(isDark);
    try {
        localStorage.setItem('dark-theme', isDark ? '1' : '0');
    } catch (e) { }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar nav a');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.sidebar nav a[href="#${sectionId}"]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);
scrollActive();

// Update current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.animation = 'slideInUp 0.5s ease';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form (optional)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement form submission logic here
        alert('Merci pour votre message!');
        contactForm.reset();
    });
}

// Typing effect for homepage name animation
document.addEventListener('DOMContentLoaded', function() {
    const typedTextEl = document.querySelector('.typed-text');
    if (!typedTextEl) return;
    
    const name = 'Ismael Ben Chikh';
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < name.length) {
            typedTextEl.textContent += name.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100);
        }
    }
    
    // Start typing immediately 
    typeChar();
});
