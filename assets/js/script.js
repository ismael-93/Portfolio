// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
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

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', openMenu);
}
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMenu);
}

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

if (themeToggle) {
    // Check URL parameter for theme
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    
    // Restore theme from URL or localStorage
    const savedTheme = urlTheme || localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = true;
        localStorage.setItem('theme', 'light');
    } else if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        themeToggle.checked = false;
        localStorage.setItem('theme', 'dark');
    }

    // Add theme toggle handler
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            // Switch to light theme
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            console.log('Switched to light theme');
        } else {
            // Switch to dark theme
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            console.log('Switched to dark theme');
        }
    });
} else {
    console.error('Theme toggle button not found!');
}

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
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

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

// Typing effect — géré par enhancements.js (multi-phrases rotatives)
// L'ancien effet simple a été désactivé pour éviter les conflits.


// End of DOMContentLoaded
});