(function () {
  var yearNode = document.getElementById("copyright-year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var storageKey = "ve-theme";
  var root = document.documentElement;
  var sunIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="4"></circle>' +
    '<path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"></path>' +
    "</svg>";
  var moonIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M20.2 14.3A8.5 8.5 0 1 1 9.7 3.8a7 7 0 1 0 10.5 10.5Z"></path>' +
    "</svg>";

  function getPreferredTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getCurrentTheme() {
    var saved = null;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch (err) {
      saved = null;
    }
    return saved === "dark" || saved === "light" ? saved : getPreferredTheme();
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (err) {
      // ignore storage errors in strict/private contexts
    }

    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      var nextTheme = theme === "dark" ? "light" : "dark";
      btn.setAttribute("data-mode", theme);
      btn.setAttribute("aria-label", nextTheme === "dark" ? "切换为暗色模式" : "切换为浅色模式");
      btn.setAttribute("title", nextTheme === "dark" ? "切换为暗色模式" : "切换为浅色模式");
      btn.innerHTML = theme === "dark" ? sunIcon : moonIcon;
    }
  }

  function mountThemeToggle() {
    var headerInner = document.querySelector(".header-inner");
    if (!headerInner || document.querySelector(".theme-toggle")) return;

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    toggle.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    headerInner.appendChild(toggle);
  }

  function mountBackToTop() {
    if (document.querySelector(".back-to-top")) return;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "返回顶部");
    button.textContent = "↑";
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(button);

    function syncVisible() {
      button.classList.toggle("is-visible", window.scrollY > 280);
    }

    syncVisible();
    window.addEventListener("scroll", syncVisible, { passive: true });
  }

  mountThemeToggle();
  applyTheme(getCurrentTheme());
  mountBackToTop();

  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
})();
