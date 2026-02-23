// Gestion des compétences interactives
document.addEventListener('DOMContentLoaded', function() {
  const skillCards = document.querySelectorAll('.skill-card');
  const skillModal = document.getElementById('skillModal');
  const modalCloseBtn = document.querySelector('.skill-modal-close');

  // Mapping des images pour la modale
  const skillImages = {
    'HTML': 'assets/img/html.png',
    'CSS': 'assets/img/css.png',
    'JavaScript': 'assets/img/javascript.png',
    'PHP': 'assets/img/php.png'
  };

  // Ouvrir la modale au clic sur une carte
  skillCards.forEach(card => {
    card.addEventListener('click', function() {
      const skillName = this.getAttribute('data-skill');
      const skillDescription = this.getAttribute('data-description');
      const skillImage = skillImages[skillName] || 'assets/img/html.png';

      // Remplir les éléments de la modale
      document.getElementById('modalSkillTitle').textContent = skillName;
      document.getElementById('modalSkillDescription').textContent = skillDescription;
      document.getElementById('modalSkillIcon').src = skillImage;
      document.getElementById('modalSkillIcon').alt = skillName;

      // Afficher la modale
      skillModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Empêcher le scroll
    });
  });

  // Fermer la modale au clic sur le bouton fermer
  modalCloseBtn.addEventListener('click', closeModal);

  // Fermer la modale au clic en dehors du contenu
  skillModal.addEventListener('click', function(e) {
    if (e.target === skillModal) {
      closeModal();
    }
  });

  // Fermer la modale à la touche Echap
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && skillModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Fonction pour fermer la modale
  function closeModal() {
    skillModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Rétablir le scroll
  }
});
