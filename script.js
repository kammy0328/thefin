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

  /* portfolio: click a card with a video to play it inline */
  document.querySelectorAll(".project-card[data-video-id]").forEach(function (card) {
    var media = card.querySelector(".project-media");
    media.addEventListener("click", function () {
      if (media.querySelector(".project-iframe")) return;
      var iframe = document.createElement("iframe");
      iframe.className = "project-iframe";
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        card.dataset.videoId +
        "?autoplay=1&rel=0&playsinline=1";
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      media.appendChild(iframe);
      media.classList.add("is-playing");
    });
  });

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
