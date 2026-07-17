/* ==========================================================================
   Hannah Akoore — General Virtual Assistant Portfolio
   script.js  (vanilla JS, no frameworks/dependencies)
   Table of contents:
   1. Utilities (toast, ripple)
   2. Preloader
   3. Scroll progress + header state + scroll spy
   4. Mobile menu
   5. Theme toggle (light/dark)
   6. Scroll-reveal (IntersectionObserver)
   7. Animated stat counters
   8. Skill bar animation
   9. Testimonial slider
   10. FAQ accordion
   11. Project detail modal
   12. Privacy modal
   13. Floating CTA + back-to-top
   14. Copy email button
   15. Contact form validation + submission
   16. Misc: footer year, lazy image skeleton removal
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------- 1. Utilities -------------------- */
  function toast(message, type) {
    var container = document.getElementById("toastContainer");
    if (!container) return;
    var el = document.createElement("div");
    el.className = "toast" + (type === "error" ? " error" : "");
    el.setAttribute("role", "status");
    el.textContent = message;
    container.appendChild(el);
    setTimeout(function () {
      el.classList.add("hide");
      setTimeout(function () { el.remove(); }, 320);
    }, 3800);
  }

  // Button ripple: track pointer position, add class to trigger CSS animation
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".btn");
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    btn.style.setProperty("--ripple-x", (e.clientX - rect.left) + "px");
    btn.style.setProperty("--ripple-y", (e.clientY - rect.top) + "px");
    btn.classList.remove("rippling");
    // force reflow so the animation can restart
    void btn.offsetWidth;
    btn.classList.add("rippling");
  });

  /* -------------------- 2. Preloader -------------------- */
  var preloader = document.getElementById("preloader");
  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add("hidden");
    setTimeout(function () { preloader.style.display = "none"; }, 550);
  }
  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
    // safety net in case load event is delayed by slow external fonts
    setTimeout(hidePreloader, 2200);
  }

  /* -------------------- 3. Scroll progress + header + scroll spy -------------------- */
  var header = document.getElementById("siteHeader");
  var progressBar = document.getElementById("scrollProgressBar");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";

    if (header) header.classList.toggle("scrolled", scrollTop > 8);

    // floating CTA + back to top visibility
    var heroHeight = document.getElementById("hero") ? document.getElementById("hero").offsetHeight : 500;
    var floatingCta = document.getElementById("floatingCta");
    var backToTop = document.getElementById("backToTop");
    if (floatingCta) floatingCta.classList.toggle("visible", scrollTop > heroHeight * 0.7);
    if (backToTop) backToTop.classList.toggle("visible", scrollTop > 700);

    // scroll spy
    var current = null;
    sections.forEach(function (sec) {
      var top = sec.getBoundingClientRect().top;
      if (top < 140) current = sec;
    });
    navLinks.forEach(function (a) {
      var target = document.querySelector(a.getAttribute("href"));
      a.classList.toggle("active", target === current);
    });
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* -------------------- 4. Mobile menu -------------------- */
  var hamburgerBtn = document.getElementById("hamburgerBtn");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    if (!mobileMenu || !hamburgerBtn) return;
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }
  function openMobileMenu() {
    if (!mobileMenu || !hamburgerBtn) return;
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.contains("open");
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobileMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileMenu();
  });

  /* -------------------- 5. Theme toggle -------------------- */
  var themeToggle = document.getElementById("themeToggle");
  var htmlEl = document.documentElement;
  // Session-only preference (no persistent storage used, per static-artifact constraints)
  function setTheme(mode) {
    if (mode === "dark") {
      htmlEl.setAttribute("data-theme", "dark");
      themeToggle && themeToggle.setAttribute("aria-pressed", "true");
      themeToggle && themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      htmlEl.removeAttribute("data-theme");
      themeToggle && themeToggle.setAttribute("aria-pressed", "false");
      themeToggle && themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }
  if (themeToggle) {
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
    themeToggle.addEventListener("click", function () {
      var isDark = htmlEl.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");
    });
  }

  /* -------------------- 6. Scroll-reveal -------------------- */
  var revealEls = document.querySelectorAll(".reveal-up, .reveal-left");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute("data-reveal-delay");
          if (delay) entry.target.style.transitionDelay = delay + "ms";
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* -------------------- 7. Animated stat counters -------------------- */
  var statNumbers = document.querySelectorAll(".stat-number");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = 0;
    var duration = 1400;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(start + (target - start) * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && statNumbers.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(function (el) { statObserver.observe(el); });
  }

  /* -------------------- 8. Skill bar animation -------------------- */
  var skillCards = document.querySelectorAll(".skill-card");
  if ("IntersectionObserver" in window && skillCards.length) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    skillCards.forEach(function (el) { skillObserver.observe(el); });
  } else {
    skillCards.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* -------------------- 9. Testimonial slider -------------------- */
  (function () {
    var track = document.getElementById("testimonialTrack");
    var dotsWrap = document.getElementById("testimonialDots");
    var prevBtn = document.getElementById("testimonialPrev");
    var nextBtn = document.getElementById("testimonialNext");
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    var index = 0;
    var autoplayId = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () { goTo(i); restartAutoplay(); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      dots.forEach(function (d, di) { d.classList.toggle("active", di === index); });
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAutoplay(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAutoplay(); });

    function startAutoplay() {
      if (reduceMotion) return;
      autoplayId = setInterval(next, 6500);
    }
    function restartAutoplay() {
      clearInterval(autoplayId);
      startAutoplay();
    }
    startAutoplay();

    var slider = document.getElementById("testimonialSlider");
    if (slider) {
      slider.addEventListener("mouseenter", function () { clearInterval(autoplayId); });
      slider.addEventListener("mouseleave", startAutoplay);
      slider.addEventListener("focusin", function () { clearInterval(autoplayId); });
      slider.addEventListener("focusout", startAutoplay);
    }

    // basic touch swipe
    var touchStartX = null;
    track.addEventListener("touchstart", function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restartAutoplay(); }
      touchStartX = null;
    }, { passive: true });
  })();

  /* -------------------- 10. FAQ accordion -------------------- */
  document.querySelectorAll(".accordion-trigger").forEach(function (btn) {
    var panel = btn.parentElement.nextElementSibling;
    panel.style.maxHeight = "0px";
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      if (!expanded) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "0px";
      }
    });
  });
  // keep open panels correctly sized on resize
  window.addEventListener("resize", function () {
    document.querySelectorAll('.accordion-trigger[aria-expanded="true"]').forEach(function (btn) {
      var panel = btn.parentElement.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });

  /* -------------------- 11. Project detail modal -------------------- */
  (function () {
    var modal = document.getElementById("projectModal");
    if (!modal) return;
    var titleEl = document.getElementById("modalTitle");
    var toolsEl = document.getElementById("modalTools");
    var problemEl = document.getElementById("modalProblem");
    var solutionEl = document.getElementById("modalSolution");
    var outcomeEl = document.getElementById("modalOutcome");
    var closeBtn = document.getElementById("modalClose");
    var lastFocused = null;

    function openModal(card) {
      titleEl.textContent = card.getAttribute("data-title") || "";
      toolsEl.textContent = card.getAttribute("data-tools") || "";
      problemEl.textContent = card.getAttribute("data-problem") || "";
      solutionEl.textContent = card.getAttribute("data-solution") || "";
      outcomeEl.textContent = card.getAttribute("data-outcome") || "";
      lastFocused = document.activeElement;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }
    document.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("click", function () { openModal(card); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card); }
      });
    });
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  })();

  /* -------------------- 12. Privacy modal -------------------- */
  (function () {
    var modal = document.getElementById("privacyModal");
    var openLink = document.getElementById("privacyLink");
    var closeBtn = document.getElementById("privacyClose");
    if (!modal || !openLink) return;
    openLink.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      closeBtn.focus();
    });
    function close() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      openLink.focus();
    }
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) close();
    });
  })();

  /* -------------------- 14. Copy email button -------------------- */
  var copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", function () {
      var email = "Hannahakoore@gmail.com";
      function done() {
        copyEmailBtn.classList.add("copied");
        toast("Email address copied to clipboard.");
        setTimeout(function () { copyEmailBtn.classList.remove("copied"); }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function () {
          toast("Couldn't copy automatically — the address is " + email, "error");
        });
      } else {
        var temp = document.createElement("input");
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        try { document.execCommand("copy"); done(); } catch (err) {
          toast("Couldn't copy automatically — the address is " + email, "error");
        }
        temp.remove();
      }
    });
  }

  /* -------------------- 15. Contact form -------------------- */
  (function () {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var submitBtn = document.getElementById("formSubmitBtn");

    function setError(field, message) {
      var wrap = field.closest(".form-field");
      wrap.classList.toggle("invalid", Boolean(message));
      var errEl = wrap.querySelector(".field-error");
      if (errEl) errEl.textContent = message || "";
    }

    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#fieldName");
      var email = form.querySelector("#fieldEmail");
      var message = form.querySelector("#fieldMessage");
      var business = form.querySelector("#fieldBusiness");
      var service = form.querySelector("#fieldService");
      var valid = true;

      if (!name.value.trim()) { setError(name, "Please enter your name."); valid = false; }
      else setError(name, "");

      if (!email.value.trim()) { setError(email, "Please enter your email."); valid = false; }
      else if (!validateEmail(email.value.trim())) { setError(email, "Please enter a valid email address."); valid = false; }
      else setError(email, "");

      if (!message.value.trim()) { setError(message, "Please add a short message."); valid = false; }
      else setError(message, "");

      if (!valid) {
        toast("Please fix the highlighted fields.", "error");
        return;
      }

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      var subject = "New enquiry from " + name.value.trim() + (business.value.trim() ? " (" + business.value.trim() + ")" : "");
      var bodyLines = [
        "Name: " + name.value.trim(),
        "Email: " + email.value.trim(),
        business.value.trim() ? "Business: " + business.value.trim() : null,
        service.value ? "Service needed: " + service.value : null,
        "",
        message.value.trim()
      ].filter(Boolean);
      var mailto = "mailto:Hannahakoore@gmail.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      setTimeout(function () {
        window.location.href = mailto;
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        toast("Opening your email app to send this to Hannah…");
        form.reset();
      }, 500);
    });

    // clear field error as the user types
    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("input", function () { setError(field, ""); });
    });
  })();

  /* -------------------- 16. Misc -------------------- */
  var footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    if (img.complete) { img.classList.add("loaded"); return; }
    img.addEventListener("load", function () { img.classList.add("loaded"); });
    img.addEventListener("error", function () { img.classList.add("loaded"); });
  });

})();
