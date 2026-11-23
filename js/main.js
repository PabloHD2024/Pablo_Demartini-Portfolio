document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. MENÚ HAMBURGUESA RESPONSIVE
     ========================================= */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navLinks.classList.toggle("active");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navLinks.classList.remove("active");
      });
    });
  }

  /* =========================================
     2. ANIMACIÓN SCROLL REVEAL
     ========================================= */
  const cards = document.querySelectorAll(".card");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => revealObserver.observe(card));

  /* =========================================
     3. SCROLL SPY (Resaltar sección activa)
     ========================================= */
  const sections = document.querySelectorAll("section[id], header[id]");

  const highlightNav = () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 130;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          correspondingLink.classList.add("active");
        } else {
          correspondingLink.classList.remove("active");
        }
      }
    });
  };

  window.addEventListener("scroll", highlightNav);

  /* =========================================
     4. SISTEMA DE FILTROS (Stack y Proyectos)
     ========================================= */
  const initFilter = (filterBarId, itemSelector) => {
    const filterBar = document.getElementById(filterBarId);
    if (!filterBar) return;

    const buttons = filterBar.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(itemSelector);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        items.forEach((item) => {
          const categories = item.getAttribute("data-category").split(" ");
          
          if (filterValue === "all" || categories.includes(filterValue)) {
            item.classList.remove("hidden-item");
          } else {
            item.classList.add("hidden-item");
          }
        });
      });
    });
  };

  initFilter("stack-filters", ".stack-item");
  initFilter("project-filters", ".project-card");

  /* =========================================
     5. COPIAR EMAIL AL PORTAPAPELES + TOAST
     ========================================= */
  const emailBtn = document.querySelector('a[href^="mailto:"]');

  if (emailBtn) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = "✓ Correo copiado al portapapeles";
      document.body.appendChild(toast);
    }

    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailBtn.getAttribute("href").replace("mailto:", "");

      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        });
      }
    });
  }
});