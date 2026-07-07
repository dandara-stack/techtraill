// ============================================================
// TECHTRAIL — interações de front-end
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar com sombra ao rolar a página ---
  const navbar = document.getElementById('ttNavbar');
  const onScroll = () => {
    if (window.scrollY > 12) {
      navbar.style.boxShadow = '0 10px 30px -18px rgba(0,0,0,0.8)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Fecha o menu mobile ao clicar em um link ---
  const collapseEl = document.getElementById('ttNav');
  if (collapseEl) {
    const bsCollapse = window.bootstrap ? new bootstrap.Collapse(collapseEl, { toggle: false }) : null;
    collapseEl.querySelectorAll('a.nav-link, .tt-nav-actions a').forEach(link => {
      link.addEventListener('click', () => {
        if (collapseEl.classList.contains('show') && bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  // --- Filtro visual das categorias (apenas estado ativo) ---
  const categories = document.querySelectorAll('.tt-cat');
  categories.forEach(btn => {
    btn.addEventListener('click', () => {
      categories.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // --- Revela cards de curso e trilha suavemente ao entrar na tela ---
  const revealTargets = document.querySelectorAll('.tt-course-card, .tt-node, .tt-feature');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
  }

});
