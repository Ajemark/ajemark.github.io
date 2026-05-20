/* ============================================
   MARK AJEKEVWODA — PORTFOLIO SCRIPTS
   Filtering + Scroll Reveal + 3D Tilt + Typewriter
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
          // Stagger animation on filter change
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.opacity = '1';
            card.style.transform = '';
          }, 50 * Array.from(projectCards).indexOf(card));
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

  // ── 3D Tilt Effect on Project Cards ──
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });

  // ── Navbar glass effect on scroll ──
  const nav = document.querySelector('.nav-inner');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (nav) {
      if (current > 60) {
        nav.style.background = 'rgba(250,248,243,0.92)';
        nav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
      } else {
        nav.style.background = 'rgba(250,248,243,0.72)';
        nav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
      }
    }
    lastScroll = current;
  });

  // ── Typewriter Effect ──
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML = text.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 15);
      }
    };
    
    setTimeout(typeWriter, 300);
  }

  // ── Parallax effect on blobs ──
  const blobs = document.querySelectorAll('.hero-blob');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    blobs.forEach((blob, index) => {
      const factor = index === 0 ? 1 : -1;
      blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
});
