/* ============================================
   MARK AJEKEVWODA — PORTFOLIO SCRIPTS
   Filtering + Scroll Reveal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Project Filtering ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Scroll Reveal (IntersectionObserver) ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Navbar glass effect on scroll ──
  const nav = document.querySelector('.nav-inner');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (nav) {
      if (current > 60) {
        nav.style.background = 'rgba(247,246,242,0.92)';
        nav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
      } else {
        nav.style.background = 'rgba(247,246,242,0.72)';
        nav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
      }
    }
    lastScroll = current;
  });
});
