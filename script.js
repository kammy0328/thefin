(function () {
  "use strict";

  var PHONE = "01058231350";
  var PHONE_DISPLAY = "010-5823-1350";

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

  /* copy phone number */
  var copyBtn = document.getElementById("copy-phone");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var done = function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = "복사되었습니다";
        setTimeout(function () {
          copyBtn.textContent = original;
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(PHONE_DISPLAY).then(done).catch(function () {
          window.prompt("전화번호를 복사하세요", PHONE_DISPLAY);
        });
      } else {
        window.prompt("전화번호를 복사하세요", PHONE_DISPLAY);
      }
    });
  }

  /* portfolio project card: hover/tap to play */
  document.querySelectorAll(".project-card[data-video-id]").forEach(function (card) {
    var id = card.dataset.videoId;
    var media = card.querySelector(".project-media");
    var iframe = null;

    function play() {
      if (iframe) return;
      iframe = document.createElement("iframe");
      iframe.className = "project-iframe";
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        id +
        "?autoplay=1&mute=1&controls=1&rel=0&playsinline=1";
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      media.appendChild(iframe);
      media.classList.add("is-playing");
    }
    function stop() {
      if (!iframe) return;
      iframe.remove();
      iframe = null;
      media.classList.remove("is-playing");
    }

    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", stop);
    card.addEventListener("click", play);
  });

  /* contact form -> sms link */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var message = form.message.value.trim();

      if (!name || !phone || !message) {
        form.reportValidity();
        return;
      }

      var body =
        "[THE FIN 문의]\n이름/회사명: " + name + "\n연락처: " + phone + "\n문의내용: " + message;
      var smsUrl = "sms:" + PHONE + "?body=" + encodeURIComponent(body);
      window.location.href = smsUrl;
    });
  }
})();
