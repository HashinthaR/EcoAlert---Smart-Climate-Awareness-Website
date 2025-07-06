// --- Enhanced Scroll Effects for Navigation ---
function initScrollEffects() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  function updateNavOnScroll() {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Add subtle parallax effect to nav background
    const scrolled = currentScrollY / 100;
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const alpha = Math.min(0.95, 0.8 + scrolled * 0.15);
    
    // Convert hex to rgba for better control
    if (primaryColor.startsWith('#')) {
      const r = parseInt(primaryColor.slice(1, 3), 16);
      const g = parseInt(primaryColor.slice(3, 5), 16);
      const b = parseInt(primaryColor.slice(5, 7), 16);
      nav.style.background = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  function requestNavUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateNavOnScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestNavUpdate, { passive: true });
  
  // Initialize nav state
  updateNavOnScroll();
}

// --- Enhanced Dark Mode Toggle with Smooth Transitions ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const moonIcon = themeToggle?.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
if (moonIcon) updateThemeIcon(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth theme switching
    body.classList.add('theme-transitioning');
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (moonIcon) updateThemeIcon(newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      body.classList.remove('theme-transitioning');
    }, 300);
  });
}

function updateThemeIcon(theme) {
  if (!moonIcon) return;
  
  if (theme === 'dark') {
    moonIcon.className = 'fas fa-sun';
    moonIcon.style.transform = 'rotate(180deg)';
  } else {
    moonIcon.className = 'fas fa-moon';
    moonIcon.style.transform = 'rotate(0deg)';
  }
}

// --- Enhanced Animated Statistics Counter with Easing ---
function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  
  const start = 0;
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (target - start) * easeOutQuart;
    
    element.textContent = current.toFixed(1);
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// --- Enhanced Statistics Animation on Scroll ---
function animateStatistics() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute('data-target'));
        if (!isNaN(target)) {
          animateCounter(entry.target, target);
        }
        observer.unobserve(entry.target);
        
        // Add pulse animation to stat item
        const statItem = entry.target.closest('.stat-item');
        if (statItem) {
          statItem.style.animation = 'pulse 0.6s ease-in-out';
          setTimeout(() => {
            statItem.style.animation = '';
          }, 600);
        }
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => observer.observe(stat));
}

// --- Enhanced CO₂ Calculator with Advanced Animations ---
const carbonForm = document.getElementById("carbonForm");
if (carbonForm) {
  carbonForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const electricity = parseFloat(document.getElementById("electricity")?.value || 0);
    const miles = parseFloat(document.getElementById("miles")?.value || 0);
    const diet = document.getElementById("diet")?.value || 'balanced';
    
    // Calculate emissions based on diet
    let dietMultiplier = 1;
    switch(diet) {
      case 'meat': dietMultiplier = 1.5; break;
      case 'balanced': dietMultiplier = 1.2; break;
      case 'vegetarian': dietMultiplier = 0.8; break;
      case 'vegan': dietMultiplier = 0.6; break;
    }
    
    const co2 = ((electricity * 0.42) + (miles * 0.21)) * dietMultiplier;
    const resultDiv = document.getElementById("result");
    const meterFill = document.getElementById("meterFill");
    
    if (!resultDiv) return;
    
    // Enhanced result animation
    resultDiv.style.opacity = '0';
    resultDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      resultDiv.innerHTML = `<strong>Estimated Monthly Emissions:</strong> ${co2.toFixed(2)} kg CO₂`;
      resultDiv.classList.add("visible");
      resultDiv.style.opacity = '1';
      resultDiv.style.transform = 'translateY(0)';
    }, 200);
    
    // Animated emissions meter
    if (meterFill) {
      const percentage = Math.min((co2 / 1000) * 100, 100);
      meterFill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      meterFill.style.width = percentage + "%";
    }
    
    // Color coding with smooth transitions
    setTimeout(() => {
      const successColor = getComputedStyle(document.documentElement).getPropertyValue('--success-color').trim();
      const warningColor = getComputedStyle(document.documentElement).getPropertyValue('--warning-color').trim();
      const errorColor = getComputedStyle(document.documentElement).getPropertyValue('--error-color').trim();
      
      if (co2 < 300) {
        resultDiv.style.borderLeftColor = successColor;
        resultDiv.innerHTML += "<br><small>Great! Your emissions are low.</small>";
        resultDiv.style.animation = 'successPulse 0.6s ease-in-out';
      } else if (co2 < 600) {
        resultDiv.style.borderLeftColor = warningColor;
        resultDiv.innerHTML += "<br><small>Moderate emissions. Consider reducing further.</small>";
        resultDiv.style.animation = 'warningPulse 0.6s ease-in-out';
      } else {
        resultDiv.style.borderLeftColor = errorColor;
        resultDiv.innerHTML += "<br><small>High emissions. Time to take action!</small>";
        resultDiv.style.animation = 'errorPulse 0.6s ease-in-out';
      }
    }, 300);
    
    setTimeout(() => {
      resultDiv.classList.remove("visible");
      resultDiv.style.animation = '';
    }, 6000);
  });
}

// --- Enhanced Eco Tip Generator with Advanced Animations
const tips = [
  { text: "Unplug electronics when not in use.", icon: "fas fa-plug" },
  { text: "Use reusable bags and bottles.", icon: "fas fa-shopping-bag" },
  { text: "Switch to LED light bulbs.", icon: "fas fa-lightbulb" },
  { text: "Bike or walk instead of driving.", icon: "fas fa-bicycle" },
  { text: "Reduce meat consumption.", icon: "fas fa-carrot" },
  { text: "Recycle properly.", icon: "fas fa-recycle" },
  { text: "Take shorter showers.", icon: "fas fa-shower" },
  { text: "Support local farmers.", icon: "fas fa-seedling" },
  { text: "Use public transportation.", icon: "fas fa-bus" },
  { text: "Plant trees in your community.", icon: "fas fa-tree" },
  { text: "Use energy-efficient appliances.", icon: "fas fa-tv" },
  { text: "Compost your food waste.", icon: "fas fa-leaf" },
  { text: "Install solar panels on your roof.", icon: "fas fa-solar-panel" },
  { text: "Use a programmable thermostat.", icon: "fas fa-thermometer-half" },
  { text: "Buy second-hand items when possible.", icon: "fas fa-handshake" },
  { text: "Use cold water for laundry.", icon: "fas fa-tshirt" },
  { text: "Turn off lights when leaving a room.", icon: "fas fa-lightbulb" },
  { text: "Use a water filter instead of bottled water.", icon: "fas fa-tint" }
];

function generateTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  const tipDisplay = document.getElementById("tipDisplay");
  const tipIcon = document.getElementById("tipIcon");
  const tipCard = document.querySelector('.tip-card');
  
  if (!tipDisplay || !tipIcon || !tipCard) return;
  
  // Enhanced animation sequence
  tipCard.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    tipIcon.style.transform = "rotate(360deg) scale(1.2)";
    tipIcon.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    
    tipDisplay.classList.remove("visible");
    tipDisplay.style.transform = 'translateY(20px)';
    tipDisplay.style.opacity = '0';
    
    setTimeout(() => {
      tipIcon.className = tip.icon;
      tipDisplay.textContent = tip.text;
      tipDisplay.classList.add("visible");
      tipDisplay.style.transform = 'translateY(0)';
      tipDisplay.style.opacity = '1';
      tipIcon.style.transform = "rotate(0deg) scale(1)";
      tipCard.style.transform = 'scale(1)';
    }, 300);
  }, 150);
}

// --- Enhanced Mobile Navigation with Smooth Animations ---
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
const navLinks = document.getElementById('nav-links');

if (navToggle && nav && navLinks) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    
    // Smooth height animation
    if (!expanded) {
      navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
    } else {
      navLinks.style.maxHeight = '0px';
    }
  });
  
  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.style.maxHeight = '0px';
    });
  });
}

// --- Enhanced Dropdown Menu with Advanced Interactions ---
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');
  
  if (!toggle || !menu) return;
  
  // Desktop hover with smooth animations
  dropdown.addEventListener('mouseenter', () => {
    if (window.innerWidth > 1024) {
      menu.style.opacity = '1';
      menu.style.visibility = 'visible';
      menu.style.transform = 'translateX(-50%) translateY(0) scale(1)';
      menu.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  });
  
  dropdown.addEventListener('mouseleave', () => {
    if (window.innerWidth > 1024) {
      menu.style.opacity = '0';
      menu.style.visibility = 'hidden';
      menu.style.transform = 'translateX(-50%) translateY(-10px) scale(0.95)';
    }
  });
  
  // Mobile click with enhanced animations
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      dropdown.classList.toggle('active');
      
      if (dropdown.classList.contains('active')) {
        menu.style.maxHeight = menu.scrollHeight + 'px';
        menu.style.opacity = '1';
      } else {
        menu.style.maxHeight = '0px';
        menu.style.opacity = '0';
      }
    }
  });
});

// --- Enhanced Smooth Scrolling with Offset and Easing ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('nav')?.offsetHeight || 80;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      // Smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;
      
      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
      
      function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }
      
      requestAnimationFrame(animation);
    }
  });
});

// --- Enhanced Scroll-based Animations with Staggered Effects ---
function animateOnScroll() {
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length === 0) return;
  
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  animatedEls.forEach(el => observer.observe(el));
}

// --- Enhanced Progress Bar Animation with Easing ---
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  if (progressBars.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        
        setTimeout(() => {
          entry.target.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
          entry.target.style.width = width;
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => observer.observe(bar));
}

// --- Enhanced Parallax Effect with Performance Optimization ---
function initParallax() {
  let ticking = false;
  let lastScrollY = window.pageYOffset;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      const rate = (scrolled - lastScrollY) * -0.3;
      hero.style.transform = `translateY(${rate}px)`;
      lastScrollY = scrolled;
    }
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

// --- Enhanced Image Loading with Error Handling ---
function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Set initial state to visible
    img.style.opacity = '1';
    img.style.filter = 'none';
    
    // Handle successful image load
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.filter = 'none';
      this.classList.add('loaded');
      console.log('Image loaded successfully:', this.src);
    });
    
    // Handle image load errors
    img.addEventListener('error', function() {
      console.error('Failed to load image:', this.src);
      this.style.opacity = '1';
      this.style.filter = 'none';
      this.alt = 'Image not available';
      
      // Create a fallback placeholder
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-size: 14px;
        border-radius: 8px;
        border: 2px dashed #ccc;
      `;
      placeholder.innerHTML = '🖼️ Image not available';
      
      // Replace the broken image with placeholder
      this.style.display = 'none';
      this.parentNode.insertBefore(placeholder, this);
    });
    
    // Force reload if image fails to load initially
    if (img.complete && img.naturalWidth === 0) {
      img.src = img.src; // Force reload
    }
  });
}

// --- Enhanced Hover Effects with Advanced Animations ---
function initHoverEffects() {
  // News cards with 3D hover effect
  document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.transform = `translateY(-10px) scale(1.02) rotateX(${(y - rect.height/2)/20}deg) rotateY(${(x - rect.width/2)/20}deg)`;
      this.style.boxShadow = '0 20px 40px rgba(38,198,218,0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
      this.style.boxShadow = '';
    });
  });
  
  // Enhanced social links with ripple effect
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Card hover effects with magnetic effect
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

// --- Performance Monitoring with Advanced Metrics ---
function initPerformanceMonitoring() {
  let scrollCount = 0;
  let lastScrollTime = Date.now();
  let frameCount = 0;
  let lastFrameTime = Date.now();
  
  // Monitor scroll performance
  window.addEventListener('scroll', () => {
    scrollCount++;
    const now = Date.now();
    
    if (now - lastScrollTime > 1000) {
      console.log(`Scroll events per second: ${scrollCount}`);
      scrollCount = 0;
      lastScrollTime = now;
    }
  }, { passive: true });
  
  // Monitor frame rate
  function monitorFPS() {
    frameCount++;
    const now = Date.now();
    
    if (now - lastFrameTime > 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastFrameTime));
      console.log(`FPS: ${fps}`);
      frameCount = 0;
      lastFrameTime = now;
    }
    
    requestAnimationFrame(monitorFPS);
  }
  
  requestAnimationFrame(monitorFPS);
}

// --- Initialize everything when DOM is loaded ---
window.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations and effects
  initScrollEffects();
  animateOnScroll();
  animateStatistics();
  animateProgressBars();
  initParallax();
  initImageLoading();
  initHoverEffects();
  initPerformanceMonitoring();
  
  // Initialize emissions meter
  const meterFill = document.getElementById("meterFill");
  if (meterFill) {
    meterFill.style.width = "0%";
  }
  
  // Enhanced tooltips with positioning
  document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.getAttribute('title');
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
      let top = rect.top - tooltipRect.height - 10;
      
      // Adjust if tooltip goes off screen
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      if (top < 10) {
        top = rect.bottom + 10;
      }
      
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
    });
  });
  
  // Add entrance animations for page load
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
});

// --- Add enhanced CSS animations ---
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes successPulse {
    0%, 100% { box-shadow: 0 0 0 0 var(--success-color); }
    50% { box-shadow: 0 0 0 10px transparent; }
  }
  
  @keyframes warningPulse {
    0%, 100% { box-shadow: 0 0 0 0 var(--warning-color); }
    50% { box-shadow: 0 0 0 10px transparent; }
  }
  
  @keyframes errorPulse {
    0%, 100% { box-shadow: 0 0 0 0 var(--error-color); }
    50% { box-shadow: 0 0 0 10px transparent; }
  }
  
  .tooltip {
    position: fixed;
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    animation: fadeIn 0.2s ease-in-out forwards;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  
  img.loaded {
    opacity: 1;
    transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
  }
  
  img:not(.loaded) {
    opacity: 0;
  }
  
  .theme-transitioning * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
  }
  
  .nav-links {
    transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
  }
  
  .dropdown-menu {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
document.head.appendChild(style);

// --- Enhanced Window Resize Handler with Debouncing ---
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 1024) {
      if (nav) nav.classList.remove('nav-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      if (navLinks) navLinks.style.maxHeight = '';
      
      // Reset dropdown menus
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          menu.style.maxHeight = '';
          menu.style.opacity = '';
        }
      });
    }
    
    // Recalculate parallax
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = 'translateY(0)';
    }
  }, 250);
});

// --- Enhanced Keyboard Navigation Support ---
document.addEventListener('keydown', function(e) {
  // Escape key closes mobile menu
  if (e.key === 'Escape') {
    if (nav) nav.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    if (navLinks) navLinks.style.maxHeight = '0px';
  }
  
  // Space/Enter key toggles theme
  if (e.key === ' ' || e.key === 'Enter') {
    if (document.activeElement === themeToggle) {
      e.preventDefault();
      themeToggle.click();
    }
  }
  
  // Arrow keys for navigation
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
    
    if (currentIndex !== -1) {
      let nextIndex;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex + 1;
        if (nextIndex >= focusableElements.length) nextIndex = 0;
      } else {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = focusableElements.length - 1;
      }
      
      focusableElements[nextIndex].focus();
      e.preventDefault();
    }
  }
});

// --- Enhanced Focus Management for Accessibility ---
document.querySelectorAll('a, button, input, select, textarea').forEach(element => {
  element.addEventListener('focus', function() {
    this.style.outline = '2px solid var(--accent-color)';
    this.style.outlineOffset = '2px';
    
    // Add subtle scale effect
    this.style.transform = 'scale(1.02)';
  });
  
  element.addEventListener('blur', function() {
    this.style.outline = 'none';
    this.style.transform = 'scale(1)';
  });
});

// --- Add smooth scrolling polyfill for older browsers ---
if (!('scrollBehavior' in document.documentElement.style)) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
  document.head.appendChild(script);
}
  