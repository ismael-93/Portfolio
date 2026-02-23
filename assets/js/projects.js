// Gestion des projets interactifs avec filtrage
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Gestion du filtrage par catégorie
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      // Mettre à jour le bouton actif
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filtrer les cartes
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Animation d'entrée
          setTimeout(() => {
            card.style.animation = 'fadeIn 0.5s ease';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Gestion des clics sur les cartes
  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Ignorer si on clique sur la carte cachée
      if (this.classList.contains('hidden')) return;
      
      const projectUrl = this.getAttribute('data-project-url');
      const projectTitle = this.getAttribute('data-project-title');
      
      // Vérifier si c'est un lien valide
      if (projectUrl && projectUrl !== '#') {
        window.open(projectUrl, '_blank');
      } else {
        showProjectAlert(projectTitle);
      }
    });

    // Cursor pointer
    card.addEventListener('mouseenter', function() {
      if (!this.classList.contains('hidden')) {
        this.style.cursor = 'pointer';
      }
    });
  });

  // Fonction pour afficher une alerte personnalisée
  function showProjectAlert(projectTitle) {
    const message = `Le projet "${projectTitle}" sera bientôt disponible ! 🚀`;
    alert(message);
    console.info(message);
  }
});

// Animation fadeIn pour le filtrage
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
