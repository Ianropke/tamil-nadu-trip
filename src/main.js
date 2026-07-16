// Track Selector Logic
document.addEventListener('DOMContentLoaded', () => {
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

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // observer.unobserve(entry.target); // Optional: if you want it to animate only once
      }
    });
  }, observerOptions);

  // Observe all destination blocks
  document.querySelectorAll('.destination-block').forEach(block => {
    observer.observe(block);
  });
});
