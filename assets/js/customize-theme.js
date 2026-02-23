// Ensure theme is applied early: prefer saved preference, otherwise use OS preference
document.addEventListener('DOMContentLoaded', function() {
  try {
    const saved = localStorage.getItem('dark-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // default: dark unless user explicitly opted out (saved === '0')
    const useDark = (saved === '1') || (saved === null ? true : saved !== '0' && prefersDark);
    if (useDark) document.body.classList.add('dark-theme');

    // keep toggle button in sync if present
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '<i class="bi bi-moon"></i>' : '<i class="bi bi-sun"></i>';
  } catch (e) {
    // silent
  }
});

// expose helper for other scripts if needed
window.customizeTheme = {
  apply: function(isDark) {
    if (isDark) document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme');
    try { localStorage.setItem('dark-theme', isDark ? '1' : '0'); } catch (e) {}
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '<i class="bi bi-moon"></i>' : '<i class="bi bi-sun"></i>';
  }
};
