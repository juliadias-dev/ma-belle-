function initializeNavigation() {
  const button = document.querySelector(".mb-menu-toggle");
  const menu = document.querySelector(".mb-main-nav");
  if (!button || !menu) return;
  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("mb-is-open", open);
  };
  button.addEventListener("click", () => setOpen(button.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", () => setOpen(false)));
}

function initializeGallery() {
  const dialog = document.querySelector(".mb-lightbox");
  if (!dialog) return;
  const image = dialog.querySelector("img");
  document.querySelectorAll(".mb-gallery-item").forEach((item) => item.addEventListener("click", () => {
    const thumbnail = item.querySelector("img");
    image.src = item.dataset.image || thumbnail.currentSrc || thumbnail.src;
    image.alt = thumbnail.alt;
    dialog.showModal();
  }));
  dialog.querySelector(".mb-lightbox-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}

function initializeContactForm() {
  const form = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");
  if (!form || !feedback) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    feedback.textContent = "Obrigada pelo interesse! Este formulário é demonstrativo e não enviou sua mensagem.";
    form.reset();
  });
}

function initializeReveal() {
  const items = document.querySelectorAll(".mb-about-copy,.mb-about-visual,.mb-service,.mb-gallery-item,.mb-contact-copy,.mb-contact-form");
  items.forEach((item) => item.setAttribute("data-reveal", ""));
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("mb-is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("mb-is-visible");
    current.unobserve(entry.target);
  }), { threshold: .12 });
  items.forEach((item) => observer.observe(item));
}

initializeNavigation();
initializeGallery();
initializeContactForm();
initializeReveal();
