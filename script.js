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