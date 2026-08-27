(function () {
  "use strict";

  /* header background on scroll */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile nav toggle */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  function closeNav() {
    navToggle.classList.remove("open");
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  navToggle.addEventListener("click", function () {
    var isOpen = siteNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  siteNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  /* reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* portfolio: clicking a card with a video opens it in a modal */
  var videoCards = document.querySelectorAll(".project-card[data-video-id]");
  if (videoCards.length) {
    var lastFocused = null;

    var modal = document.createElement("div");
    modal.className = "video-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "영상 재생");
    modal.innerHTML =
      '<div class="video-modal-dialog">' +
      '<button type="button" class="video-modal-close" aria-label="닫기">' +
      '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
      "</button></div>";
    document.body.appendChild(modal);

    var dialog = modal.querySelector(".video-modal-dialog");
    var closeBtn = modal.querySelector(".video-modal-close");

    function openModal(videoId, trigger) {
      lastFocused = trigger;
      var iframe = document.createElement("iframe");
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        videoId +
        "?autoplay=1&rel=0&playsinline=1";
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      dialog.appendChild(iframe);
      modal.classList.add("open");
      document.body.classList.add("modal-open");
      closeBtn.focus();
    }

    function closeModal() {
      if (!modal.classList.contains("open")) return;
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
      var iframe = dialog.querySelector("iframe");
      if (iframe) iframe.remove();
      if (lastFocused) lastFocused.focus();
    }

    videoCards.forEach(function (card) {
      card.querySelector(".project-media").addEventListener("click", function () {
        openModal(card.dataset.videoId, this);
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  /* portfolio: category filter buttons, built from the cards on the page */
  var filterBar = document.getElementById("filters");
  var grid = document.getElementById("project-grid");
  if (filterBar && grid) {
    var LABELS = {
      drama: "Drama",
      mv: "Music Video",
      film: "Film",
      ad: "Commercial"
    };
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".project-card"));
    var present = Object.keys(LABELS).filter(function (key) {
      return cards.some(function (card) {
        return card.dataset.category === key;
      });
    });

    function addButton(value, label) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn";
      btn.dataset.filter = value;
      btn.textContent = label;
      btn.addEventListener("click", function () {
        filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        cards.forEach(function (card) {
          card.hidden = value !== "all" && card.dataset.category !== value;
        });
      });
      filterBar.appendChild(btn);
    }

    addButton("all", "All");
    present.forEach(function (key) {
      addButton(key, LABELS[key]);
    });
    filterBar.querySelector(".filter-btn").classList.add("active");
  }
})();
