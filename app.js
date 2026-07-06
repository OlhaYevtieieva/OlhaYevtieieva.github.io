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

const reviewSlides = document.querySelectorAll(".review-slide");
const reviewPrevBtn = document.querySelector(".review-prev");
const reviewNextBtn = document.querySelector(".review-next");

let currentReview = 0;

function stopReviewVideos() {
  document.querySelectorAll(".video-review video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
    video.parentElement.classList.remove("playing");
  });
}

function updateReviewSlider() {
  reviewSlides.forEach((slide) => {
    slide.classList.remove("active", "prev", "next", "prev-2", "next-2");
  });

  const total = reviewSlides.length;

  const prev = (currentReview - 1 + total) % total;
  const next = (currentReview + 1) % total;
  const prev2 = (currentReview - 2 + total) % total;
  const next2 = (currentReview + 2) % total;

  reviewSlides[currentReview].classList.add("active");
  reviewSlides[prev].classList.add("prev");
  reviewSlides[next].classList.add("next");
  reviewSlides[prev2].classList.add("prev-2");
  reviewSlides[next2].classList.add("next-2");
}

if (reviewSlides.length && reviewPrevBtn && reviewNextBtn) {
  reviewPrevBtn.addEventListener("click", () => {
    stopReviewVideos();
    currentReview =
      (currentReview - 1 + reviewSlides.length) % reviewSlides.length;
    updateReviewSlider();
  });

  reviewNextBtn.addEventListener("click", () => {
    stopReviewVideos();
    currentReview = (currentReview + 1) % reviewSlides.length;
    updateReviewSlider();
  });

  updateReviewSlider();
}

document.querySelectorAll(".play-review").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const frame = button.closest(".video-review");
    const video = frame.querySelector("video");

    if (video.paused) {
      stopReviewVideos();
      frame.classList.add("playing");
      video.play();
    } else {
      video.pause();
      frame.classList.remove("playing");
    }
  });
});
const reviewsSlider = document.querySelector(".reviews-slider");

let startX = 0;
let endX = 0;
let isDragging = false;

function nextReview() {
  stopReviewVideos();
  currentReview = (currentReview + 1) % reviewSlides.length;
  updateReviewSlider();
}

function prevReview() {
  stopReviewVideos();
  currentReview =
    (currentReview - 1 + reviewSlides.length) % reviewSlides.length;
  updateReviewSlider();
}

function handleSwipe() {
  const diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    nextReview();
  } else {
    prevReview();
  }
}

if (reviewsSlider) {
  reviewsSlider.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].clientX;
  });

  reviewsSlider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    let moved = false;
    handleSwipe();
  });

  reviewsSlider.addEventListener("mousedown", (e) => {
    if (e.target.closest(".play-review")) return;

    isDragging = true;
    startX = e.clientX;
    endX = startX;
    reviewsSlider.classList.add("dragging");
  });

  reviewsSlider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    endX = e.clientX;

    if (Math.abs(endX - startX) > 10) {
      moved = true;
    }
  });

  reviewsSlider.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    reviewsSlider.classList.remove("dragging");

    if (moved) {
      handleSwipe();
    }

    moved = false;
  });

  reviewsSlider.addEventListener("mouseleave", () => {
    if (!isDragging) return;
    isDragging = false;
    reviewsSlider.classList.remove("dragging");
  });
}
