const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu a");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (e) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

function closeMenu() {
  burger.classList.remove("active");
  menu.classList.remove("active");
  document.body.classList.remove("menu-open");
}

const modalButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById(btn.dataset.modal);

    modal.classList.add("active");

    document.body.classList.add("modal-open");
  });
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").classList.remove("active");

    document.body.classList.remove("modal-open");
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active");
    });

    document.body.classList.remove("modal-open");
  }
});

const slides = document.querySelectorAll(".certificate-slide");
const prevBtn = document.querySelector(".cert-prev");
const nextBtn = document.querySelector(".cert-next");

let currentCert = 0;

function updateCertificateSlider() {
  slides.forEach((slide) => {
    slide.classList.remove("active", "prev", "next", "prev-2", "next-2");
  });

  const total = slides.length;

  const prev = (currentCert - 1 + total) % total;
  const next = (currentCert + 1) % total;
  const prev2 = (currentCert - 2 + total) % total;
  const next2 = (currentCert + 2) % total;

  slides[currentCert].classList.add("active");
  slides[prev].classList.add("prev");
  slides[next].classList.add("next");
  slides[prev2].classList.add("prev-2");
  slides[next2].classList.add("next-2");
}

prevBtn.addEventListener("click", () => {
  currentCert = (currentCert - 1 + slides.length) % slides.length;
  updateCertificateSlider();
});

nextBtn.addEventListener("click", () => {
  currentCert = (currentCert + 1) % slides.length;
  updateCertificateSlider();
});

updateCertificateSlider();

document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});
