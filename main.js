// Main JavaScript for Portfolio Interactions

class PortfolioApp {
  constructor() {
    this.currentSection = 'about';
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupAnimations();
    this.setupResponsive();
    this.startTypingAnimation();
  }

  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const targetSection = item.getAttribute('data-section');
        this.switchSection(targetSection, navItems, sections);
      });
    });
  }

  switchSection(targetSection, navItems, sections) {
    // Remove active class from all nav items and sections
    navItems.forEach(item => item.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));

    // Add active class to clicked nav item and corresponding section
    const activeNavItem = document.querySelector(`[data-section="${targetSection}"]`);
    const activeSection = document.getElementById(targetSection);

    if (activeNavItem && activeSection) {
      activeNavItem.classList.add('active');
      activeSection.classList.add('active');
      this.currentSection = targetSection;

      // Close mobile menu if open
      if (this.isMobile) {
        this.closeMobileMenu();
      }

      // Trigger section-specific animations
      this.triggerSectionAnimations(targetSection);
    }
  }

  setupMobileMenu() {
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileToggle);

    const sidebar = document.querySelector('.sidebar');

    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      icon.className = sidebar.classList.contains('mobile-open') ? 
        'fas fa-times' : 'fas fa-bars';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMobile && 
          !sidebar.contains(e.target) && 
          !mobileToggle.contains(e.target) &&
          sidebar.classList.contains('mobile-open')) {
        this.closeMobileMenu();
      }
    });
  }

  closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    sidebar.classList.remove('mobile-open');
    if (mobileToggle) {
      const icon = mobileToggle.querySelector('i');
      icon.className = 'fas fa-bars';
    }
  }

  setupAnimations() {
    // Animate tech stack items on hover
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        this.animateTechItem(item);
      });
    });

    // Animate certification cards
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateCertCard(card);
      });
    });

    // Animate stats on scroll
    this.setupScrollAnimations();
  }

  animateTechItem(item) {
    const icon = item.querySelector('i');
    icon.style.transform = 'scale(1.2) rotate(5deg)';
    
    setTimeout(() => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  animateCertCard(card) {
    const icon = card.querySelector('.cert-icon');
    icon.style.transform = 'scale(1.1) rotate(3deg)';
    
    setTimeout(() => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
      '.stat-item, .timeline-item, .cert-card, .tech-item'
    );
    
    animateElements.forEach(el => observer.observe(el));
  }

  animateElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  }

  startTypingAnimation() {
    const titleElement = document.querySelector('.profile-title');
    if (!titleElement) return;

    const titles = [
      'Software Engineer Student',
      'Full-Stack Developer',
      'Problem Solver'
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentTitle = '';

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const fullTitle = titles[currentIndex];
      
      if (isDeleting) {
        currentTitle = fullTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentTitle = fullTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      titleElement.textContent = currentTitle;

      let typeTimeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === fullTitle.length) {
        typeTimeout = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % titles.length;
      }

      setTimeout(type, typeTimeout);
    };

    // Start typing animation after a delay
    setTimeout(type, 1000);
  }

  triggerSectionAnimations(section) {
    switch (section) {
      case 'tech-stack':
        this.animateTechStack();
        break;
      case 'education':
        this.animateTimeline();
        break;
      case 'certifications':
        this.animateCertifications();
        break;
      case 'about':
        this.animateStats();
        break;
    }
  }

  animateTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.8)';
        
        requestAnimationFrame(() => {
          item.style.transition = 'all 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        });
      }, index * 100);
    });
  }

  animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        requestAnimationFrame(() => {
          item.style.transition = 'all 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        });
      }, index * 200);
    });
  }

  animateCertifications() {
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        
        requestAnimationFrame(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        });
      }, index * 150);
    });
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const finalNumber = parseInt(stat.textContent);
      let currentNumber = 0;
      const increment = finalNumber / 30;
      
      const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
          stat.textContent = finalNumber + '+';
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(currentNumber) + '+';
        }
      }, 50);
    });
  }

  setupResponsive() {
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      
      // If switching from mobile to desktop, close mobile menu
      if (wasMobile && !this.isMobile) {
        this.closeMobileMenu();
      }
    });
  }
}

// Utility functions for additional effects
class ParticleEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  
  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const sections = ['about', 'tech-stack', 'education', 'certifications'];
  const currentIndex = sections.indexOf(document.querySelector('.nav-item.active')?.getAttribute('data-section'));
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextNavItem = document.querySelector(`[data-section="${sections[nextIndex]}"]`);
    if (nextNavItem) nextNavItem.click();
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    const prevNavItem = document.querySelector(`[data-section="${sections[prevIndex]}"]`);
    if (prevNavItem) prevNavItem.click();
  }
});