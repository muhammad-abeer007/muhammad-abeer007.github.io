(function () {
  const site = window.SITE || {};
  const menuBtn = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("nav-mobile");
  const filters = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  const form = document.getElementById("contact-form");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      const open = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const value = btn.getAttribute("data-filter");
      filters.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      cards.forEach(function (card) {
        const show = value === "All" || card.getAttribute("data-category") === value;
        card.hidden = !show;
      });
    });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (form.querySelector('[name="name"]') || {}).value || "visitor";
      const email = (form.querySelector('[name="email"]') || {}).value || "";
      const message = (form.querySelector('[name="message"]') || {}).value || "";
      const subject = encodeURIComponent("Portfolio inquiry from " + name);
      const body = encodeURIComponent(message + "\n\n— " + name + "\n" + email);
      const to = site.email || "muhammadabeer042@gmail.com";
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });
  }
})();
