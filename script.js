// Contact form submission
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const messageEl = document.getElementById("message");
  messageEl.textContent = "✅ Thank you for your message! I'll get back to you soon.";
  messageEl.style.color = "#2a52be";
  messageEl.style.textAlign = "center";
  messageEl.style.marginTop = "20px";
  messageEl.style.fontWeight = "500";
  
  // Reset form
  this.reset();
  
  // Hide message after 5 seconds
  setTimeout(() => {
    messageEl.textContent = "";
  }, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    // Show/hide projects based on filter
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        // Add animation
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar');
const skillsSection = document.getElementById('skills');

const animateSkillBars = () => {
  const sectionTop = skillsSection.offsetTop;
  const sectionHeight = skillsSection.offsetHeight;
  const scrollPosition = window.scrollY + window.innerHeight;
  
  if (scrollPosition > sectionTop + sectionHeight / 4) {
    skillBars.forEach(bar => {
      const skillValue = bar.getAttribute('data-skill');
      const percentElement = bar.nextElementSibling;
      
      // Set width to 0 first for animation
      bar.style.width = '0';
      
      // Animate to the actual skill value
      setTimeout(() => {
        bar.style.width = skillValue + '%';
        
        // Animate the percentage counter
        let currentPercent = 0;
        const increment = skillValue / 50; // Adjust speed of counter
        const timer = setInterval(() => {
          currentPercent += increment;
          if (currentPercent >= skillValue) {
            currentPercent = skillValue;
            clearInterval(timer);
          }
          percentElement.textContent = Math.floor(currentPercent) + '%';
        }, 30);
      }, 100);
    });
  }
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Project Carousels
document.querySelectorAll('.project-carousel').forEach(carousel => {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const indicators = carousel.querySelectorAll('.indicator');
  
  let currentSlide = 0;
  
  // Set first slide as active
  slides[0].classList.add('active');
  indicators[0].classList.add('active');
  
  // Function to show slide
  const showSlide = (index) => {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
  };
  
  // Next slide
  const nextSlide = () => {
    let index = currentSlide + 1;
    if (index >= slides.length) {
      index = 0;
    }
    showSlide(index);
  };
  
  // Previous slide
  const prevSlide = () => {
    let index = currentSlide - 1;
    if (index < 0) {
      index = slides.length - 1;
    }
    showSlide(index);
  };
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Auto-play carousel (optional)
  const autoPlay = setInterval(nextSlide, 5000);
  
  // Pause auto-play on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
  });
  
  // Resume auto-play on mouse leave
  carousel.addEventListener('mouseleave', () => {
    setInterval(nextSlide, 5000);
  });
});