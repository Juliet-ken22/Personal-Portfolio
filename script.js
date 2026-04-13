/* ── Smooth nav scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Skill bar animation ── */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ── Project filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards  = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projCards.forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.display = show ? 'flex' : 'none';
        if (show) {
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.transition = 'opacity .3s, transform .3s';
          });
        }
      }, 200);
    });
  });
});

/* ── Carousels ── */
document.querySelectorAll('.carousel-wrap').forEach(cw => {
  const slides = cw.querySelectorAll('.slide');
  const dots   = cw.querySelectorAll('.c-dot');
  const prev   = cw.querySelector('.c-prev');
  const next   = cw.querySelector('.c-next');
  let cur = 0, timer;

  const go = i => {
    slides[cur].classList.remove('active');
    dots[cur] && dots[cur].classList.remove('active');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur] && dots[cur].classList.add('active');
  };

  const start = () => { timer = setInterval(() => go(cur + 1), 4500); };
  const stop  = () => clearInterval(timer);

  if (prev) prev.addEventListener('click', () => { go(cur - 1); stop(); start(); });
  if (next) next.addEventListener('click', () => { go(cur + 1); stop(); start(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); stop(); start(); }));

  cw.addEventListener('mouseenter', stop);
  cw.addEventListener('mouseleave', start);
  start();
});

/* ── Back to top ── */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  btt.classList.toggle('show', window.scrollY > 400);
});
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Contact form ── */
const form = document.getElementById('contact-form');
const msg  = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    msg.textContent = 'Sending…';
    msg.className = 'form-msg';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
        msg.className = 'form-msg success';
        form.reset();
        setTimeout(() => { msg.textContent = ''; msg.className = 'form-msg'; }, 6000);
      } else {
        throw new Error();
      }
    } catch {
      msg.textContent = '✕ Something went wrong. Please try again.';
      msg.className = 'form-msg error';
    }
  });
}