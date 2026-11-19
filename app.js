// Solstice & Shore — Interactive UI behavior
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Generic category filter (used on Menu & Gallery pages)
  const filterBars = document.querySelectorAll("[data-filter-bar]");
  filterBars.forEach((bar) => {
    const targetSelector = bar.getAttribute("data-filter-bar");
    const items = document.querySelectorAll(targetSelector);
    const buttons = bar.querySelectorAll(".filter-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-category");

        items.forEach((item) => {
          const itemCats = (item.getAttribute("data-category") || "").split(" ");
          if (category === "all" || itemCats.includes(category)) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  });

  // Gallery Lightbox
  const lightbox = document.getElementById("gallery-lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const lbCaption = lightbox.querySelector("[data-lb-caption]");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll(".gallery-tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        const img = tile.querySelector("img");
        const caption = tile.querySelector(".gallery-caption");
        if (img && lbImg) {
          lbImg.src = img.src;
          lbImg.alt = img.alt;
        }
        if (caption && lbCaption) {
          lbCaption.textContent = caption.textContent;
        }
        lightbox.classList.add("open");
      });
    });

    const closeLightbox = () => lightbox.classList.remove("open");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // Interactive Form Submissions (Reservations, Private Events, Contact)
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const feedback = form.querySelector(".form-feedback");
      if (feedback) {
        const nameInput = form.querySelector('input[name="name"]');
        const guestName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "friend";
        feedback.textContent = `Thanks, ${guestName}! Your request has been received by our Orillia host team. We'll confirm shortly.`;
        feedback.classList.add("show");
      }
      form.reset();
    });
  });
});
