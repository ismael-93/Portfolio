// Main interactions: responsive nav toggle, smooth scroll, active link, theme toggle
document.addEventListener('DOMContentLoaded', function() {
	const navMenu = document.getElementById('nav-menu');
	const navToggle = document.getElementById('nav-toggle');
	const navClose = document.getElementById('nav-close');
	const themeToggle = document.getElementById('theme-toggle');

		function openMenu(){
			if(!navMenu) return;
			navMenu.classList.add('show-menu');
			navToggle && navToggle.setAttribute('aria-expanded','true');
		}
		function closeMenu(){
			if(!navMenu) return;
			navMenu.classList.remove('show-menu');
			navToggle && navToggle.setAttribute('aria-expanded','false');
		}
		if (navToggle) navToggle.addEventListener('click', openMenu);
		if (navClose) navClose.addEventListener('click', closeMenu);

	// Close menu when clicking a link and smooth-scroll to section
	document.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', function(e) {
			const href = this.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					const offset = 10;
					const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset - 60;
					window.scrollTo({ top: topPos, behavior: 'smooth' });
				}
				navMenu.classList.remove('show-menu');
			}
		});
	});

	// Active link on scroll + header shadow
	const sections = document.querySelectorAll('section[id]');
	function scrollActive() {
		const scrollY = window.pageYOffset;
		// header shadow
		const header = document.getElementById('header');
		if(header){
			if(scrollY > 12) header.classList.add('scrolled'); else header.classList.remove('scrolled');
		}
		sections.forEach(section => {
			const sectionHeight = section.offsetHeight;
			const sectionTop = section.offsetTop - 80;
			const sectionId = section.getAttribute('id');
			const link = document.querySelector('.nav-list a[href="#' + sectionId + '"]');
			if (link) {
				if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
					link.classList.add('active-link');
				} else {
					link.classList.remove('active-link');
				}
			}
		});
	}
	window.addEventListener('scroll', scrollActive);
	scrollActive();

	// close menu with Escape
	document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });

	// close menu on larger resize
	window.addEventListener('resize', function(){ if(window.innerWidth > 992) closeMenu(); });

	// Theme utilities (restore applied regardless; toggle only if button exists)
	function applyTheme(isDark){
		if(isDark) document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme');
		if(themeToggle) themeToggle.innerHTML = isDark ? '<i class="bi bi-moon"></i>' : '<i class="bi bi-sun"></i>';
	}

	// restore theme from localStorage
	try{
		const saved = localStorage.getItem('dark-theme');
		applyTheme(saved === '1');
	}catch(e){ /* ignore */ }

	// add click handler if toggle exists
	if(themeToggle){
		// click and pointer handlers
		themeToggle.addEventListener('click', () => {
			console.log('theme-toggle clicked');
			const isDark = !document.body.classList.contains('dark-theme');
			applyTheme(isDark);
			try{ localStorage.setItem('dark-theme', isDark ? '1' : '0'); }catch(e){}
		});
		themeToggle.addEventListener('pointerdown', () => {
			console.log('theme-toggle pointerdown');
		});
		// keyboard activation
		themeToggle.addEventListener('keydown', (e) => {
			if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); themeToggle.click(); }
		});
		// ensure accessibility attributes
		themeToggle.setAttribute('role', 'button');
		themeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-theme') ? 'true' : 'false');
	}

	/* ----------------- Typing effect for #typed ----------------- */
	(function(){
		const el = document.getElementById('typed');
		if(!el) return;
		const roles = (el.dataset.roles||'').split(';').map(s=>s.trim()).filter(Boolean);
		let idx = 0, char = 0, forward = true;
		const speed = 60, pause = 1400;
		function tick(){
			if(!roles.length) return;
			const current = roles[idx];
			if(forward){
				el.textContent = current.slice(0, ++char);
				if(char === current.length){ forward = false; setTimeout(tick, pause); return; }
			} else {
				el.textContent = current.slice(0, --char);
				if(char === 0){ forward = true; idx = (idx+1) % roles.length; }
			}
			setTimeout(tick, forward ? speed : speed/1.5);
		}
		tick();
	})();

	/* ----------------- Typing effect for .typed-text (name animation) ----------------- */
	(function(){
		const typedTextEl = document.querySelector('.typed-text');
		if(!typedTextEl) return;
		const name = 'Ismael Ben Chikh';
		let charIndex = 0;
		
		function typeChar() {
			if (charIndex < name.length) {
				typedTextEl.textContent += name.charAt(charIndex);
				charIndex++;
				setTimeout(typeChar, 100);
			}
		}
		
		// Start typing after the fadeInUp animation completes
		setTimeout(typeChar, 1300);
	})();

	/* ----------------- Reveal animations (simple IntersectionObserver) ----------------- */
	(function(){
		const toReveal = [];
		document.querySelectorAll('.intro h1, .intro .lead, .intro .social-icons, .hero-ctas').forEach(el => { el.classList.add('reveal'); toReveal.push(el); });
		if(!toReveal.length) return;
		const obs = new IntersectionObserver((entries, ob) => {
			entries.forEach(entry => {
				if(entry.isIntersecting){ entry.target.classList.add('show'); ob.unobserve(entry.target); }
			});
		}, { threshold: 0.12 });
		toReveal.forEach(el => obs.observe(el));
	})();
});
