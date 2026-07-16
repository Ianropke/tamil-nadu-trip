// Track Selector & Navigation Scroll Spy Logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Track Selector
  const trackButtons = document.querySelectorAll('.track-btn');
  
  trackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const dest = button.getAttribute('data-dest');
      const track = button.getAttribute('data-track');
      
      // Remove active class from buttons in this destination
      const container = button.closest('.tracks');
      container.querySelectorAll('.track-btn').forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Hide all content for this destination
      container.querySelectorAll('.track-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Show selected content
      const targetContent = document.getElementById(`${dest}-track-${track}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 2. Intersection Observer for Scroll Animations
  const animObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, animObserverOptions);

  // Observe all destination blocks
  document.querySelectorAll('.destination-block').forEach(block => {
    animObserver.observe(block);
  });

  // 3. Scroll Spy for Navigation Highlighting
  const sections = document.querySelectorAll('header[id], section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');

  const navObserverOptions = {
    threshold: 0.25,
    rootMargin: '-10% 0px -60% 0px'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Highlight Desktop Nav Link
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.style.color = 'var(--primary-color)';
          } else {
            link.classList.remove('active');
            link.style.color = '';
          }
        });

        // Highlight Mobile Bottom Nav Item
        bottomNavItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });
});

// Sound Player helper for place names & basic phrases
let activeAudio = null;
window.playAudio = function(filename) {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }
  activeAudio = new Audio(`/audio/${filename}.mp3`);
  activeAudio.play().catch(err => {
    console.warn("Lyd afspilning fejlede:", err);
  });
};
